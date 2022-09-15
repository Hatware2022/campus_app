import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from '../components/Swiper';

import {View, Touchable, Container, Button} from '../../common';
import Text from '../../common/TextV2';

import CampusRed from '../../assets/icons/campus-red.svg';

import * as Colors from '../../config/colors';
import {setKey} from '../../store/actions';
import {connect} from 'react-redux';
import keys from '../../store/keys';
import session from '../../store/session';
import Gap from '../../common/Gap';

/* =============================================================================
<AppIntroScreen />
============================================================================= */
const AppIntroScreen = ({globalState, setKey, navigation, ...props}) => {
  // useEffect(() => {
  //   let isFirstLaunch = session.get(keys.isFirstLaunch) || null;
  //   if (isFirstLaunch) {
  //     navigation.navigate('Login');
  //   }

  //   const token = session.get(keys.token) || null;
  //   let isLoggedIn = session.get(keys.isLoggedIn) || null;
  //   let loginType = session.get(keys.loginType) || null;
  //   if (token && isLoggedIn) {
  //     if (loginType === 'user') {
  //       navigation.navigate('UserTab');
  //     }
  //     if (loginType === 'organization') {
  //       navigation.navigate('OrganizationTab');
  //     }
  //   }
  // }, []);

  return (
    <Container safeArea style={{paddingHorizontal: 16}}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 24}}>
        <CampusRed />
      </View>

      <View style={styles.container}>
        <Swiper />
      </View>

      <Gap height={48} />

      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={{borderRadius: 28, marginHorizontal: 45}}
      />
      <Gap height={12} />

      <Button
        type="outline"
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={{borderRadius: 28, marginHorizontal: 45}}
      />

      <Gap height={36} />

      <Touchable onPress={() => navigation.navigate('ForgotPassword')}>
        <Text color={Colors.primary} family="semi" align="center">
          Forgot Password
        </Text>
      </Touchable>
    </Container>
  );
};

const styles = StyleSheet.create({
  paginationDotActive: {
    width: 38,
    height: 16,
    borderRadius: 20,
    marginHorizontal: -6,
    backgroundColor: Colors.primary,
  },
  paginationDotInactive: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    marginHorizontal: -6,
    backgroundColor: Colors.primary,
  },
  nextBtn: {
    width: 112,
    height: 112,
    borderWidth: 3,
    borderColor: '#FFF',
    alignItems: 'center',
    borderRadius: 112 / 2,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  nextBtnContainer: {
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontSize: 15,
    marginVertical: 10,
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    textDecorationLine: 'underline',
  },
  pages: {
    height: 400,
  },
  containerLogo: {
    paddingLeft: 16,
    paddingTop: 14,
  },
  container: {
    height: 400,
    justifyContent: 'flex-start',
  },
  containerButton: {
    paddingHorizontal: 50,
  },
});

/* Export
============================================================================= */

const mapStateToProps = store => ({globalState: store.session});
const mapDispatchToProps = dispatch => ({
  setKey: (key, value) => dispatch(setKey(key, value)),
  removeKey: key => dispatch(removeKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroScreen);
