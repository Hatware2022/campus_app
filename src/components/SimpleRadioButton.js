import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<SimpleRadioButton />
============================================================================= */
const SimpleRadioButton = ({
  label,
  value,
  selected,
  disabled,
  containerStyle,
  onChange,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={() => onChange(value)}>
      <View
        style={[
          styles.outerContainer,
          selected && styles.outerContainerActive,
        ]}>
        {selected && <View style={styles.innerContainer} />}
      </View>
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderBottomColor: Colors.border,
  },
  item: {
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  outerContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18 / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outerContainerActive: {
    borderColor: Colors.primary,
  },
  innerContainer: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12 / 2,
    backgroundColor: Colors.primary,
  },
  txt: {
    fontSize: 15,
    marginLeft: 8,
    color: Colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
});

export default SimpleRadioButton;
