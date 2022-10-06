import React, {useState, useEffect} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Touchable, View, Avatar} from '../../../common'
import Text from '../../../common/TextV2'
import * as Colors from '../../../config/colors'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import utils from '../../../utils/utils'
import session from '../../../store/session'
import keys from '../../../store/keys'
import userService from '../../../services/user'
import Gap from '../../../common/Gap'
import reactotron from 'reactotron-react-native'

/* =============================================================================
<ProfileListItem />
============================================================================= */
const ProfileListItem = ({data}) => {
  const navigation = useNavigation()

  const _moveToProfile = () => {
    navigation.navigate('ProfileDetails', {
      _id: data?.id,
      fromScreen: 'NewChat'
    })
  }

  return (
    <Touchable onPress={_moveToProfile} style={styles.container}>
      <Avatar
        size={48}
        source={data?.imageUrl ? {uri: data?.imageUrl} : null}
      />
      <View style={styles.centerContainer}>
        <View horizontal alignItems="center" justifyContent="space-between">
          <Text size="big" family="semi">
            {data?.name}
          </Text>
          <TouchableOpacity style={styles.viewProfile} onPress={_moveToProfile}>
            <Text size="big" family="semi" color={Colors.black500}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>

        <Gap height={4} />
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerContainer: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 18
  },
  message: {
    marginTop: 3,
    color: Colors.secondaryText
  },
  rightContainer: {
    height: 20
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText
  },
  viewProfile: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.black500
  }
})

export default ProfileListItem
