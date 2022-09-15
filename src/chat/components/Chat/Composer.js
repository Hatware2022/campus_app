import React from 'react';
import {StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Touchable, View} from '../../../common';

// import SendIcon from '../../../assets/icons/app-send.svg';
import SendIcon from '../../../assets/icons/icon-send-message.svg';
import EmojiIcon from '../../../assets/icons/icon-emoji.svg';

import * as Colors from '../../../config/colors';

/* =============================================================================
<Composer />
============================================================================= */
const Composer = ({loading, text, onChange, onSend}) => {
  const insets = useSafeAreaInsets();

  const _layout = {
    minHeight: 58 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  const _handleSend = () => {
    onSend({text});
  };

  return (
    <View style={[styles.container, _layout]}>
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
          value={text}
          style={styles.input}
          placeholderTextColor={Colors.secondaryText}
          placeholder={'Type Something'}
          onChangeText={onChange}
        />
      </View>

      <Touchable style={styles.button} disabled={loading} onPress={_handleSend}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <SendIcon />
        )}
      </Touchable>
    </View>
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

export default Composer;
