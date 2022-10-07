import React, {useEffect, useState} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Touchable, View, Avatar} from '../../../../common'
import Text from '../../../../common/TextV2'

import * as Colors from '../../../../config/colors'

import LikeIcon from '../../../../assets/icons/app-likes.svg'
import CommentIcon from '../../../../assets/icons/app-comments.svg'
import FastImage from 'react-native-fast-image'

import userService from '../../../../services/user'

import UserImage from '../../../../assets/images/user.png'
import Underline from '../../../../user/component/Underline'
import moment from 'moment'
import session from '../../../../store/session'
import keys from '../../../../store/keys'
import utils from '../../../../utils/utils'
import axios from 'axios'
import constants from '../../../../utils/constants'
import Gap from '../../../../common/Gap';
// import { Image } from 'react-native-svg';

/* =============================================================================
<GroupPostDetails />
============================================================================= */
const GroupPostDetails = ({data,reload,totalcomments}) => {
  const [totalLikes, setTotalLikes] = useState()
  // const [totalcomments, setTotalComments] = useState();

  useEffect(()=>{
    setTotalLikes(data?.likes)
    // setTotalComments(data?.comments.length)
  },[data])

  const _handleLike = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;

    let arr = Array.from(data?.likes) || [];
    if (arr.find(k => k.userId === tokenData.id)) return;

    arr.push({
      userId: tokenData.id,
      date: moment().format(),
    });
    let token = session.get(keys.token)
    try {
      let response =  axios({
        url: `${constants.API_URL}/post/like/${data.id}`,
        method: 'POST',
        headers:{
          'Authorization': token,
          // 'Content-Type': 'application/json'
        }
      }).then((e)=>{
        if (e.data && e.data.success === true) {
          if(e.data.code === "REACTION_DELETED"){
            setTotalLikes(totalLikes-1)
          }else{
            setTotalLikes(totalLikes+1)
          }
          reload();
        }
      })
    } catch (error) {
    }
  };
  return (
    <View>
      <View style={{flexDirection:'row',margin:10,}}>
       <Avatar
            size={48}
            style={{marginBottom:10}}
            source={{uri: data?.user?.imageUrl ? data?.user?.imageUrl : null}}
          />
          <Text customStyle={styles.name} family="semi" size="big">
            {data?.user?.name ? data?.user?.name : 'dummy'}
          </Text>
          <Text size="small" customStyle={styles.time}>
          {moment(new Date()).fromNow()}
        </Text>
          </View>
      <View style={styles.topContainer}>

      <Text customStyle={{marginTop:10,color:'black',marginLeft:10, fontSize:15}} >
      {data?.content}
      </Text>
        
        {data?.imageUrl?
        <View style={styles.userContainer}>
          <Image source={{uri: data?.imageUrl ? data?.imageUrl : null}} style={styles.images} />          
        </View>:null}
      
      </View>
      {/* create condition if image exist */}
      {/* <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={MockImage}
      /> */}

      <Text customStyle={styles.textDetail}>{data?.description}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton} onPress={()=>_handleLike()}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{totalLikes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{totalcomments}</Text>
          </Touchable>
        </View>
      </View>
      {/* <Underline /> */}
      <Gap height={36} />
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    marginLeft: 16,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  time: {
    color: Colors.black400,
    alignItems:'center',
    marginLeft: 'auto',
    marginTop: 10
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
