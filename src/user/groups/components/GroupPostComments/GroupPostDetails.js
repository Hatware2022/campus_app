import React, {useEffect, useState} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Touchable, View, Avatar} from '../../../../common'
import Text from '../../../../common/TextV2'

import * as Colors from '../../../../config/colors'

import LikeIcon from '../../../../assets/icons/app-likes.svg'
import CommentIcon from '../../../../assets/icons/app-comments.svg'
import FastImage from 'react-native-fast-image'

import userService from '../../../../services/user'
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
const GroupPostDetails = ({data,reload,totalcomments,apiPath}) => {
  const [userDetail, setUserDetail] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    try {
      userService
        .getById(session.get(keys.token), data.createdBy)
        .then(result => {
          if (result.error) {
            setErrorMessage(result.error)
            return
          }

          if (result.data && result.data.success === false) {
            setErrorMessage(result.data.message)
            return
          }
          setUserDetail(result.data.data)
        })
    } catch (error) {
      setErrorMessage('No posts')
    }
  }, [data.createdBy])

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
        url: `${constants.API_URL}/${apiPath}/like/${data.id}`,
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
            source={{uri: userDetail?.imageUrl ? userDetail?.imageUrl : null}}
          />
          <Text customStyle={styles.name} family="semi" size="big">
            {userDetail?.name}
          </Text>
          <Text size="small" customStyle={styles.time}>
          {moment(data?.createdAt).fromNow()}
        </Text>
          </View>
      <View style={styles.topContainer}>

      <Text customStyle={{color:'black',marginLeft:10, fontSize:15,}} >
      {data?.content}
      </Text>
        
        {data?.imageUrl?
        <View style={styles.userContainer}>
          <Image source={{uri: data?.imageUrl ? data?.imageUrl : null}} style={styles.images} />          
        </View>:null}
      
      </View>
      <Text customStyle={styles.textDetail}>{data?.description}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonContainer}>
          <Touchable style={styles.likeButton} onPress={_handleLike}>
            <LikeIcon />
            <Text customStyle={styles.likeButtonText}>{totalLikes}</Text>
          </Touchable>
          <Touchable style={styles.commentButton}>
            <CommentIcon />
            <Text customStyle={styles.commentButtonText}>{totalcomments}</Text>
          </Touchable>
        </View>
      </View>
      <Gap height={36} />
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
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
