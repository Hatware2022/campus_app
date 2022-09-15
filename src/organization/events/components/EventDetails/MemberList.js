import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Avatar} from '../../../../common';
import Text from '../../../../common/TextV2';
import UserImage2 from '../../../../assets/images/user-2.png';
import UserImage3 from '../../../../assets/images/user-3.png';
import UserImage4 from '../../../../assets/images/user-4.png';
import * as Colors from '../../../../config/colors';
const MAX_USERS = 3;

/* =============================================================================
<MemberList />
============================================================================= */
const MemberList = props => {
  return (
    <View style={styles.memberContainer}>
      <View style={styles.memberAvatarContainer}>
        {props.rsvp.slice(0, MAX_USERS).map((item, index) => (
          <Avatar
            size={37}
            key={item.userId}
            source={{uri: item.imageUrl ? item.imageUrl : null}}
            style={getAvatarStyle(index)}
          />
        ))}
      </View>
      <Text customStyle={styles.textUser} size="small" color={Colors.black500}>
        +27 people join this event
      </Text>
      {/* {props.rsvp.length > MAX_USERS && (
        <Text
          customStyle={styles.textUser}
          size="small"
          color={Colors.black500}>
          +{props.rsvp.length - MAX_USERS}
        </Text>
      )} */}
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
  memberContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatarContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  joinButton: {
    width: 107,
    height: 33,
  },
  textUser: {
    marginLeft: 8,
  },
});

export default MemberList;
