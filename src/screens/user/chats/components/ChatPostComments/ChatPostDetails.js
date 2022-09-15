import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, Text, View, Avatar, Card} from '../../../../common';
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

/* =============================================================================
<ChatPostDetails />
============================================================================= */
const ChatPostDetails = props => {

	const [user, setUser] = useState(null);
  const data = props.data;

	useEffect(() => {
		if (!data) return;
		userService.getById(session.get(keys.token), data.userId)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setUser(r);
				}
			});
	}, []);

	const _handleLike = () => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;

		let arr = Array.from(props.data.likes) || [];
		if(arr.find(k => k.userId === tokenData._id)) return;
		
		arr.push({
			userId: tokenData._id,
			date: moment().format()
		});
		let t = {
			...props.data,
			likes: arr
		}
		postService.update(session.get(keys.token), props.data._id, t)
			.then(result => {
				if(result.data && result.data.success === true) {
					props.reload();
				}
			});
	}

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {
          user &&
          <View style={styles.userContainer}>
            <Avatar size={56} source={{uri: user.imageUrl ? user.imageUrl : null}} />
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          </View>
        }
        <Text style={styles.time}>{moment(data.created_at).fromNow()}</Text>
      </View>

      <Card marginVertical={15}>
        <Text>{data.detail}</Text>
      </Card>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon onPress={_handleLike} />
            <Text style={styles.likeButtonText}>{data.likes.length}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text style={styles.commentButtonText}>{data.comments.length}</Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
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
    fontSize: 15,
    marginLeft: 10,
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText,
  },
  descriptionContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
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
    fontSize: 12,
    marginLeft: 5,
    color: Colors.primary,
  },
  commentButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ChatPostDetails;
