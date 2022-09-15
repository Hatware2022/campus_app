import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View} from '../../../../common';

import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import ArrowRightIcon from '../../../../assets/icons/icon-arrow.svg';

/* =============================================================================
<SettingListItem />
============================================================================= */
const SettingListItem = ({name, onPress, icon}) => {
  return (
    <Touchable onPress={onPress} style={styles.container}>
      {icon && (
        <View center height={24} width={24} marginRight={12}>
          {icon}
        </View>
      )}

      <Text size="big" customStyle={styles.name}>
        {name}
      </Text>
      <ArrowRightIcon />
    </Touchable>
  );
};

SettingListItem.defaultProps = {
  border: true,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
  },
  name: {
    flex: 1,
  },
});

export default SettingListItem;
