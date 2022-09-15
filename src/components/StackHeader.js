import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
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
    minHeight: HEADER_HEIGHT + insets.top,
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
          <Text style={styles.title}>{title}</Text>
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

const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingBottom: 5,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: Colors.background,
    fontFamily: 'Montserrat-Regular',
  },
  secondaryTitleContainer: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: 60,
    height: 60,
  },
});

export default StackHeader;
