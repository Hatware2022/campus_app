import React, {useEffect, useState} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Touchable, View, Avatar} from '../../../../common'
import Text from '../../../../common/TextV2'
import * as Colors from '../../../../config/colors'
import LikeIcon from '../../../../assets/icons/app-likes.svg'
import CommentIcon from '../../../../assets/icons/app-comments.svg'
import {useNavigation} from '@react-navigation/native'
import session from '../../../../store/session'
import keys from '../../../../store/keys'
import moment from 'moment'
import Gap from '../../../../common/Gap'
import DotIcon from '../../../../assets/icons/icon-dot.svg'

/* =============================================================================
<PostListItem />
============================================================================= */
const PostListItem = props => {
  const navigation = useNavigation()
  const [totalLikes, setTotalLikes] = useState()

  useEffect(() => {
    setTotalLikes(props?.data?.likes?.length)
  }, [props?.data])

  const _moveToChatComments = () => {
    navigation.navigate('GroupPostComments', {post: props.data})
  }

  const _handleLike = () => {
    let loginType = session.get(keys.loginType)
    if (loginType === 'organization') {
      alert(
        'You are logged in as Club. Please like this post when you are logged in as User'
      )
    }
  }

  function myDebounce(call, t) {
    let timmer
    return function (...arg) {
      if (timmer) {
        clearTimeout(timmer)
      }
      timmer = setTimeout(() => {
        call()
      }, t)
    }
  }

  const BetterFunction = myDebounce(_moveToChatComments, 1000)

  return (
    <Touchable onPress={BetterFunction} style={styles.container}>
      <View style={styles.topContainer}>
        {props?.data && props?.data?.user && (
          <View style={styles.userContainer}>
            <Avatar
              size={48}
              source={{
                uri: props?.data?.user.imageUrl
                  ? props?.data?.user.imageUrl
                  : null
              }}
            />
            <Text size="big" family="semi" customStyle={styles.name}>
              {props?.data?.user?.name ? props?.data?.user?.name : 'dummy'}
            </Text>
          </View>
        )}
        <Touchable style={{justifyContent: 'center'}}>
          <DotIcon />
        </Touchable>
      </View>
      <Gap height={16} />

      <Text customStyle={{marginLeft: 7}}>{props.data?.content}</Text>
      <Gap height={12} />
      {props?.data?.imageUrl && (
        <Image
          style={{
            height: 300,
            width: '98%',
            marginBottom: 10,
            borderRadius: 10,
            alignSelf: 'center'
          }}
          resizeMode={'cover'}
          source={
            props?.data?.imageUrl !== null || props?.data?.imageUrl != ''
              ? {uri: props?.data?.imageUrl}
              : {}
          }
        />
      )}

      <View style={styles.tagContainer}>
        {props?.data &&
          props?.data?.tags?.length > 0 &&
          props?.data?.tags.map((k, i) => {
            return (
              <View style={styles.tag} key={i}>
                <Text customStyle={styles.tagText}>{k.tag ? k.tag : k}</Text>
              </View>
            )
          })}
      </View>

      <View style={styles.actionButtonContainer}>
        <Touchable style={styles.likeButton} onPress={_handleLike}>
          <LikeIcon />
          <Text customStyle={styles.likeButtonText}>{totalLikes || '0'}</Text>
        </Touchable>
        <Touchable
          style={styles.commentButton}
          onPress={() =>
            navigation.navigate('GroupPostComments', {post: props.data})
          }
        >
          <CommentIcon />
          <Text customStyle={styles.commentButtonText}>
            {props?.data?.comments ? props?.data?.comments?.length : '0'}
          </Text>
        </Touchable>
      </View>
      <Text size="medium" customStyle={styles.time}>
        {moment(props.data.createdAt).fromNow()}
      </Text>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: 10
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    marginLeft: 16,
    fontWeight: 'bold'
  },
  time: {
    color: Colors.black400,
    marginTop: 12,
    marginLeft: 3
    // alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 232,
    borderRadius: 8,
    marginBottom: 16
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 5
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18
  },
  likeButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: Colors.primary
  },
  commentButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentButtonText: {
    fontSize: 16,
    marginLeft: 8
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5
  },
  tag: {
    height: 31,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary
  },
  tagText: {
    fontSize: 12,
    color: Colors.primary,
    paddingHorizontal: 6
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: 'grey',
    borderRadius: 20,
    marginLeft: 1.5
  }
})

export default PostListItem
