import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, Text, View, Avatar} from '../../../../common';

import * as Colors from '../../../../config/colors';

import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';

import UserImage from '../../../../assets/images/user.png';

/* =============================================================================
<AnnouncementListItem />
============================================================================= */
const AnnouncementListItem = ({data}) => {
  return (
    <Touchable onPress={() => null} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userContainer}>
          <Avatar size={56} source={UserImage} />
          <Text style={styles.name}>{data.name}</Text>
        </View>
        <Text style={styles.time}>{data.time}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data.description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon />
            <Text style={styles.likeButtonText}>{data.likes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text style={styles.commentButtonText}>{data.comments}</Text>
          </Touchable>
        </View>

        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>For Sale</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText} />
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tag: {
    height: 31,
    minWidth: 91,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: 14,
    color: Colors.primary,
  },
});

export default AnnouncementListItem;
