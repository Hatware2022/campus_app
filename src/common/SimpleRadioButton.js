import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../common/TextV2';
import CheckIcon from '../assets/icons/icon-checkbox-checklist.svg';
import EmptyCheckIcon from '../assets/icons/icon-checkbox-empty.svg';

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
  children,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={() => onChange(value)}>
      {selected ? <CheckIcon /> : <EmptyCheckIcon />}
      <Text customStyle={styles.txt}>
        {label} {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    marginHorizontal: 12,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default SimpleRadioButton;
