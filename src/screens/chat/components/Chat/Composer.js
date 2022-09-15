import React from 'react';
import {StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Touchable, View} from '../../../common';

import SendIcon from '../../../assets/icons/app-send.svg';

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
      <TextInput
        value={text}
        style={styles.input}
        placeholderTextColor={Colors.placeholder}
        placeholder={'Type Something . . .'}
        onChangeText={onChange}
      />

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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 41,
    fontSize: 12,
    borderRadius: 10,
    color: Colors.text,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    width: 38,
    height: 38,
    marginLeft: 10,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});

export default Composer;
