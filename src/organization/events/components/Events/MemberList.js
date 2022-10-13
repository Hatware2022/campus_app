import React from 'react'
import {StyleSheet} from 'react-native'
import {View, Avatar} from '../../../../common'
import Text from '../../../../common/TextV2'
import * as Colors from '../../../../config/colors'
const MAX_USERS = 3

/* =============================================================================
<MemberList />
============================================================================= */
const MemberList = props => {
  const _widthAva = () => {
    const users = props?.data?.length
    switch (users) {
      case 0:
        return 10
      case 1:
        return 40
      case 2:
        return 50
      default:
        return 70
    }
  }

  const maxFontSizeMultiplier = 1.5;
  return (
    <View style={styles.memberContainer}>
      <View style={[styles.memberAvatarContainer, {width: _widthAva()}]}>
        {props?.data?.slice(0, MAX_USERS).map((item, index) => (
          <Avatar
            size={36}
            key={item.userId}
            source={item.imageUrl ? {uri: item.imageUrl} : null}
            style={getAvatarStyle(index)}
          />
        ))}
      </View>
      <Text
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        customStyle={styles.textUser}
        color={Colors.black500}
      >
        {`${
          props?.data?.length
            ? `${props?.data?.length} people joined this event`
            : `Be the first to join`
        }`}
      </Text>
    </View>
  )
}

const getAvatarStyle = index => ({
  top: -(37 / 2),
  right: 15 * index,
  position: 'absolute'
})

const styles = StyleSheet.create({
  memberAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textUser: {
    marginLeft: 8,
    fontSize: 10
  }
})

export default MemberList
