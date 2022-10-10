import React, {useState, useEffect} from 'react'
import {StyleSheet} from 'react-native'

import userService from '../../../../services/user'
import session from '../../../../store/session'
import keys from '../../../../store/keys'

import {View, Avatar, Button, Touchable} from '../../../../common'
import Text from '../../../../common/TextV2'

import * as Colors from '../../../../config/colors'

const interpolation = [0, 35, 20, 5]

/* =============================================================================
<GroupMembers />
============================================================================= */
const GroupMembers = ({onPress, onPressGroup, isUserAGroupMember, members}) => {
  const [groupAvatars, setGroupAvatars] = useState(null)

  useEffect(() => {
    try {
      const last3membersData = members
        ?.slice(-3)
        ?.map(item => userService.getById(session.get(keys.token), item))
      Promise.all(last3membersData).then(res => {
        const forGroupAvatars = res.map(member => member?.data?.data?.imageUrl)
        setGroupAvatars(forGroupAvatars)
      })
    } catch (error) {}
  }, [members])

  return (
    <View style={styles.container}>
      <Touchable style={styles.memberContainer} onPress={onPressGroup}>
        <View style={styles.memberAvatarContainer}>
          {groupAvatars?.map((item, index, array) => (
            <Avatar
              size={36}
              key={item?.id}
              source={item}
              style={getAvatarStyle(index, array.length)}
            />
          ))}
        </View>
        {members.length ? (
          <Text
            size="small"
            color={Colors.black500}
            customStyle={{
              marginHorizontal: 8,
              position: 'relative',
              right: interpolation[groupAvatars?.length]
            }}
          >
            {`${members?.length} members`}
          </Text>
        ) : null}
      </Touchable>
      <Button
        title={isUserAGroupMember ? 'Leave Group' : 'Join Group'}
        style={isUserAGroupMember ? styles.leaveButton : styles.joinButton}
        onPress={onPress}
        textStyle={
          isUserAGroupMember ? styles.textLeaveButton : styles.textJoinButton
        }
      />
    </View>
  )
}

const getAvatarStyle = (index, length) => {
  return {
    top: -(37 / 2),
    right: 15 * index + interpolation[length],
    position: 'absolute'
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  memberAvatarContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  leaveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.white200
  },
  textLeaveButton: {
    color: Colors.primary,
    fontFamily: 'Rubik-Medium'
  },
  textJoinButton: {
    color: Colors.white100,
    fontFamily: 'Rubik-Medium'
  }
})

export default GroupMembers
