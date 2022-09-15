import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Touchable, View} from '../../../../common';

import * as Colors from '../../../../config/colors';

import SendButtonIcon from '../../../../assets/icons/app-send-button.svg';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<GroupPostCommentForm />
============================================================================= */
const GroupPostCommentForm = () => {
  const insets = useSafeAreaInsets();

  const _safeArea = {
    height: 83 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={[styles.container, _safeArea]}>
        <TextInput
          style={styles.input}
          placeholder="Type here ..."
          placeholderTextColor={Colors.secondaryText}
        />
        <Touchable style={styles.button}>
          <SendButtonIcon />
        </Touchable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 83,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    height: 52,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: Colors.background,
  },
  button: {
    padding: 5,
  },
});

export default GroupPostCommentForm;
