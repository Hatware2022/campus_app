import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {View, Tag, Container, Touchable} from '../../../common';
import Text from '../../../common/TextV2';
import * as Colors from '../../../config/colors';

import GroupMembers from '../components/GroupDetails/GroupMembers';
import CreatePostForm from '../components/GroupDetails/CreatePostForm';
import GroupPostListItem from '../components/GroupDetails/GroupPostListItem';
import ArrowRedIcon from '../../../assets/icons/icon-red-arrow.svg';
import SurfingImage from '../../../assets/images/Surfing.png';

import session from '../../../store/session';
import keys from '../../../store/keys';
import groupService from '../../../services/group';
import groupPostService from '../../../services/grouppost';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import ModalConfirm from '../../../auth/components/Modal/modalconfirm';

/* =============================================================================
<GroupDetailsScreen />
============================================================================= */
const GroupDetailsScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);
  const data = route.params?.data || {};
  const [joinGroup, setJoinGroup] = useState(false);
  const [viewModalLeave, setViewModalLeave] = useState(false);
  const [isUserAGroupMember, setIsUserAGroupMember] = 
    useState((data?.members || []).includes(session.get(keys.userId)))
  const [members,setMembers]=useState(data?.members)
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const reload = () => {
    groupPostService.getByGroupId(session.get(keys.token), data?.id).then(result => {
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message);
        return;
      }

      let arr = result.data.data;

      setPosts(arr);
    });
  };

  const _safeArea = {
    paddingBottom: insets.bottom,
    // paddingTop: insets.top,
  };

  const _moveToGroupPost = () => {
    navigation.navigate('GroupCreate', {groupId: data?.id});
  };

  const _handleLeaveGroup = () => {
    try {
      groupService.leave(session.get(keys.token), data.id).then((res) => {
        const {data} = res;
        if(data?.success) {
          setIsUserAGroupMember(false);
          setViewModalLeave(false);
          navigation.goBack()
        }
      }).catch((_err) => {})      
    } catch (_err) {}
  };

  const _handlePressGroup = () => {
    if (isUserAGroupMember) {
      setViewModalLeave(true);
    } else {
      groupService.join(session.get(keys.token), data.id).then((res) => {
        const {data} = res;
        if(data?.success) {
          setIsUserAGroupMember(true);
          setMembers(members+1)
        }
      }).catch((_err) => {})
    }
  };

  return (
    <Container backgroundColor={Colors.white200}>
      <View style={{height: insets.top, backgroundColor: Colors.primary}} />

      <FlatList
        data={posts}
        style={styles.list}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        // contentContainerStyle={[styles.listContent,]}
        ListHeaderComponent={
          <View>
            <View padding={0}>
              <ImageBackground
                // source={data.image}
                source={data.imageUrl ? {uri: data.imageUrl} : SurfingImage}
                style={styles.coverImage}>
                <Touchable
                  onPress={() => navigation.goBack()}
                  style={styles.backBorder}>
                  <ArrowRedIcon />
                </Touchable>
              </ImageBackground>

              <View
                style={{
                  backgroundColor: Colors.background,
                  borderRadius: 8,
                  padding: 16,
                  marginHorizontal: 16,
                  marginTop: -24,
                }}>
                <Text
                  size="big"
                  family="semi"
                  customStyle={{lineHeight: 22, marginBottom: 4}}>
                  {data.title}
                </Text>
                <Text color={Colors.black500} customStyle={{marginBottom: 16}}>
                  {data.description}
                </Text>

                <View style={styles.tagContainer}>
                  {data.tags?.map((item, index) => (
                    <Tag key={index} text={item} redBorder />
                  ))}
                </View>
                <GroupMembers
                  joinGroup={joinGroup}
                  onPress={_handlePressGroup}
                  onPressGroup={() => navigation.navigate(
                    'GroupMember', 
                    {
                      members: members, 
                      title: data?.title,
                      imageUrl: data?.imageUrl,
                    }
                  )}
                  isUserAGroupMember={isUserAGroupMember}
                  members={members}
                />
              </View>
            </View>
            <View style={styles.headerPost}>
              {
                isUserAGroupMember ? (
                  <TouchableOpacity
                  style={styles.buttonPost}
                  onPress={isUserAGroupMember ? _moveToGroupPost : null}>
                    <Text size="small">Create Post +</Text>
                  </TouchableOpacity>
                ) : null
              }
              {
                posts.length ? (
                  <Text family="bold" size="big" customStyle={styles.textPost}>
                    Posts
                  </Text>
                ) : <></>
              }
            </View>
          </View>
        }
      />

      <ModalConfirm
        titlemessage={'Are you sure want to leave this group?'}
        isVisible={viewModalLeave}
        onCloseModal={() => setViewModalLeave(false)}
        onYes={_handleLeaveGroup}
      />
    </Container>
  );
};

const renderPostItem = ({item}) => <GroupPostListItem data={item} />;

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 216,
  },

  coverInnerContainer: {
    // padding: 20,
    width: '100%',
    height: 216,
    // paddingVertical: 40,
    backgroundColor: 'blue',
  },
  name: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  textPost: {
    lineHeight: 22,
    flex: 1,
  },
  headerPost: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row-reverse',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  buttonPost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
  },
  backBorder: {
    height: 40,
    width: 40,
    backgroundColor: Colors.white100,
    borderRadius: 40,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GroupDetailsScreen;
