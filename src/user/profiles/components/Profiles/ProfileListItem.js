import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar, Tag} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import UserImage from '../../../../assets/images/user.png';
import DemoImage from '../../../../assets/images/empty-image.png';
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
          source={data?.imageUrl ?{uri: data?.imageUrl ? data?.imageUrl : null}: DemoImage}
        />
        <Text size="big" family="semi" customStyle={styles.name}>
          {data?.name}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data?.bio ? data?.bio : ""}
        </Text>
      </View>

      <Text size="small" family="semi" customStyle={styles.tagTitle}>
        Up For:
      </Text>

      <View style={styles.tagContainer}>
        {data?.downFor?.map((item, index) => (
          <Tag
            key={index}
            text={item}
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
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    // shadowColor: Colors.border,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // elevation: 8,
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
    alignItems:'center'
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
