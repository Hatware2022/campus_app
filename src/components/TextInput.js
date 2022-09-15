import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  Platform,
} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<TextInput />
============================================================================= */
const TextInput = ({
  left,
  right,
  type,
  label,
  value,
  editable,
  inputStyle,
  labelStyle,
  placeholder,
  containerStyle,
  secureTextEntry,
  contentContainerStyle,
  onChange,
  ...props
}) => {
  const textInput = useRef();
  const [focused, setFocused] = useState(false);

  const _handleChange = inputValue => {
    if (onChange) {
      onChange(inputValue);
    }
  };

  const _handlePress = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
  };

  const _style = {
    borderColor: focused ? Colors.primary : Colors.card,
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      disabled={!editable}
      onPress={_handlePress}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          type === 'primary' ? styles.primaryContentContainerStyle : undefined,
          type === 'secondary'
            ? styles.secondaryContentContainerStyle
            : undefined,
          _style,
          contentContainerStyle,
        ]}>
        {left && <View style={styles.leftContainer}>{left}</View>}
        <RNTextInput
          ref={textInput}
          value={value}
          style={[styles.input, inputStyle]}
          editable={editable}
          selectionColor={Colors.primary}
          placeholderTextColor={Colors.placeholder}
          placeholder={placeholder}
          secureTextEntry={
            secureTextEntry ||
            (secureTextEntry &&
              Platform.OS === 'android' &&
              value &&
              value?.length > 0)
          }
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onChangeText={_handleChange}
          {...props}
        />
        {right && <View style={styles.rightContainer}>{right}</View>}
      </View>
    </Pressable>
  );
};

TextInput.defaultProps = {
  icon: null,
  type: 'primary',
  editable: true,
  left: undefined,
  right: undefined,
  label: undefined,
  inputStyle: {},
  labelStyle: {},
  placeholder: undefined,
  containerStyle: {},
  secureTextEntry: false,
  contentContainerStyle: {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: Colors.label,
    fontFamily: 'Montserrat-Regular',
  },
  leftContainer: {
    paddingLeft: 15,
  },
  rightContainer: {
    paddingHorizontal: 15,
  },
  primaryContentContainerStyle: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
  },
  secondaryContentContainerStyle: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    paddingHorizontal: 15,
    color: Colors.text,
    fontFamily: 'Montserrat-Medium',
  },
});

export default TextInput;
