import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';
import MockImage from '../../../../assets/images/mock-comment.png';
import FastImage from 'react-native-fast-image';

import UserImage from '../../../../assets/images/user.png';
import session from '../../../../store/session';
import utils from '../../../../utils/utils';
import keys from '../../../../store/keys';
import userService from '../../../../services/user';
import postService from '../../../../services/post';
import moment from 'moment';
import Underline from '../../../../user/component/Underline';

/* =============================================================================
<PostDetails />
============================================================================= */
const PostDetails = props => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    if (!data) return;
    userService.getById(session.get(keys.token), data.userId).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setUser(r);
      }
    });
  }, []);

  const reload = () => {
    postService.getById(session.get(keys.token), data._id).then(result => {
      if (result.data && result.data.success === true) {
        setData(result.data.data);
      }
    });
  };

  const _handleLike = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;

    let arr = Array.from(data.likes) || [];
    if (arr.find(k => k.userId === tokenData._id)) return;

    arr.push({
      userId: tokenData._id,
      date: moment().format(),
    });
    let t = {
      ...data,
      likes: arr,
    };
    postService.update(session.get(keys.token), data._id, t).then(result => {
      if (result.data && result.data.success === true) {
        reload();
      }
    });
  };

  return (
    <View>
      <View style={styles.topContainer}>
        {user && (
          <View style={styles.userContainer}>
            <Avatar
              size={48}
              source={{uri: user.imageUrl ? user.imageUrl : null}}
            />
            <Text customStyle={styles.name} family="semi" size="big">
              {user.firstName} {user.lastName}
            </Text>
          </View>
        )}
        <Text size="small" customStyle={styles.time}>
          {moment(data.created_at).fromNow()}
        </Text>
      </View>

      {/* create condition if image exist */}
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={MockImage}
      />

      <Text customStyle={styles.textDetail}>{data.detail}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon onPress={_handleLike} />
            <Text customStyle={styles.likeButtonText}>{data?.likes.length}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>
              {data.comments.length}
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
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 16,
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: 343,
    height: 232,
    borderRadius: 8,
    marginTop: 12,
  },
  textDetail: {
    marginVertical: 12,
  },
});

export default PostDetails;
