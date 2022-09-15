import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './TextV2';
import Touchable from './Touchable';

import * as Colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import LogoIcon from '../assets/images/campuslogo.png';
import CampusIcon from '../assets/icons/campus.svg';
import NotificationIcon from '../assets/icons/icon-notif.svg';
import Gap from './Gap';
import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<TabBar />
============================================================================= */
const TabBar = ({
  jumpTo,
  textStyle,
  itemStyle,
  containerStyle,
  navigationState,
}) => {
  const insets = useSafeAreaInsets();

  const _safeArea = {
    height: 87 + insets.top,
    paddingTop: insets.top,
  };
  const navigation = useNavigation();

  return (
    <>
      <View style={[styles.container, _safeArea, containerStyle]}>
        <View
          horizontal
          marginVertical={16}
          marginHorizontal={16}
          justifyContent="space-between">
          <CampusIcon />
          <Touchable
            onPress={() => navigation.navigate('Notifications')}
            style={{alignSelf: 'center'}}>
            <NotificationIcon />
          </Touchable>
        </View>

        <View horizontal>
          {navigationState.routes.map((item, index) => (
            <Touchable
              key={item.key}
              onPress={() => jumpTo(item.key)}
              style={[
                styles.item,
                index === navigationState.index
                  ? styles.active
                  : styles.inactive,
                itemStyle,
              ]}>
              <View
                style={
                  index === navigationState.index
                    ? styles.activeTextContainer
                    : styles.textContainer
                }>
                <Text
                  color={Colors.background}
                  size="big"
                  customStyle={{marginBottom: 10}}>
                  {item.title}
                </Text>
              </View>
            </Touchable>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 150,
    // width: '100%',
    // flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  activeTextContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.background,
  },
  txt: {
    fontSize: 22,
    color: Colors.background,
  },
  txtActive: {
    marginTop: 3,
  },
  txtInactive: {
    color: Colors.background,
  },
  image: {
    heigt: 100,
    width: 125,
  },
});

export default TabBar;
