import moment from 'moment';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {View, Text} from '../../../../common';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<UserMessage />
============================================================================= */
const UserMessage = ({previousMessage, currentMessage, nextMessage}) => {
  const _layout = {
    paddingTop:
      previousMessage &&
      previousMessage.user &&
      previousMessage.user._id === currentMessage.user._id
        ? 4
        : 11,
    paddingBottom:
      nextMessage &&
      nextMessage.user &&
      nextMessage.user._id === currentMessage.user._id
        ? 4
        : 11,
  };

  const message = currentMessage && currentMessage.text;
  const avatar = currentMessage && currentMessage.user?.avatar;
  const time = currentMessage && currentMessage.createdAt;

  return (
    <View style={[styles.container, _layout]}>
      <View alignItems="flex-end">
        <View style={styles.content}>
          <Text fontSize={12}>{message}</Text>
        </View>
        <Text style={styles.time}>{moment(time).format('HH:MM A')}</Text>
      </View>
      <Image style={styles.avatar} source={avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
  },
  content: {
    padding: 15,
    width: 256,
    marginTop: 26,
    marginRight: 10,
    backgroundColor: Colors.card,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  time: {
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 15,
    color: Colors.secondaryText,
  },
});

export default UserMessage;
