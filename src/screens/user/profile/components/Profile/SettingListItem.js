import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, Text} from '../../../../common';

import * as Colors from '../../../../config/colors';

import ArrowRightIcon from '../../../../assets/icons/app-arrow-right-carret.svg';

/* =============================================================================
<SettingListItem />
============================================================================= */
const SettingListItem = ({name, border, onPress}) => {
  return (
    <Touchable
      onPress={onPress}
      style={[styles.container, border && styles.border]}>
      <Text style={styles.name}>{name}</Text>

      <ArrowRightIcon />
    </Touchable>
  );
};

SettingListItem.defaultProps = {
  border: true,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.card,
  },
});

export default SettingListItem;
