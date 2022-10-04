import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Touchable from './Touchable';

import * as Colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
    height: 50 + insets.top,
    paddingTop: insets.top,
  };

  return (
    <View style={[styles.container, _safeArea, containerStyle]}>
      {navigationState.routes.map((item, index) => (
        <Touchable
          key={item.key}
          onPress={() => jumpTo(item.key)}
          style={[
            styles.item,
            index === navigationState.index ? styles.active : styles.inactive,
            itemStyle,
          ]}>
          <View
            style={
              index === navigationState.index
                ? styles.activeTextContainer
                : styles.textContainer
            }>
            <Text style={[styles.txt, textStyle]}>{item.title}</Text>
          </View>
        </Touchable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
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
});

export default TabBar;
