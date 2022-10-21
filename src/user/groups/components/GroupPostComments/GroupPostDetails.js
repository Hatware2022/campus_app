import React, {useEffect, useState} from 'react'
import {Image, StyleSheet} from 'react-native'
import {Avatar, Touchable, View} from '../../../../common'
import Text from '../../../../common/TextV2'

import * as Colors from '../../../../config/colors'

import CommentIcon from '../../../../assets/icons/app-comments.svg'
import LikeIcon from '../../../../assets/icons/app-likes.svg'

import moment from 'moment'
import Gap from '../../../../common/Gap'
import userService from '../../../../services/user'
import keys from '../../../../store/keys'
import session from '../../../../store/session'

/* =============================================================================
<GroupPostDetails />
============================================================================= */
const GroupPostDetails = ({data, reload, totalcomments, apiPath}) => {
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

  const [totalLikes, setTotalLikes] = useState(null)

  useEffect(() => {
    setTotalLikes(data?.likes?.length)
  }, [data])

  const _handleLike = () => {
    let loginType = session.get(keys.loginType)
    if (loginType === 'organization') {
      alert(
        'You are logged in as Club. Please like this post when you are logged in as User'
      )
    }
  }
  return (
    <View>
      <View style={{flexDirection: 'row', margin: 10}}>
        <Avatar
          size={48}
          style={{marginBottom: 10}}
          source={{uri: userDetail?.imageUrl ? userDetail?.imageUrl : null}}
        />
        <Text customStyle={styles.name} family="semi" size="big">
          {userDetail?.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text customStyle={styles.time}>
          Posted {moment(data?.createdAt).fromNow()}
        </Text>
      </View>
      <View style={styles.topContainer}>
        <Text customStyle={{color: 'black', marginLeft: 10, fontSize: 15}}>
          {data?.content}
        </Text>

        {data?.imageUrl ? (
          <View style={styles.userContainer}>
            <Image
              source={{uri: data?.imageUrl ? data?.imageUrl : null}}
              style={styles.images}
            />
          </View>
        ) : null}
      </View>
      <Text customStyle={styles.textDetail}>{data?.description}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton} onPress={_handleLike}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{totalLikes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{totalcomments}</Text>
          </Touchable>
        </View>
      </View>
      <Gap height={36} />
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  name: {
    marginLeft: 16,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  time: {
    color: Colors.black400,
    marginLeft: 'auto'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18
  },
  likeButtonText: {
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 15
  },
  commentButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentButtonText: {
    marginLeft: 8,
    fontSize: 15
  },
  image: {
    width: 343,
    height: 232,
    borderRadius: 8,
    marginTop: 12
  },
  textDetail: {
    marginVertical: 12,
    marginLeft: 10
  },
  images: {
    width: '97%',
    height: 230,
    borderRadius: 10,
    marginLeft: 5
  }
})

export default GroupPostDetails
