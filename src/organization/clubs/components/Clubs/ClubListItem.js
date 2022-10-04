import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar, Tag} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import DemoImage from '../../../../assets/images/empty-image.png';

import {useNavigation} from '@react-navigation/native';
import ClubMember from './ClubMember';
import Gap from '../../../../common/Gap';
import axios from 'axios';
import constants from '../../../../utils/constants';
import session from '../../../../store/session';
import keys from '../../../../store/keys';

/* =============================================================================
<ClubListItem />
============================================================================= */
const ClubListItem = ({data}) => {
  const navigation = useNavigation();
  const [joinClub, setJoinClub] = useState(false);
  const previousData = data

  const _moveToDetails = () => {
    navigation.navigate('ClubDetails', {item: previousData});
  };

  const handleJoinClub =(id)=>{
    let aa = session.get(keys.token)
    try {
      let response =  axios({
        url: `${constants.API_URL}/club/join/${id}`,
        method: 'POST',
        headers:{
          'Authorization': aa,
          // 'Content-Type': 'application/json'
        }
      }).then((e)=>{
        setJoinClub(true)
            alert('Join Club Successfully')
      });
    } catch (error) {
    }
  }

  const handleLeaveClub =(id)=>{
    let aa = session.get(keys.token)
    try {
      let response =  axios({
        url: `${constants.API_URL}/club/leave/${id}`,
        method: 'DELETE',
        headers:{
          'Authorization': aa,
          // 'Content-Type': 'application/json'
        }
      }).then((e)=>{
        setJoinClub(false)
            alert('Leave Club Successfully')
      });
    } catch (error) {
    }
  }

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View center>
        <Avatar size={81} source={data?.imageUrl} />
        <Text size="big" family="semi" customStyle={styles.name}>
          {data?.title}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data?.bio}</Text>
      </View>

      <Text customStyle={styles.tagTitle} size="small" family="semi">
        Down for
      </Text>

      <View style={styles.tagContainer}>
        {data?.tags.map((item, index) => (
          <Tag key={index} text={item} redBorder />
        ))}
      </View>
      <Gap height={16} />
      <ClubMember
        data={data}
        joinClub={joinClub}
        // onPress={() => setJoinClub(!joinClub)}
        onPress={()=> joinClub ? handleLeaveClub(data.id) : handleJoinClub(data.id)}
        onPressGroup={() => {}}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.border,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  name: {
    marginTop: 10,
    textAlign: 'center',
    fontSize:16,
    fontWeight:'bold'
  },
  descriptionContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginVertical: 16,
  },
  tagTitle: {
    fontSize:14,
    marginBottom: 8,
    fontWeight:'bold'
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
});

export default ClubListItem;
