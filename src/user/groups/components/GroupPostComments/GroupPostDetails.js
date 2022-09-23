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
// import { Image } from 'react-native-svg';

/* =============================================================================
<GroupPostDetails />
============================================================================= */
const GroupPostDetails = ({data}) => {
  return (
    <View>
      <View style={{flexDirection:'row'}}>
       <Avatar
            size={48}
            style={{marginBottom:10}}
            source={{uri: data.imageUrl ? data.imageUrl : null}}
          />
          <Text customStyle={styles.name} family="semi" size="big">
            {data.name}
          </Text>
          </View>
      <View style={styles.topContainer}>
     
        <View style={styles.userContainer}>
          
          <Image source={{uri: data.imageUrl ? data.imageUrl : null}} style={styles.images} />
          {console.log(JSON.stringify(data))}
          
        </View>
        
        <Text size="small" customStyle={styles.time}>
          {data.time}
        </Text>
      </View>
      <Text customStyle={{marginTop:20,color:'black'}} family="semi" size="big">
            {data.content}ssdsd
          </Text>
      {/* create condition if image exist */}
      {/* <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={MockImage}
      /> */}

      <Text customStyle={styles.textDetail}>{data.description}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{data.likes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{data.comments.length}</Text>
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
    marginTop:10,
    fontWeight:'bold',
    fontSize:16
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
  images:{width:'100%',height:230,borderRadius:10}
});

export default GroupPostDetails;
