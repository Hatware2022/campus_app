import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';

import {View, Container, Content, Avatar} from '../../../common';
import Text from '../../../common/TextV2';
import userService from '../../../services/user';
import session from '../../../store/session';
import keys from '../../../store/keys';

import UserImage from '../../../assets/images/user.png';

import * as Colors from '../../../config/colors';
import Header from '../../component/Header';
import Underline from '../../component/Underline';
import Gap from '../../../common/Gap';

/* =============================================================================
<GroupMemberScreen />
============================================================================= */
const GroupMemberScreen = () => {
  const route = useRoute();
  const {members, title} = route.params || {};
  const [membersDetails, setMembersDetails] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    try {
      const membersData = members?.map((item) => 
        userService.getById(session.get(keys.token), item));
      Promise.all(membersData).then((res) => {
        const membersDataDetails = res.map(member => member?.data?.data);
        setMembersDetails(membersDataDetails);
      })
    } catch (error) {}
  }, [members])

  const renderItem = ({item}) => (
    <View style={styles.containerMember}>
      <Avatar source={item.imageUrl} size={38} />
      <View style={styles.contentTextMember}>
        <Text family="bold">{item?.name}</Text>
        <Gap height={4} />
        <Text size="small" color={Colors.black400}>
          {`Joined since ${moment(item?.createdAt).format('MMM YYYY')}`}
        </Text>
      </View>
    </View>
  )

  return (
    <Container>
      <Header title={'Group Member List'} />
        <View style={{height: insets.top, backgroundColor: Colors.primary}} />

        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.userDetails}>
                <Avatar source={UserImage} size={48} />
                <Text size="big" family="semi" customStyle={styles.textTitle}>
                  {title}
                </Text>
              </View>    
              <Underline marginVertical={16} />
            </>        
          }
          data={membersDetails}
          renderItem={renderItem}
        />
    </Container>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    marginHorizontal: 16,
  },

  userDetails: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  contentTextMember: {
    marginHorizontal: 16,
  },
});

export default GroupMemberScreen;
