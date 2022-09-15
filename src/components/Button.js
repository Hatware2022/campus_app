import * as React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View,
} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Button />
============================================================================= */
const Button = ({
  flex,
  icon,
  type,
  title,
  style,
  width,
  shadow,
  height,
  onPress,
  loading,
  disabled,
  children,
  textStyle,
}) => {
  const _layout = {
    flex,
    width,
    height,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        _layout,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'outline' ? styles.outline : undefined,
        shadow && styles.shadow,
        disabled && styles.disabled,
        style,
      ]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={
            type === 'primary'
              ? Colors.background
              : type === 'primary'
              ? Colors.background
              : type === 'outline'
              ? Colors.secondaryBorder
              : Colors.text
          }
        />
      ) : title ? (
        <Text
          style={[
            styles.txt,
            type === 'primary' ? styles.txtPrimary : undefined,
            type === 'secondary' ? styles.txtSecondary : undefined,
            type === 'outline' ? styles.txtOutline : undefined,
            textStyle,
          ]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  type: 'primary',
  icon: undefined,
  flex: undefined,
  title: undefined,
  block: false,
  shadow: false,
  style: undefined,
  width: '100%',
  height: 56,
  loading: false,
  disabled: false,
  children: undefined,
  textStyle: {},
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 5,
  },
  primary: {
    borderColor: Colors.button,
    backgroundColor: Colors.button,
  },
  secondary: {
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  outline: {
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  disabled: {
    opacity: 0.5,
  },
  txt: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  txtPrimary: {
    color: Colors.background,
  },
  txtSecondary: {
    color: Colors.text,
  },
  txtOutline: {
    color: Colors.text,
  },
});

export default Button;
