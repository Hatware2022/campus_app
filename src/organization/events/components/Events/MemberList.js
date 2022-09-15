import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Avatar} from '../../../../common';
import Text from '../../../../common/TextV2';
import * as Colors from '../../../../config/colors';
const MAX_USERS = 3;

/* =============================================================================
<MemberList />
============================================================================= */
const MemberList = props => {
  const _widthAva = () => {
    const users = props?.rsvp?.length;
    if (users === 1) {
      return 30;
    }
    if (users === 2) {
      return 50;
    }
    return 70;
  };

  return (
    <View style={styles.memberContainer}>
      <View style={[styles.memberAvatarContainer, {width: _widthAva()}]}>
        {props.rsvp.slice(0, MAX_USERS).map((item, index) => (
          <Avatar
            size={36}
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
        <Text marginHorizontal={10} color={Colors.secondaryText} fontSize={15}>
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

const styles = StyleSheet.create({
  memberAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUser: {
    marginLeft: 8,
  },
});

export default MemberList;
