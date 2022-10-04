import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Touchable, View, Avatar, Card} from '../../../../common';
import Text from '../../../../common/TextV2';
import * as Colors from '../../../../config/colors';
import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';
import UserImage from '../../../../assets/images/user.png';
import {useNavigation} from '@react-navigation/native';
import userService from '../../../../services/user';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import moment from 'moment';
import utils from '../../../../utils/utils';
import Gap from '../../../../common/Gap';
import axios from 'axios';
import constants from '../../../../utils/constants';
import DemoImage from '../../../../assets/images/empty-image.png';

/* =============================================================================
<ChatListItem />
============================================================================= */
const ChatListItem = props => {
  const navigation = useNavigation();
  const [totalLikes, setTotalLikes] = useState();

  useEffect(()=>{
    setTotalLikes(props?.data?.likes)
  },[props?.data])

  const _moveToChatComments = () => {
    navigation.navigate('GroupPostComments', {post: props.data});
  };

  // useEffect(() => {
  //   const tokenData = utils.decodeJwt(session.get(keys.token)) || props.data.id;
  //   if (!props.data) return;
  //   userService
  //     .getById(session.get(keys.token), tokenData.id)
  //     .then(result => {
  //       if (result.data && result.data.success === true) {
  //         let r = result.data.data;
  //         setUser(r);
  //       }
  //     });
  // }, []);

  const _handleLike = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;

    let arr = Array.from(props.data?.likes) || [];
    if (arr.find(k => k.userId === tokenData.id)) return;

    arr.push({
      userId: tokenData.id,
      date: moment().format(),
    });
    let t = {
      ...props.data,
      likes: arr,
    };
    let token = session.get(keys.token)
    try {
      let response =  axios({
        url: `${constants.API_URL}/post/like/${props.data.id}`,
        method: 'POST',
        headers:{
          'Authorization': token,
          // 'Content-Type': 'application/json'
        }
      }).then((e)=>{
        if (e.data && e.data.success === true) {
          setTotalLikes(totalLikes+1)
          props.reload();
        }});
    } catch (error) {
    }
  };

return (
    <Touchable onPress={_moveToChatComments} style={styles.container}>
      <View style={styles.topContainer}>
        {props.data && props.data?.user && (
          <View style={styles.userContainer}>
            <Avatar
              size={48}
              source={{uri: props.data?.user?.imageUrl ? props.data?.user?.imageUrl : null}}
            />
            <Text size="big" family="semi" customStyle={styles.name}>
              {props.data?.user?.name ? props.data?.user?.name : 'dummy'}
            </Text>
          </View>
        )}
        <Text size="small" customStyle={styles.time}>
          {moment(props.data?.createdAt).fromNow()}
        </Text>
      </View>
      <Gap height={16} />


      <Image 
      style={{height:200,width:'98%',borderColor:'#000',borderWidth:0.1,
      borderRadius:10,alignSelf:'center',backgroundColor:'rgba(0,0,0,0.05)'}}
      resizeMode={'cover'}
      source={props?.data?.imageUrl != null ? {uri: props?.data?.imageUrl} : DemoImage} />
      <Gap height={6} />
      <Text>{props.data?.content}</Text>

      <View style={styles.tagContainer}>
        {props.data?.tags.map(k => {
          return (
            <View style={styles.tag} key={k}>
              <Text customStyle={styles.tagText}>{k}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.actionButtonContainer}>
        <Touchable style={styles.likeButton}>
          <LikeIcon onPress={_handleLike} />
          <Text customStyle={styles.likeButtonText}>
            {totalLikes || '0'}
          </Text>
        </Touchable>
        <Touchable style={styles.commentButton} 
        // onPress={()=>navigation.navigate('ChatPostComments', {post: props.data,reload:props.reload()})}
        onPress={()=>navigation.navigate('GroupPostComments', {post: props.data})}
        >
          <CommentIcon /> 
          <Text customStyle={styles.commentButtonText}>
            {props?.data?.comments ? props?.data?.comments?.length : '0'}
          </Text>
        </Touchable>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
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
    marginLeft: 16,
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 232,
    borderRadius: 8,
    marginBottom: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tag: {
    height: 31,
    // minWidth: 91,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: 12,
    color: Colors.primary,
    paddingHorizontal: 6,
  },
});

export default ChatListItem;
