import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import * as Colors from '../config/colors';
import Touchable from './Touchable';

/* =============================================================================
<Card />
============================================================================= */
const Card = ({
  text,
  style,
  onPress,
  height,
  backgroundColor,
  marginHorizontal,
  marginVertical,
  children,
}) => {
  const _styles = {
    height,
    backgroundColor,
    marginHorizontal,
    marginVertical,
  };

  if (onPress) {
    return (
      <Touchable
        style={[styles.container, _styles, style]}
        onPress={() => onPress(text)}>
        {children}
      </Touchable>
    );
  }

  return <View style={[styles.container, _styles, style]}>{children}</View>;
};

Card.defaultProps = {
  backgroundColor: Colors.card,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
  },
});

export default Card;
