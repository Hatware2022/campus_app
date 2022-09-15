import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Touchable} from '../../../../common';

import TiktokIcon from '../../../../assets/icons/app-tiktok.svg';
import LinkedInIcon from '../../../../assets/icons/app-linkedin.svg';
import InstagramIcon from '../../../../assets/icons/app-instagram.svg';

/* =============================================================================
<SocialButtons />
============================================================================= */
const SocialButtons = () => {
  const _moveTo = () => {};

  return (
    <View style={styles.container}>
      <Touchable onPress={_moveTo} style={styles.button}>
        <InstagramIcon />
      </Touchable>

      <Touchable onPress={_moveTo} style={styles.button}>
        <TiktokIcon />
      </Touchable>

      <Touchable onPress={_moveTo} style={styles.button}>
        <LinkedInIcon />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(167, 0, 50, 0.21)',
  },
  button: {
    padding: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialButtons;
