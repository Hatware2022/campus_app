import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import BackIcon from '../../../assets/icons/icon-back.svg';

import {View} from '../../../common';
import Text from '../../../common/TextV2';
import * as Colors from '../../../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, rightIcon, onPressRightIcon}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const _safeAreaStyle = {
    paddingTop: insets.top,
  };
  return (
    <View style={[_safeAreaStyle, styles.headerContainer]}>
      <View horizontal alignItems="center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBack}>
          <BackIcon />
        </TouchableOpacity>

        <View flex={1}>
          <Text size="big" family="semi" color={Colors.whiteText}>
            {title}
          </Text>
        </View>

        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  iconBack: {
    marginRight: 16,
  },
});

export default Header;
