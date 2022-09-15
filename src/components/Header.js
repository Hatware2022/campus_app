import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import * as Colors from '../config/colors';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<Header />
============================================================================= */
const Header = ({
  backButton,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  title,
  color,
  backgroundColor,
}) => {
  const insets = useSafeAreaInsets();

  const _safeAreaStyle = {
    paddingTop: insets.top + 10,
    height: HEADER_HEIGHT + insets.top,
  };

  return (
    <View style={[styles.container, _safeAreaStyle, {backgroundColor}]}>
      {leftIcon ? (
        <Touchable style={styles.button} onPress={onLeftPress}>
          {leftIcon}
        </Touchable>
      ) : (
        <View style={styles.empty} />
      )}

      <View style={styles.titleContainer}>
        <Text fontSize={18} color={color}>
          {title}
        </Text>
      </View>

      {rightIcon ? (
        <Touchable style={styles.button} onPress={onRightPress}>
          {rightIcon}
        </Touchable>
      ) : (
        <View style={styles.empty} />
      )}
    </View>
  );
};

const HEADER_HEIGHT = 60;

Header.defaultProps = {
  backButton: false,
  color: Colors.background,
  backgroundColor: Colors.primary,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  backContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraPadding: {
    paddingBottom: 25,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    width: 50,
    height: 50,
  },
});

export default Header;
