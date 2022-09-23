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

/* =============================================================================
<TabBar />
============================================================================= */
const TabBarNoHeader = ({
  jumpTo,
  textStyle,
  itemStyle,
  containerStyle,
  navigationState,
}) => {
  const insets = useSafeAreaInsets();

  const _safeArea = {
    height: 40 + insets.top,
    paddingTop: insets.top,
  };

  return (
    <>
      <View style={[styles.container, _safeArea, containerStyle]}>
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
              <View>
                <Text
                  color={Colors.background}
                  size="big"
                  customStyle={{marginBottom: 4}}>
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
    // borderBottomWidth: 3,
    // borderBottomColor: Colors.background,
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
  active:{
    borderBottomWidth: 4,
    borderBottomColor: Colors.background,
    height:40,
  },
  inactive: {
    // borderBottomWidth: 3,
    // borderBottomColor: 'blue'
  },
});

export default TabBarNoHeader;
