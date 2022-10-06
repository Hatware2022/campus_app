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
import postService from '../../../../services/post';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import moment from 'moment';
import utils from '../../../../utils/utils';
import Gap from '../../../../common/Gap';
import DemoImage from '../../../../assets/images/empty-image.png';

/* =============================================================================
<PostListItem />
============================================================================= */
const ProfileListItem = props => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const _moveToChatComments = () => {
    navigation.navigate('ChatPostComments', {post: props.data});
  };

  useEffect(() => {
    if (!props.data) return;
    userService
      .getById(session.get(keys.token), props.data.id)
      .then(result => {
        if (result.data && result.data.success === true) {
          let r = result.data.data;
          setUser(r);
        }
      });
  }, []);

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
    postService
      .update(session.get(keys.token), props.data?.id)
      .then(result => {
        if (result.data && result.data.success === true) {
          props.reload();
        }
      });
  };

return (
    <Touchable onPress={_moveToChatComments} style={styles.container}>
      <View style={styles.topContainer}>
        {user && (
          <View style={styles.userContainer}>
            <Avatar
              size={48}
              source={{uri: user.imageUrl ? user.imageUrl : null}}
            />
            <Text size="big" family="semi" customStyle={styles.name}>
              {user?.name ? user?.name : 'dummy'}
            </Text>
          </View>
        )}
     <Touchable style={{flexDirection:'row',}}>
       <View style={styles.dot}/>
       <View style={styles.dot}/>
       <View style={styles.dot}/>
     </Touchable>
      </View>
      <Gap height={16} />

      <Text customStyle={{marginLeft:7}}>{props.data?.content}dsd</Text>
      <Gap height={6} />
{props?.data?.imageUrl != null &&
      <Image 
      style={{height:200,width:'98%',borderColor:'#000',borderWidth:0.1,
      borderRadius:10,alignSelf:'center',backgroundColor:'rgba(0,0,0,0.05)'}}
      resizeMode={'cover'}
      source={props?.data?.imageUrl != null ? {uri: props?.data?.imageUrl} : DemoImage} />
}
      
      

      <View style={styles.tagContainer}>
        {props?.data && props?.data?.tags?.length > 0 && props?.data?.tags.map(k => {
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
            {props?.data?.likes || '0'}
          </Text>
        </Touchable>
        <Touchable style={styles.commentButton} onPress={()=>navigation.navigate('GroupPostComments', {post: props.data})}>
          <CommentIcon />
          <Text customStyle={styles.commentButtonText}>
            {props?.data?.comments ? props?.data?.comments?.length : '0'}
          </Text>
        </Touchable>
      </View>
      <Text size="small" customStyle={styles.time}>
          {moment(props.data.createdAt).fromNow()}
        </Text>
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
    fontWeight:'bold'
  },
  time: {
    color: Colors.black400,
    marginTop:10,
    marginLeft:3
    // alignSelf: 'center',
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
    marginLeft:5
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
  dot:{
    width:3,
    height:3,
    backgroundColor:'grey',
    borderRadius:20,
    marginLeft:1.5
  },

});

export default ProfileListItem;



// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {Touchable, View, Avatar, Tag} from '../../../../common';
// import Text from '../../../../common/TextV2';

// import * as Colors from '../../../../config/colors';

// import UserImage from '../../../../assets/images/user.png';
// import DemoImage from '../../../../assets/images/empty-image.png';
// import {useNavigation} from '@react-navigation/native';

// /* =============================================================================
// <ProfileListItem />
// ============================================================================= */
// const ProfileListItem = ({data}) => {
//   const navigation = useNavigation();

//   const _moveToDetails = () => {
//     navigation.navigate('ProfileDetails', {_id: data.id});
//   };

//   return (
//     <Touchable onPress={_moveToDetails} style={styles.container}>
//       <View center>
//         <Avatar
//           size={80}
//           source={data?.imageUrl ?{uri: data?.imageUrl ? data?.imageUrl : null}: DemoImage}
//         />

//         <Text size="big" family="semi" customStyle={styles.name}>
//           {data?.name}
//         </Text>
//       </View>

//       <View style={styles.descriptionContainer}>
//         <Text>{data?.bio ? data?.bio : "Hi, this is dummy data."}
//         </Text>
//       </View>

//       <Text size="small" family="semi" customStyle={styles.tagTitle}>
//         Down for:
//       </Text>

//       <View style={styles.tagContainer}>
//         {data?.downFor?.map((item, index) => (
//           <Tag
//             key={index}
//             text={item}
//             textStyle={styles.textTag}
//             style={styles.tagBox}
//           />
//         ))}
//       </View>
//     </Touchable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     shadowColor: Colors.border,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   name: {
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   descriptionContainer: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: Colors.white200,
//     marginVertical: 16,
//     alignItems:'center'
//   },
//   tagTitle: {
//     marginBottom: 8,
//   },
//   tagContainer: {
//     marginTop: 5,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   tag: {
//     height: 31,
//     minWidth: 91,
//     borderWidth: 1,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderColor: Colors.primary,
//   },
//   textTag: {
//     lineHeight: 16,
//     color: Colors.primary,
//   },
//   tagBox: {
//     borderColor: Colors.primary,
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//   },
// });

// export default ProfileListItem;
