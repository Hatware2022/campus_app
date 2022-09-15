import moment from 'moment';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {View} from '../../../../common';
import Text from '../../../../common/TextV2';

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
          <Text>{message}</Text>
        </View>
        {/* <Text style={styles.time}>{moment(time).format('HH:MM A')}</Text> */}
      </View>
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
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white250,
    marginLeft: 42,
  },
  time: {
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 15,
    color: Colors.secondaryText,
  },
});

export default UserMessage;
