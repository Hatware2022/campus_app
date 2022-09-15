import * as React from 'react';
import {View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<Content />
============================================================================= */
const Content = ({
  style,
  center,
  padding,
  children,
  alignItems,
  justifyContent,
  containerStyle,
  backgroundColor,
  scrollViewStyle,
  paddingVertical,
  paddingHorizontal,
  contentContainerStyle,
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
    backgroundColor,
    paddingVertical,
    paddingHorizontal,
    alignItems: center ? 'center' : alignItems,
    justifyContent: center ? 'center' : justifyContent,
  };

  const _containerStyle = {
    flex: 1,
    backgroundColor,
  };

  const _contentContainerStyle = {
    flexGrow: 1,
  };

  return (
    <View style={[_containerStyle, containerStyle]}>
      <ScrollView
        style={scrollViewStyle}
        contentContainerStyle={[
          _contentContainerStyle,
          contentContainerStyle,
          safeArea && _safeAreaStyle,
          topSafeArea && _safeAreaTopStyle,
          bottomSafeArea && _safeAreaBottomStyle,
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={[_style, style]}>{children}</View>
      </ScrollView>
    </View>
  );
};

/* Default Props
============================================================================= */
Content.defaultProps = {
  center: false,
  backgroundColor: 'transparent',
};

/* Export
============================================================================= */
export default Content;
