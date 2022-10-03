import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar, Card} from '../../../../common';
import Text from '../../../../common/TextV2';
import * as Colors from '../../../../config/colors';
import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';
import UserImage from '../../../../assets/images/user.png';
import keys from '../../../../store/keys';
import session from '../../../../store/session';
import userService from '../../../../services/user';
import postService from '../../../../services/post';
import moment from 'moment';
import utils from '../../../../utils/utils';
import FastImage from 'react-native-fast-image';
import Underline from '../../../../user/component/Underline';
import MockImage from '../../../../assets/images/empty-image.png';

/* =============================================================================
<ChatPostDetails />
============================================================================= */
const ChatPostDetails = props => {
  const [user, setUser] = useState(null);
  const data = props.data;

  useEffect(() => {
    const tokenData = utils.decodeJwt(session.get(keys.token)) || data.id;
    if (!data) return;
    userService.getById(session.get(keys.token), tokenData.id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setUser(r);
      }
    });
  }, []);

  const _handleLike = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    console.log('postService ',tokenData)
    if (!tokenData) return;

    let arr = Array.from(props?.data?.likes) || [];
    if (arr.find(k => k.userId === tokenData.id)) return;

    arr.push({
      userId: tokenData.id,
      date: moment().format(),
    });
    let t = {
      ...props.data,
      likes: arr,
    };
    postService
      .update(session.get(keys.token), props.data.id, t)
      .then(result => {
        if (result.data && result.data.success === true) {
          props.reload();
        }
      });
  };


  return (
    <View>
      <View style={styles.topContainer}>
        {data && data?.user && (
          <View style={styles.userContainer}>
            <Avatar
              size={48}
              source={{uri: data?.user?.imageUrl ? data?.user?.imageUrl : null}}
            />
            <Text customStyle={styles.name} family="semi" size="big">
              {data?.user?.name}
            </Text>
          </View>
        )}
        <Text size="small" customStyle={styles.time}>
          {moment(data.createdAt).fromNow()}
        </Text>
      </View>

      {/* create condition if image exist */}
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={data && data?.imageUrl ? {uri:data?.imageUrl} :MockImage}
        resizeMode={'cover'}
      />

      <Text customStyle={styles.textDetail}>{data?.content}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon onPress={_handleLike} />
            <Text customStyle={styles.likeButtonText}>{data?.likes ? data?.likes : 0}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>
              {data?.comments && data?.comments.length > 0 ? data?.comments.length : 0}
            </Text>
          </Touchable>
        </View>
      </View>
      <Underline />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 7,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
  },
  name: {
    marginLeft: 16,
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center',
    marginRight:5
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  likeButtonText: {
    marginLeft: 5,
    color: Colors.primary,
  },
  commentButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    marginLeft: 5,
  },
  image: {
    width: 310,
    height: 202,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor:'rgba(0,0,0,0.05)',
    borderColor:'rgba(0,0,0,0.1)',
    borderWidth:0.5,
    margin:5
  },
  textDetail: {
    marginVertical: 12,
    marginLeft: 5,
  },
});

export default ChatPostDetails;
