import * as React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as Colors from '../config/colors';

/* =============================================================================
<Container />
============================================================================= */
const Container = ({
  style,
  center,
  padding,
  children,
  alignItems,
  justifyContent,
  backgroundColor,
  safeArea,
  topSafeArea,
  bottomSafeArea,
}) => {
  const insets = useSafeAreaInsets();

  const _safeAreaStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  const _safeAreaTopStyle = {
    paddingTop: insets.top,
  };

  const _safeAreaBottomStyle = {
    paddingBottom: insets.bottom,
  };

  const _style = {
    flex: 1,
    padding,
    backgroundColor: backgroundColor,
    alignItems: center ? 'center' : alignItems,
    justifyContent: center ? 'center' : justifyContent,
  };

  return (
    <View
      style={[
        _style,
        style,
        safeArea && _safeAreaStyle,
        topSafeArea && _safeAreaTopStyle,
        bottomSafeArea && _safeAreaBottomStyle,
      ]}>
      {children}
    </View>
  );
};

/* Default Props
============================================================================= */
Container.defaultProps = {
  safeArea: false,
  topSafeArea: false,
  bottomSafeArea: false,
  center: false,
  style: {},
  padding: undefined,
  alignItems: undefined,
  justifyContent: undefined,
  backgroundColor: Colors.secondaryBackground,
};

/* Export
============================================================================= */
export default Container;
