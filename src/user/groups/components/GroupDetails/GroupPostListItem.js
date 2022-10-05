import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Touchable, View, Avatar} from '../../../../common'
import Text from '../../../../common/TextV2'

import session from '../../../../store/session'
import keys from '../../../../store/keys'

import userService from '../../../../services/user'

import * as Colors from '../../../../config/colors'

import LikeIcon from '../../../../assets/icons/app-likes.svg'
import CommentIcon from '../../../../assets/icons/app-comments.svg'

// import UserImage from '../../../../assets/images/user.png'

import {useNavigation} from '@react-navigation/native'
import Gap from '../../../../common/Gap'

/* =============================================================================
<GroupPostListItem />
============================================================================= */
const GroupPostListItem = ({data}) => {
  const [userDetail, setUserDetail] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    try {
      userService
        .getById(session.get(keys.token), data.createdBy)
        .then(result => {
          if (result.error) {
            setErrorMessage(result.error)
            return
          }

          if (result.data && result.data.success === false) {
            setErrorMessage(result.data.message)
            return
          }

          setUserDetail(result.data.data)
        })
    } catch (error) {
      setErrorMessage('No posts')
    }
  }, [data.createdBy])

  const navigation = useNavigation()

  const _moveToComments = () => {
    navigation.navigate('GroupPostComments', {post: data})
  }

  return (
    <Touchable onPress={_moveToComments} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userContainer}>
          <Avatar size={48} source={userDetail?.imageUrl} />
          {/* <Avatar size={48} source={UserImage} /> */}
          <Text size="big" family="semi" customStyle={styles.name}>
            {userDetail?.name}
          </Text>
        </View>
        <Text size="small" customStyle={styles.time}>
          {new Date(data.createdAt).toLocaleString()}
        </Text>
      </View>
      <Gap height={12} />

      <View style={styles.containerDesc}>
        <Text>{data.content}</Text>
      </View>

      <Gap height={12} />

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{data.likes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton} onPress={_moveToComments}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{data.comments}</Text>
          </Touchable>
        </View>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.background
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    marginLeft: 16
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  likeButtonText: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.primary
  },
  commentButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentButtonText: {
    fontSize: 12,
    marginLeft: 5
  },
  containerDesc: {
    padding: 8,
    bordeRadius: 8,
    backgroundColor: Colors.white200
  }
})

export default GroupPostListItem
