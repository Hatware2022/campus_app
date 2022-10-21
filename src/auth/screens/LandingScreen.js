import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import React from 'react'
import {useNavigation} from '@react-navigation/native'

const LandingScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require('../../assets/images/Bondo-text.png')}
        style={styles.logoTxt}
      />
      <Image
        source={require('../../assets/images/Bondo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bonding communities in a better way.</Text>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.btnOne}
          onPress={() => navigation.navigate('LandingScreenOne')}
        >
          <Text style={styles.btnTxt}>Join your university</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnTwo}
          onPress={() => navigation.navigate('LandingScreenOne')}
        >
          <Text style={styles.btnTxt}>Join your organization</Text>
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
    backgroundColor: '#FCF8ED',
    width: '100%',
    height: '100%'
  },
  logoTxt: {
    alignSelf: 'center',
    marginTop: '15%'
  },
  logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    marginTop: '25%'
  },
  title: {
    color: '#5AB7D2',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: '25%',
    width: '80%',
    textAlign: 'center'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 61,
    width: '100%',
    alignSelf: 'center'
  },
  btnOne: {
    width: '65%',
    height: 44,
    backgroundColor: '#5AB7D2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '24%'
  },
  btnTxt: {
    alignSelf: 'center',
    color: '#fff',
    marginTop: 12,
    fontWeight: '600'
  },
  btnTwo: {
    width: '65%',
    height: 44,
    backgroundColor: '#5AB7D2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20
  },
  term: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '60%',
    lineHeight: 12,
    marginTop: 37,
    fontSize: 10,
    color: '#B3B3B3',
    fontWeight: '400'
  }
})

export default LandingScreen
