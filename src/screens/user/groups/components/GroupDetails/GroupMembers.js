import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text, Avatar, Button} from '../../../../common';

import UserImage2 from '../../../../assets/images/user-2.png';
import UserImage3 from '../../../../assets/images/user-3.png';
import UserImage4 from '../../../../assets/images/user-4.png';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<GroupMembers />
============================================================================= */
const GroupMembers = () => {
  return (
    <View style={styles.container}>
      <View style={styles.memberContainer}>
        <View style={styles.memberAvatarContainer}>
          {USERS.map((item, index) => (
            <Avatar
              size={37}
              key={item.id}
              source={item.image}
              style={getAvatarStyle(index)}
            />
          ))}
        </View>
        <Text marginHorizontal={10} color={Colors.secondaryText} fontSize={15}>
          +27
        </Text>
      </View>

      <Button title="Join" style={styles.joinButton} />
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
    marginTop: 20,
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
    width: 107,
    height: 33,
  },
});

export default GroupMembers;
