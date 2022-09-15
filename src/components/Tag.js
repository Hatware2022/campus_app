import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

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
}) => {
  const _styles = {backgroundColor, borderColor};

  if (onPress) {
    return (
      <Touchable
        style={[styles.container, _styles, selected && styles.selected, style]}
        onPress={() => onPress(text)}>
        <Text style={[styles.text, selected && styles.selectedText, textStyle]}>
          {text}
        </Text>
      </Touchable>
    );
  }

  return (
    <View
      style={[styles.container, _styles, selected && styles.selected, style]}>
      <Text style={[styles.text, selected && styles.selectedText, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

Tag.defaultProps = {
  borderColor: Colors.border,
  backgroundColor: Colors.background,
};

const styles = StyleSheet.create({
  container: {
    height: 31,
    minWidth: 91,
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  selectedText: {
    color: Colors.primary,
  },
});

export default Tag;
