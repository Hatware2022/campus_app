import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Touchable} from '../../../../common';
import * as Colors from '../../../../config/colors';

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
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: Colors.white200,
    marginTop: 16,
    marginBottom: 4,
  },
  button: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialButtons;
