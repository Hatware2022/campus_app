import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Touchable, View} from '../../../../common';
import * as Colors from '../../../../config/colors';
import SendButtonIcon from '../../../../assets/icons/icon-send-message.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import postService from '../../../../services/post';
import userService from '../../../../services/user';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import moment from 'moment';
import utils from '../../../../utils/utils';
import EmojiIcon from '../../../../assets/icons/icon-emoji.svg';

/* =============================================================================
<ChatPostCommentForm />
============================================================================= */
const ClubPostCommentForm = props => {
  const insets = useSafeAreaInsets();
  const [comment, setComment] = useState('');

  const _safeArea = {
    height: 50 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  const _handleComment = () => {
    if (!comment || comment.length === 0) return;
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;

    let arr = Array.from(props.data.comments) || [];
    arr.push({
      userId: tokenData._id,
      comment: comment,
      date: moment().format(),
    });
    let t = {
      ...props.data,
      comments: arr,
    };
    setComment('');
    postService
      .update(session.get(keys.token), props.data._id, t)
      .then(result => {
        if (result.data && result.data.success === true) {
          props.reload();
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={[styles.container, _safeArea]}>
        <View
          horizontal
          style={{
            padding: 12,
            borderRadius: 24,
            backgroundColor: Colors.background,
            flex: 1,
          }}>
          <EmojiIcon />
          <TextInput
            style={styles.input}
            placeholder="Type Something"
            placeholderTextColor={Colors.secondaryText}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        <Touchable style={styles.button} onPress={_handleComment}>
          <SendButtonIcon />
        </Touchable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white200,
  },
  input: {
    flex: 1,
    fontFamily: 'Rubik-Regular',
    marginHorizontal: 12,
  },
  button: {
    width: 36,
    height: 36,
    marginLeft: 8,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
  },
});

export default ClubPostCommentForm;
