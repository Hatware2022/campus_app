import React from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {useRoute} from '@react-navigation/native'
import moment from 'moment'

import {View, Container, Avatar} from '../../../common'
import Text from '../../../common/TextV2'

import * as Colors from '../../../config/colors'
import Header from '../../component/Header'
import Underline from '../../component/Underline'
import Gap from '../../../common/Gap'

import useGetUsers from '../../../hooks/useGetUsers'

/* =============================================================================
<GroupMemberScreen />
============================================================================= */
const GroupMemberScreen = () => {
  const route = useRoute()
  const {members, title, imageUrl} = route.params || {}
  const [membersDetails] = useGetUsers(members)

  const renderItem = ({item}) => (
    <View style={styles.containerMember}>
      <Avatar source={item?.imageUrl} size={38} />
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
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.userDetails}>
              <Avatar source={imageUrl} size={48} />
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
  )
}

const styles = StyleSheet.create({
  textTitle: {
    marginHorizontal: 16
  },
  userDetails: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  contentTextMember: {
    marginHorizontal: 16
  }
})

export default GroupMemberScreen
