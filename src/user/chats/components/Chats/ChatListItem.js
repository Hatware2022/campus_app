import * as Colors from '../../../../config/colors'

import {Avatar, Touchable, View} from '../../../../common'
import {Image, StyleSheet} from 'react-native'
import React, {useEffect, useState} from 'react'

import CommentIcon from '../../../../assets/icons/app-comments.svg'
import DotIcon from '../../../../assets/icons/icon-dot.svg'
import Gap from '../../../../common/Gap'
import LikeIcon from '../../../../assets/icons/app-likes.svg'
import ReportModal from '../../../../components/Modals/reportModal'
import Text from '../../../../common/TextV2'
import a11y from '../../../../utils/accessibility'
import axios from 'axios'
import constants from '../../../../utils/constants'
import keys from '../../../../store/keys'
import moment from 'moment'
import postService from '../../../../services/post'
import session from '../../../../store/session'
import {useNavigation} from '@react-navigation/native'
import userService from '../../../../services/user'
import utils from '../../../../utils/utils'

/* =============================================================================
<ChatListItem />
============================================================================= */
const ChatListItem = props => {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const [totalLikes, setTotalLikes] = useState()
  const [viewModal, setViewModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setTotalLikes(props?.data?.likes)

    const tokenData = utils.decodeJwt(session.get(keys.token))
    if (!tokenData) {
      return
    }
    setCurrentUser(tokenData)
  }, [props?.data])

  const _moveToChatComments = () => {
    navigation.navigate('GroupPostComments', {post: props.data})
  }

  // useEffect(() => {
  //   if (!props.data) return;
  //   userService
  //     .getById(session.get(keys.token), props.data.id)
  //     .then(result => {
  //       if (result.data && result.data.success === true) {
  //         let r = result.data.data;
  //         setUser(r);
  //       }
  //     });
  // }, []);

  const _handleLike = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token))
    if (!tokenData) {
      return
    }

    let arr = Array.from(props.data?.likes) || []
    if (arr.find(k => k.userId === tokenData.id)) {
      return
    }

    arr.push({
      userId: tokenData.id,
      date: moment().format()
    })
    let t = {
      ...props.data,
      likes: arr
    }
    let token = session.get(keys.token)
    let loginType = session.get(keys.loginType) || null
    try {
      let response = axios({
        // url: `${constants.API_URL}/post/like/${props.data.id}`,
        url:
          loginType === 'organization'
            ? `${constants.API_URL}/club/posts/${props.data.id}/like`
            : `${constants.API_URL}/post/like/${props.data.id}`,
        method: 'POST',
        headers: {
          Authorization: token
          // 'Content-Type': 'application/json'
        }
      }).then(e => {
        if (e.data && e.data.success === true) {
          if (e.data?.code === 'REACTION_DELETED') {
            setTotalLikes(totalLikes - 1)
          } else {
            setTotalLikes(totalLikes + 1)
          }
          props.reload()
        }
      })
    } catch (error) {}
  }

  const _handReportPost = (comment, id) => {
    const params = {
      comment,
      reportedIds: [id],
      type: 'post'
    }
    try {
      userService
        .reportPost(session.get(keys.token), params)
        .then(res => {
          if (res?.data?.success) {
            setViewModal(false)
            alert(res.data.message)
          }
        })
        .catch(_err => {})
    } catch (_err) {}
  }

  const _deletePost = data => {
    if (data.createdBy === currentUser.id) {
      try {
        postService
          .delete(session.get(keys.token), data.id)
          .then(res => {
            if (res?.data?.success) {
              setViewModal(false)
              alert(res.data.message)
              props.reload()
            }
          })
          .catch(_err => {
            console.log(_err)
          })
      } catch (_err) {
        console.log(_err)
      }
    } else {
      return alert('Not authorized to delete this post')
    }
  }

  const _hidePost = data => {
    if (data.createdBy === currentUser.id) {
      try {
        postService
          .hide(session.get(keys.token), data.id)
          .then(res => {
            if (res?.data?.success) {
              setViewModal(false)
              alert(res.data.message)
              props.reload()
            }
          })
          .catch(_err => {
            console.log(_err)
          })
      } catch (_err) {
        console.log(_err)
      }
    } else {
      return alert('Not authorized to hide this post')
    }
  }

  function myDebounce(call,t){
    let timmer;
    return function (...arg){
      if(timmer) clearTimeout(timmer)
      timmer = setTimeout(()=>{
        call()
      },t)
    }
  }

  const BetterFunction=myDebounce(_moveToChatComments,1000);

  return (
    <>
      {(props?.data?.createdBy === currentUser?.id ||
        (props?.data?.createdBy !== currentUser?.id &&
          !props?.data?.isHidden)) && (
        <View style={styles.container}>
          <Touchable onPress={BetterFunction} style={styles.topContainer}>
            {props?.data && props?.data?.user && (
              <View
                style={styles.userContainer}
                {...a11y(`text input ${props?.data?.user?.name}`)}
              >
                <Avatar
                  size={48}
                  source={{
                    uri: props?.data?.user.imageUrl
                      ? props?.data?.user.imageUrl
                      : null
                  }}
                />
                <Text size="big" family="semi" customStyle={styles.name}>
                  {props?.data?.user?.name
                    ? props?.data?.user?.name
                    : 'Name not found'}
                </Text>
                <Text size="small" family="semi" customStyle={styles.hidden}>
                  {props?.data?.createdBy == currentUser?.id &&
                  props?.data?.isHidden
                    ? 'Only you can see this post'
                    : ''}
                </Text>
              </View>
            )}
            <Touchable
              style={{flexDirection: 'row', paddingHorizontal: 2}}
              onPress={() => setViewModal(true)}
              {...a11y('double tap for post options')}
            >
              <DotIcon />
            </Touchable>
          </Touchable>
          <Gap height={16} />

          <Text customStyle={{marginLeft: 7}}>{props.data?.content}</Text>
          <Gap height={12} />
          {props?.data?.imageUrl != null && props?.data?.imageUrl != '' ? (
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
                props?.data?.imageUrl != null
                  ? {uri: props?.data?.imageUrl}
                  : {}
              }
            />
          ) : null}

          <View style={styles.tagContainer}>
            {props?.data &&
              props?.data?.tags?.length > 0 &&
              props?.data?.tags.map(k => {
                return (
                  <View style={styles.tag} key={k}>
                    <Text customStyle={styles.tagText}>{k}</Text>
                  </View>
                )
              })}
          </View>

          <View style={styles.actionButtonContainer}>
            <Touchable
              style={styles.likeButton}
              onPress={_handleLike}
              {...a11y(`Number of likes ${totalLikes}`)}
            >
              <LikeIcon />
              <Text customStyle={styles.likeButtonText}>
                {totalLikes || '0'}
              </Text>
            </Touchable>
            <Touchable
              style={styles.commentButton}
              onPress={() =>
                navigation.navigate('GroupPostComments', {post: props.data})
              }
              {...a11y(
                `Number of comments ${props?.data?.comments?.length || 0}`
              )}
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
        </View>
      )}
      <ReportModal
        titlemessage={'Post Options'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onDelete={() => _deletePost(props.data)}
        onHide={() => _hidePost(props.data)}
        isHidden={props.data.isHidden}
        onReport={comment => _handReportPost(comment, props.data.id)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    padding: 16,
    // borderRadius: 8,
    backgroundColor: Colors.background
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  hidden: {
    marginLeft: 10,
    color: Colors.black400
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
    // marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5
  },
  tag: {
    height: 31,
    // minWidth: 91,
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
  }
})

export default ChatListItem
