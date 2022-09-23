import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar, Tag} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import UserImage from '../../../../assets/images/user.png';

import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<ProfileListItem />
============================================================================= */
const ProfileListItem = ({data}) => {
  const navigation = useNavigation();

  const _moveToDetails = () => {
    navigation.navigate('ProfileDetails', {_id: data.id});
  };

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View center>
        <Avatar
          size={80}
          source={{uri: data?.imageUrl ? data?.imageUrl : null}}
        />
        <Text size="big" family="semi" customStyle={styles.name}>
          {data?.name}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        {/* <Text>{data.bio}</Text> */}
        <Text>{data.bio}
          Hi, Im Angela Belli. Im really love to go biking on the beaches. Im
          also interested in business talks. So please visit my profile page and
          follow my social Media.
        </Text>
      </View>

      <Text size="small" family="semi" customStyle={styles.tagTitle}>
        Down for:
      </Text>

      <View style={styles.tagContainer}>
        {data?.downFor?.map((item, index) => (
          <Tag
            key={index}
            text={item.description}
            textStyle={styles.textTag}
            style={styles.tagBox}
          />
        ))}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
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
    marginTop: 8,
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginVertical: 16,
  },
  tagTitle: {
    marginBottom: 8,
  },
  tagContainer: {
    marginTop: 5,
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
  textTag: {
    lineHeight: 16,
    color: Colors.primary,
  },
  tagBox: {
    borderColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default ProfileListItem;
