import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Container,
  TextInput,
  Title,
  View,
  StackHeader,
} from '../../../common';
import Text from '../../../common/TextV2';
import PostsFilter from '../components/Posts/PostFilter';
import PostListItem from '../components/Posts/PostListItem';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import FilterIcon from '../../../assets/icons/icon-filter.svg';
import PlusIcon from '../../../assets/icons/icon-plus-circle-big.svg'
import * as Colors from '../../../config/colors';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import postService from '../../../services/post';
import session from '../../../store/session';
import keys from '../../../store/keys';
import moment from 'moment';
import ModalFilter from '../../../auth/components/Modal/modalfilter';

/* =============================================================================
<PostsScreen />
============================================================================= */
const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const loginType = session.get(keys.loginType)

  const _moveToCreatePost = () => {
    navigation.navigate('PostCreate');
  };

  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [filters, setFilters] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [viewFilter, setViewFilter] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused, keyword, sortBy, filters]);

  const reload = () => {
    postService.getAll(session.get(keys.token)).then(result => {
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message);
        return;
      }

      let arr = result?.data?.data;

      if (keyword.length > 0 || (filters && filters.keyword.length > 0)) {
        let f = (filters && filters.keyword) || keyword;
        arr = arr.filter(k => k.detail.toLowerCase().includes(f.toLowerCase()));
      }

      if (sortBy === 'Most Popular') {
        arr = arr.sort((a, b) => b.likes.length - a.likes.length);
      } else if (sortBy === 'Newest') {
        arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
      }

      if (filters) {
        if (filters.tags.length > 0) {
          arr = arr.filter(k => k.tags.includes(filters.tags));
        }
      }

      setRecords(arr);
    });
  };

  useEffect(() => {
    const keywordFromOtherScreen = route.params ? route.params.keyword : null;
    if (keywordFromOtherScreen) {
      setKeyword(keywordFromOtherScreen);
    }
  }, [route.params]);

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  const _onPressCloseFilter = () => {
    setViewFilter(false);
    dispatch(setKey(keys.postsShowModalFilter, false))
  };

  const renderItem = ({item}) => <PostListItem data={item} reload={reload} />;

  return (
    <Container style={{}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* <View horizontal>
        <TextInput
          left={<SearchIcon />}
          value={keyword}
          onChange={setKeyword}
          placeholder="Search posts here"
        />
        <TouchableOpacity
          onPress={() => setViewFilter(true)}
          style={{
            marginLeft: 8,
            alignSelf: 'center',
          }}>
          <FilterIcon />
        </TouchableOpacity>
      </View> */}

      <FlatList
        data={records}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerText}>
          <Text family="semi" size="big" customStyle={styles.textGroup}>
          Posts
            </Text>
          <View horizontal>
{loginType != 'organization' &&
            <TouchableOpacity
              style={styles.iconPlus}
              onPress={_moveToCreatePost}
            >
              <Text size="medium" family="medium" color={Colors.primary}>
                {'Create New  '}
              </Text>
              <PlusIcon width={24} />
            </TouchableOpacity>
        }
          </View>
          {/* <ChatForm reload={reload} /> */}
        </View>
        }
        ListEmptyComponent={
          <Title type="h6" marginHorizontal={20} marginVertical={20}>
            No data found.
          </Title>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
       <ModalFilter
        postFilter={true}
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => _onPressCloseFilter()}
        onYes={() => _onPressCloseFilter()}
      />
      {/* <ModalFilter
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => setViewFilter(false)}
        onYes={() => setViewFilter(false)}
      /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: Colors.primary,
  },
  createPostButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  buttonPost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    padding: 16
  },
  textGroup: {
    lineHeight: 22,
    flex: 1
  },
  iconPlus: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default PostsScreen;
