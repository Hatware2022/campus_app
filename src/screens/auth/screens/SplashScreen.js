import React, {useEffect} from 'react';
import {Avatar, Container} from '../../common';

import LogoIcon from '../../assets/images/empty-image.png';

import {useNavigation} from '@react-navigation/native';

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
    <Container backgroundColor="#FFF" safeArea center>
      <Avatar size={100} source={LogoIcon} />
    </Container>
  );
};

export default SplashScreen;
