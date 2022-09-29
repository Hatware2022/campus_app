import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Touchable, View} from '../../../../common';

import * as Colors from '../../../../config/colors';

import SendButtonIcon from '../../../../assets/icons/icon-send-message.svg';
import EmojiIcon from '../../../../assets/icons/icon-emoji.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<GroupPostCommentForm />
============================================================================= */
const GroupPostCommentForm = (props) => {
  const insets = useSafeAreaInsets();
  const [comment, setComment] = useState('');

  const _safeArea = {
    height: 50 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={[styles.container, _safeArea]}>
        <View
          horizontal
          style={{
            // padding: 12,
            borderRadius: 24,
            backgroundColor: Colors.background,
            flex: 1,
            height:50
          }}>
            <View style={{marginTop:12}}>
          <EmojiIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor={Colors.secondaryText}
            value={comment}
            onChangeText={setComment}
          />
        </View>
        <Touchable style={styles.button} onPress={() => props.sendMsg('a')}>
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
    // height:30,
    marginTop:-5
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

export default GroupPostCommentForm;
