import React, {useState, useEffect, useContext} from 'react'
import {StatusBar, Text, TextInput} from 'react-native'
import {
  Container,
  Card,
  View,
  Content,
  Button,
  Touchable,
  SimpleRadioButton
} from '../../common'

import styles from '../../styles/styles'

import * as Colors from '../../config/colors'

import {useNavigation} from '@react-navigation/native'
import userService from '../../services/user'
import session from '../../store/session'
import keys, {token} from '../../store/keys'
import globalStyles from '../../styles/styles'
import validator from 'validator'
import utils from '../../utils/utils'
import Header from '../../user/component/Header'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import BackIcon from '../../assets/icons/icon-back.svg'
import EyeCloseIcon from '../../assets/icons/icon-eye-close.svg'
import EyeOpenIcon from '../../assets/icons/icon-eye-open.svg'
import Fonts from '../../config/fonts'
import CampusContext from '../../CampusContext'

/* =============================================================================
<LoginScreen />
============================================================================= */
const LoginScreen = () => {
  const {setLoginAsClub} = useContext(CampusContext)
  const [rememberMe, setRememberMe] = useState(false)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [eye, setEye] = useState(true)
  const insets = useSafeAreaInsets()

  const _safeAreaStyle = {
    paddingTop: insets.top
    // paddingBottom: insets.bottom,
  }

  useEffect(() => {
    setSuccessMessage(null)
    setErrorMessage(null)
  }, [])

  useEffect(() => {
    const token = session.get(keys.token) || null
    const isLoggedIn = session.get(keys.isLoggedIn) || null
    const loginType = session.get(keys.loginType) || null
    if (token && isLoggedIn) {
      if (loginType === 'user') {
        navigation.navigate('UserTab')
      }
      if (loginType === 'organization') {
        navigation.navigate('OrganizationTab')
      }
    }
  }, [])

  const _handleLogin = () => {
    setSuccessMessage(null)
    setErrorMessage(null)
    if (!email || !password) {
      setErrorMessage(`Please provide all fields.`)
      return
    }

    if (!validator.isEmail(email)) {
      setErrorMessage(`Please provide a valid email address.`)
      return
    }

    userService.login(email, password, rememberMe).then(result => {
      if (result.error) {
        setErrorMessage(result?.error?.message || '')
        return
      }
      if (result.data && result.data.success === false) {
        setErrorMessage(result?.data?.message || '')
        return
      }
      if (result?.data && result?.data?.success === true) {
        // alert(JSON.stringify(result.data?.userData))
        if (result.data?.userData.clubDetails === false) {
          session.set(keys.token, result.data.userData.token)
          session.set(keys.userId, result.data.userData.id)
          session.set(keys.isLoggedIn, 'true')
          session.set(keys.loginType, 'user')
          navigation.navigate('UserTab')
        } else {
          session.set(keys.token, result.data.userData.token)
          session.set(keys.userId, result.data.userData.id)
          session.set(keys.isLoggedIn, 'true')
          session.set(keys.loginType, 'organization')
          navigation.navigate('OrganizationTab')
        }
        // let tokenData = utils.decodeJwt(result.data.userData.token);
        // if (tokenData.role === 'user') {
        //   if (rememberMe) {
        //     console.log('trueee');
        //     setLoginAsClub(true);
        //   }
        //   session.set(keys.loginType, 'user');
        //   navigation.navigate('UserTab');
        //   } else if (tokenData.role === 'organization') {
        //   // } else if (result.data.clubDetails != undefined) {
        //   navigation.navigate('Home');
        // }
      }
    })
  }

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Header title={'Login'} />
      <Content>
        <View
          style={{backgroundColor: Colors.background, flex: 1, padding: 16}}
        >
          <Text style={styles.lableuser}>Email</Text>
          <View>
            <TextInput
              placeholderTextColor={'#6B7476'}
              style={styles.lableinput}
              placeholder="Enter your email here"
              value={email}
              onChangeText={value => {
                setEmail(value)
              }}
            />
          </View>

          <Text style={styles.lableuser}>Password</Text>
          <View>
            <TextInput
              placeholderTextColor={'#6B7476'}
              style={styles.lableinput}
              secureTextEntry={eye}
              placeholder="Enter your password"
              value={password}
              onChangeText={value => {
                setPassword(value)
              }}
            />
            <Touchable style={styles.eyeicon} onPress={() => setEye(!eye)}>
              {eye ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </Touchable>
          </View>
          <SimpleRadioButton
            label="Login as a Club"
            selected={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            login={true}
          />
          {errorMessage && (
            <Text style={globalStyles.errorHelper}>{errorMessage}</Text>
          )}
          {successMessage && (
            <Text style={globalStyles.successHelper}>{successMessage}</Text>
          )}
        </View>
      </Content>

      <Button title="Login" onPress={_handleLogin} bottom disabled={false} />
    </Container>
  )
}

export default LoginScreen
