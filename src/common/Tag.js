import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../common/TextV2';

import * as Colors from '../config/colors';
import Touchable from './Touchable';

/* =============================================================================
<Tag />
============================================================================= */
const Tag = ({
  text,
  selected,
  onPress,
  backgroundColor,
  borderColor,
  style,
  textStyle,
  size,
  redBorder,
}) => {
  const _styles = {backgroundColor, borderColor};

  if (onPress) {
    return (
      <Touchable
        style={[
          styles.container,
          _styles,
          selected && styles.selected,
          redBorder && styles.redBorder,
          style,
        ]}
        onPress={() => onPress(text)}>
        <Text
          size={size}
          customStyle={[
            styles.text,
            selected && styles.selectedText,
            redBorder && styles.selectedText,
            textStyle,
          ]}>
          {text}
        </Text>
      </Touchable>
    );
  }

  return (
    <View
      style={[
        styles.container,
        _styles,
        selected && styles.selected,
        redBorder && styles.redBorder,
        style,
      ]}>
      <Text
        size={size}
        customStyle={[
          styles.text,
          selected && styles.selectedText,
          redBorder && styles.selectedText,
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

Tag.defaultProps = {
  borderColor: Colors.border,
  backgroundColor: Colors.background,
  size: 'small',
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.red300,
  },
  redBorder: {
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  text: {
    color: Colors.black600,
  },
  selectedText: {
    color: Colors.primary,
  },
});

export default Tag;
