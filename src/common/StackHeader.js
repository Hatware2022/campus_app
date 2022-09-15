import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './TextV2';
import Touchable from './Touchable';
import * as Colors from '../config/colors';

import ArrowLeftIcon from '../assets/icons/app-arrow-left.svg';

import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<StackHeader />
============================================================================= */
const StackHeader = ({backButton, title, backgroundColor, type, content}) => {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const _safeAreaStyle = {
    paddingTop: insets.top,
    // minHeight: HEADER_HEIGHT + insets.top,
  };

  if (type === 'secondary') {
    return (
      <View style={[styles.mainContainer, _safeAreaStyle, {backgroundColor}]}>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {backButton ? (
          <Touchable
            style={styles.secondaryBackArrow}
            onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </Touchable>
        ) : (
          <View style={styles.empty} />
        )}
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, _safeAreaStyle, {backgroundColor}]}>
      <View style={styles.container}>
        {backButton ? (
          <Touchable
            style={styles.backArrow}
            onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </Touchable>
        ) : (
          <View style={styles.empty} />
        )}

        <View style={styles.titleContainer}>
          <Text color={Colors.background} family="bold" size="big">
            {title}
          </Text>
        </View>

        <View style={styles.empty} />
      </View>

      {content}
    </View>
  );
};

StackHeader.defaultProps = {
  type: 'primary',
  backButton: true,
  color: Colors.background,
  backgroundColor: Colors.primary,
};

const HEADER_HEIGHT = 65;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 16,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backContainer: {
    flexDirection: 'row',
  },
  backArrow: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER_HEIGHT,
  },
  secondaryBackArrow: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER_HEIGHT,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  secondaryTitleContainer: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    // width: 60,
    // height: 60,
  },
});

export default StackHeader;
