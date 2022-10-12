import React, {useEffect} from 'react'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
/* =============================================================================
<LandingScreen />
============================================================================= */
const LandingScreen = (props) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Bondo-text.png')}
        style={styles.logoTxt}
      />
      <Image
        source={require('../../assets/images/Bondo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Connecting communities in a better way.</Text>

      <TouchableOpacity style={styles.btnOne} onPress={()=>props.navigation.navigate('LandingScreenOne')}>
        <Text style={styles.btnTxt}>Join your university</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTwo} onPress={()=>props.navigation.navigate('LandingScreenOne')}>
        <Text style={styles.btnTxt}>Join your organization</Text>
      </TouchableOpacity>
      <Text style={styles.term}>
          By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
        </Text>
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
    marginTop: '10%'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: '10%'
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
  btnOne: {
    width: '80%',
    height: 44,
    backgroundColor: '#5AB7D2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '30%'
  },
  btnTxt: {
    alignSelf: 'center',
    color: '#fff',
    marginTop: 12,
    fontWeight: '600'
  },
  btnTwo: {
    width: '80%',
    height: 44,
    backgroundColor: '#5AB7D2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20
  },
  term: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
    fontSize: 12
  }
})

export default LandingScreen
