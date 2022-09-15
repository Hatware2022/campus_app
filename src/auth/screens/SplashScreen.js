import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Container} from '../../common';

import LogoIcon from '../../assets/images/splashcampus.png';
import * as Colors from '../../config/colors';

import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

/* =============================================================================
<SplashScreen />
============================================================================= */
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('AppIntro');
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container backgroundColor={Colors.primary} safeArea center>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={LogoIcon}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 33,
  },
});

export default SplashScreen;
