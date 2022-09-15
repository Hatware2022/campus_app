import React, {useEffect, useState} from 'react';
import {
  View,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PostIcon from '../assets/icons/tab-post.svg';
import HomeIcon from '../assets/icons/tab-home.svg';
import SearchIcon from '../assets/icons/tab-search.svg';
import MessageIcon from '../assets/icons/tab-message.svg';
import ProfileIcon from '../assets/icons/tab-profile.svg';
import HomeIconAct from '../assets/icons/tab-home-active.svg';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as Colors from '../config/colors';

/* =============================================================================
<BottomTab />
============================================================================= */
const BottomTab = ({mode, state, navigation}) => {
  const [keyboardShown, setKeyboardShown] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const handleKeyboardHide = () => {
      setKeyboardShown(false);
    };

    const handleKeyboardShow = () => setKeyboardShown(true);

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', handleKeyboardShow);
      Keyboard.addListener('keyboardWillHide', handleKeyboardHide);
    } else {
      Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeAllListeners(handleKeyboardShow);
      } else {
        Keyboard.removeAllListeners(handleKeyboardShow);
      }
    };
  }, []);

  const _safeAreaStyle = {
    paddingBottom: insets.bottom,
    height: TAB_BAR_HEIGHT + insets.bottom,
  };

  if (keyboardShown) {
    return null;
  }

  return (
    <View style={[styles.container, _safeAreaStyle]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon = ICONS[mode][index];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={1}
            onPress={onPress}
            style={styles.item}>
            <View style={styles.iconContainer}>{icon}</View>
            <View
              style={[styles.underline, isFocused && styles.activeUnderline]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TAB_BAR_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    height: TAB_BAR_HEIGHT,
  },
  item: {
    flex: 1,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 32,
  },
  underline: {
    height: 6,
    width: 6,
    borderRadius: 6,
  },
  activeUnderline: {
    backgroundColor: Colors.primary,
  },
});

const ICONS = {
  user: [
    <HomeIcon />,
    <PostIcon />,
    // <SearchIcon />,
    <MessageIcon />,
    <ProfileIcon />,
  ],
  organization: [
    <HomeIcon />,
    <PostIcon />,
    // <SearchIcon />,
    <MessageIcon />,
    <ProfileIcon />,
  ],
};

export default BottomTab;
