import React from 'react';
import {StyleSheet,Image} from 'react-native';
import {Touchable, View, Avatar} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';
import FastImage from 'react-native-fast-image';

import UserImage from '../../../../assets/images/user.png';
import Underline from '../../../../user/component/Underline';
import moment from 'moment';
// import { Image } from 'react-native-svg';

/* =============================================================================
<GroupPostDetails />
============================================================================= */
const GroupPostDetails = ({data,userName}) => {
  return (
    <View>
      <View style={{flexDirection:'row',margin:10}}>
       <Avatar
            size={48}
            style={{marginBottom:10}}
            source={{uri: data.imageUrl ? data.imageUrl : null}}
          />
          <Text customStyle={styles.name} family="semi" size="big">
            {userName}
          </Text>
          <Text size="small" customStyle={styles.time}>
          {moment(new Date()).fromNow()}
        </Text>
          </View>
      <View style={styles.topContainer}>
     
        <View style={styles.userContainer}>
          
          <Image source={{uri: data?.imageUrl ? data?.imageUrl : null}} style={styles.images} />          
        </View>
      
      </View>
      <Text customStyle={{marginTop:20,color:'black',marginLeft:10}} family="semi" size="big">
            {data?.content}
          </Text>
      {/* create condition if image exist */}
      {/* <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={MockImage}
      /> */}

      <Text customStyle={styles.textDetail}>{data?.description}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{data?.likes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{data?.comments.length}</Text>
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
    justifyContent: 'center'
  },
  name: {
    marginLeft: 16,
    marginTop:10,
    fontWeight:'bold',
    fontSize:16
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10
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
    marginLeft:10
  },
  images:{
    width:'97%',
    height:230,
    borderRadius:10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginLeft:5
  }
});

export default GroupPostDetails;
