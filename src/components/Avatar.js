import * as React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import EmptyUser from '../assets/images/empty-user.png';

import * as Colors from '../config/colors';

/* =============================================================================
<Avatar />
============================================================================= */
const Avatar = ({source, style, size, border, round, radius, onPress}) => {
  const _layout = {
    width: size,
    height: size,
    borderWidth: border,
    borderRadius: round ? size / 2 : radius,
    backgroundColor: Colors.card,
  };

  if (source) {
    return (
      <Pressable onPress={onPress}>
        <Image
          style={[styles.image, _layout, style]}
          source={source}
          resizeMode={'cover'}
        />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Image
        style={[styles.image, _layout, style]}
        source={EmptyUser}
        resizeMode={'cover'}
      />
    </Pressable>
  );
};

Avatar.defaultProps = {
  radius: 50,
  size: 55,
  border: 0,
  round: true,
  style: {},
  onPress: () => null,
};

const styles = StyleSheet.create({
  container: {},
  image: {},
});

export default Avatar;
