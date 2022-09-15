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

  // const _style = {
  //   borderColor: focused ? Colors.primary : Colors.card,
  // };

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
          contentContainerStyle,
        ]}>
        {left && <View style={styles.leftContainer}>{left}</View>}
        <RNTextInput
          ref={textInput}
          value={value}
          style={[styles.input, inputStyle]}
          editable={editable}
          selectionColor={Colors.black600}
          placeholderTextColor={Colors.black400}
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
    borderRadius: 8,
    flex: 1,
    backgroundColor: Colors.white200,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: Colors.label,
    fontFamily: 'Montserrat-Regular',
  },
  leftContainer: {
    marginRight: 8,
  },
  rightContainer: {
    paddingHorizontal: 15,
  },
  primaryContentContainerStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white200,
  },
  secondaryContentContainerStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white200,
  },
  input: {
    flex: 1,
    marginRight: 8,
    color: Colors.black600,
    fontFamily: 'Rubik-Regular',
  },
});

export default TextInput;
