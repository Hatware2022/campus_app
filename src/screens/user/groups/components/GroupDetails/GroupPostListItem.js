import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, Text, View, Avatar, Card} from '../../../../common';

import * as Colors from '../../../../config/colors';

import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';

import UserImage from '../../../../assets/images/user.png';

import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<GroupPostListItem />
============================================================================= */
const GroupPostListItem = ({data}) => {
  const navigation = useNavigation();

  const _moveToComments = () => {
    navigation.navigate('GroupPostComments', {post: data});
  };

  return (
    <Touchable onPress={_moveToComments} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userContainer}>
          <Avatar size={56} source={UserImage} />
          <Text style={styles.name}>{data.name}</Text>
        </View>
        <Text style={styles.time}>{data.time}</Text>
      </View>

      <Card marginVertical={15} height={154}>
        <Text>{data.description}</Text>
      </Card>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon />
            <Text style={styles.likeButtonText}>{data.likes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton} onPress={_moveToComments}>
            <CommentIcon />
            <Text style={styles.commentButtonText}>{data.comments}</Text>
          </Touchable>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: Colors.border,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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

export default GroupPostListItem;
