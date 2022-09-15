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
<TextArea />
============================================================================= */
const TextArea = ({
  left,
  right,
  height,
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

  const _layout = {
    height,
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
          _layout,
          contentContainerStyle,
        ]}>
        {left && <View style={styles.leftContainer}>{left}</View>}
        <RNTextInput
          multiline
          ref={textInput}
          value={value}
          style={[styles.input, _layout, inputStyle]}
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

TextArea.defaultProps = {
  icon: null,
  type: 'primary',
  editable: true,
  left: undefined,
  right: undefined,
  label: undefined,
  height: 157,
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
    height: 157,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
  },
  secondaryContentContainerStyle: {
    height: 157,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    height: 157,
    fontSize: 14,
    paddingHorizontal: 15,
    color: Colors.text,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Medium',
  },
});

export default TextArea;
