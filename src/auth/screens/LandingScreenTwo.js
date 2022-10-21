import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import React from 'react'
import {useNavigation} from '@react-navigation/native'

const LandingScreenTwo = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logoo.png')}
        style={styles.logoTxt}
      />

      <Text style={styles.title}>
        See what’s {'\n'}happening on {'\n'}campus today
      </Text>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.bottomBtn, styles.loginBtn]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.btnTxt, styles.loginBtnTxt]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomBtn, styles.registerBtn]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.btnTxt, styles.registerBtnTxt]}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.term}>
          By signing up, you agree to our Terms, {'\n'}Privacy Policy, and
          Cookie Use.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A70032',
    width: '100%',
    height: '100%'
  },
  logoTxt: {
    alignSelf: 'center',
    marginTop: '10%',
    width: 220,
    height: 130
  },
  bottomBtn: {
    width: '70%',
    height: 44,
    borderRadius: 28,
    alignSelf: 'center',
    marginTop: '3%'
  },
  loginBtn: {
    backgroundColor: '#FFFFFF'
  },
  registerBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E3E8EB'
  },
  btnTxt: {
    alignSelf: 'center',
    marginTop: 14,
    lineHeight: 18,
    fontWeight: '600'
  },
  loginBtnTxt: {
    color: '#A70032'
  },
  registerBtnTxt: {
    color: '#FFFFFF'
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    width: '90%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: '10%'
  },
  searchIcon: {
    marginTop: 10,
    marginLeft: 10
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 61,
    width: '100%'
  },
  term: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '60%',
    lineHeight: 12,
    marginTop: 37,
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '400'
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 36,
    marginLeft: '15%',
    marginTop: '35%'
  }
})

export default LandingScreenTwo
