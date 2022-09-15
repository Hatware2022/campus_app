import moment from 'moment';
import React from 'react';
import {StyleSheet, Image} from 'react-native';

import {View, Avatar} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<ContactMessage />
============================================================================= */
const ContactMessage = ({previousMessage, currentMessage, nextMessage}) => {
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
      <Avatar size={34} source={avatar} />

      <View style={styles.content}>
        <Text>{message}</Text>
      </View>
      {/* <Text style={styles.time}>{moment(time).format('HH:MM A')}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  content: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginLeft: 12,
    // marginRight: 11,
    width: '87%',

    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  time: {
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 15,
    color: Colors.secondaryText,
  },
});

export default ContactMessage;
