import React, {useEffect} from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {Avatar, Container} from '../../common'

import LogoIcon from '../../assets/images/splashcampus.png'
import * as Colors from '../../config/colors'

import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/AntDesign'
import keys from '../../store/keys'
import session from '../../store/session'
/* =============================================================================
<SplashScreen />
============================================================================= */
const SplashScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      Icons.loadFont()
      const token = session.get(keys.token) || null
      let isLoggedIn = session.get(keys.isLoggedIn) || null
      let loginType = session.get(keys.loginType) || null
      if (token && isLoggedIn) {
        if (loginType === 'user') {
          navigation.reset({
            index: 0,
            routes: [{name: 'UserTab'}]
          })
        }
        if (loginType === 'organization') {
          navigation.reset({
            index: 0,
            routes: [{name: 'OrganizationTab'}]
          })
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'LandingScreen'}]
        })
      }
    }, 1500)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container backgroundColor={Colors.primary} safeArea center>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={LogoIcon}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 33
  }
})

export default SplashScreen
