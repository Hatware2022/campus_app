import * as React from 'react';
import {StyleSheet, Pressable, ActivityIndicator, View,TouchableOpacity} from 'react-native';

import Text from '../common/TextV2';

import * as Colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<Button />
============================================================================= */
const Button = ({
  icon,
  type,
  title,
  style,
  shadow,
  onPress,
  loading,
  disabled,
  children,
  textStyle,
  bottom,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  return (
    <View
      style={[
        bottom && styles.containerButton,
        type === 'alert' && styles.flexOne,
        containerStyle,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.container,
          type === 'primary' ? styles.primary : undefined,
          type === 'secondary' ? styles.secondary : undefined,
          type === 'outline' ? styles.outline : undefined,
          type === 'alert' ? styles.alert : undefined,
          shadow && styles.shadow,
          disabled && styles.disabled,
          bottom && styles.bottom,
          bottom && _safeArea,
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
            family={type !== 'alert' && 'semi'}
            customStyle={[
              type === 'primary' ? styles.txtPrimary : undefined,
              type === 'secondary' ? styles.txtSecondary : undefined,
              type === 'outline' ? styles.txtOutline : undefined,
              type === 'alert' ? styles.txtAlert : undefined,
              disabled ? styles.textDisabled : undefined,
              textStyle,
            ]}>
            {title}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </View>
  );
};

Button.defaultProps = {
  type: 'primary',
  icon: undefined,
  title: undefined,
  block: false,
  shadow: false,
  style: undefined,
  loading: false,
  disabled: false,
  children: undefined,
  textStyle: {},
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  flexOne: {
    flex: 1,
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
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    borderWidth: 1,
  },
  alert: {
    borderColor: Colors.white300,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: Colors.white300,
  },

  txtPrimary: {
    color: Colors.background,
    lineHeight: 18,
  },
  txtSecondary: {
    color: Colors.text,
    lineHeight: 18,
  },
  txtOutline: {
    color: Colors.primary,
    lineHeight: 18,
  },
  txtAlert: {
    color: Colors.black500,
    lineHeight: 18,
  },
  textDisabled: {
    color: Colors.black400,
    lineHeight: 18,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  bottom: {
    margin: 16,
  },
});

export default Button;
