import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Avatar, Button, Touchable} from '../../../../common';
import Text from '../../../../common/TextV2';

import UserImage2 from '../../../../assets/images/user-2.png';
import UserImage3 from '../../../../assets/images/user-3.png';
import UserImage4 from '../../../../assets/images/user-4.png';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<ClubMember />
============================================================================= */
const ClubMember = ({onPress, onPressGroup, joinClub, data}) => {
  return (
    <View style={styles.container}>
      <Touchable style={styles.memberContainer} onPress={onPressGroup}>
        <View style={styles.memberAvatarContainer}>
          { data?.members && data?.members.length > 0 && data?.members.map((item, index) => (
            <Avatar
              size={36}
              key={item.id}
              source={item.imageUrl}
              style={getAvatarStyle(index)}
            />
          ))}
        </View>
        <Text
          size="small"
          color={Colors.black500}
          customStyle={{marginHorizontal: 8}}>
          {data?.members ? data?.members.length : 0} members
        </Text>
      </Touchable>
      {joinClub ? (
        <Button
          title="Exit Club"
          style={styles.leaveButton}
          onPress={onPress}
          textStyle={styles.textLeaveButton}
        />
      ) : (
        <Button title="Join Club" style={styles.joinButton} textStyle={{ fontWeight:'bold'}} onPress={onPress} />
      )}
    </View>
  );
};

const getAvatarStyle = index => ({
  top: -(37 / 2),
  right: 15 * index,
  position: 'absolute',
});

const USERS = [
  {id: 1, image: UserImage4},
  {id: 2, image: UserImage3},
  {id: 3, image: UserImage2},
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberAvatarContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leaveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.white200,
  },
  textLeaveButton: {
    color: Colors.primary,
    fontFamily: 'Rubik-Medium',
  },
});

export default ClubMember;
