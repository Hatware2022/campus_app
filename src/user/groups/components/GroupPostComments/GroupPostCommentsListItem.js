import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Avatar, Touchable} from '../../../../common';
import Text from '../../../../common/TextV2';

import userService from '../../../../services/user'
import session from '../../../../store/session'
import keys from '../../../../store/keys'

import * as Colors from '../../../../config/colors';
import DotIcon from '../../../../assets/icons/icon-dot.svg';
import moment from 'moment'

/* =============================================================================
<GroupPostCommentListItem />
============================================================================= */
const GroupPostCommentListItem = ({data}) => {
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

  return (
    <View style={styles.container}>
      <Avatar source={userDetail?.imageUrl} size={34} />
      <View marginLeft={12} flex={1}>
        <View horizontal justifyContent={'space-between'}>
          <Text size="small" family="semi">
            {userDetail?.name}
          </Text>
          <Text size="small" color={Colors.black400}>
            {data.time}
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text size="small" customStyle={styles.time}>
          {moment(data.updatedAt).fromNow()}
        </Text>
        <TouchableOpacity style={{flexDirection:'row',marginTop:7}}
        onPress={()=>console.log('hello')}>
          <View style={styles.dot}/>
          <View style={styles.dot}/>
          <View style={styles.dot}/>
        </TouchableOpacity>
        </View>
        </View>

        <Text customStyle={styles.comment}>{data?.comment}</Text>

        {/* <View horizontal marginBottom={20}>
          <Touchable
            flex={1}
            onPress={() => {}}>
            <Text family="semi" color={Colors.black500}>
              Reply
            </Text>
          </Touchable>
          <DotIcon />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  commentCard: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8,
  },
  comment: {
    marginTop: 4,
    marginBottom: 8,
  },
  time: {
    color: Colors.black400,
    alignSelf: 'center',
    marginRight:5
  },
  dot:  {  
  width:3,
  height:3,
  backgroundColor:'grey',
  borderRadius:20,
  marginLeft:1.5
},
});

export default GroupPostCommentListItem;
