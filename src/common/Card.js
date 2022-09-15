import * as React from 'react';
import {StyleSheet} from 'react-native';
import Text from '../common/TextV2';
import View from '../common/View';

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
  subCard,
  leftTitle,
  subContent,
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

  if (subCard) {
    return (
      <View
        horizontal
        borderRadius={8}
        backgroundColor={Colors.white200}
        marginTop={12}
        padding={8}>
        <Text customStyle={{width: 60}} family="semi">
          {leftTitle}
        </Text>
        <Text>{subContent}</Text>
      </View>
    );
  }

  return <View style={[styles.container, _styles, style]}>{children}</View>;
};

Card.defaultProps = {
  backgroundColor: Colors.card,
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
  },
});

export default Card;
