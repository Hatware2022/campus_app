import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, Text, View, Avatar, Tag} from '../../../../common';

import * as Colors from '../../../../config/colors';

import UserImage from '../../../../assets/images/user.png';

import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<ProfileListItem />
============================================================================= */
const ProfileListItem = ({data}) => {
  const navigation = useNavigation();

  const _moveToDetails = () => {
    navigation.navigate('ProfileDetails', {_id: data._id});
  };

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View center>
        <Avatar size={84} source={{uri: data.imageUrl ? data.imageUrl : null}} />
        <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data.bio}</Text>
      </View>

      <Text style={styles.tagTitle}>Down for:</Text>

      <View style={styles.tagContainer}>
        {data.downFor.map((item, index) => (
          <Tag key={index} text={item} selected />
        ))}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
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
  name: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  descriptionContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  },
  tagTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
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
});

export default ProfileListItem;
