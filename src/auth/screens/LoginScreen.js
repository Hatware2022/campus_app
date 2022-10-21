import React, {useState, useEffect, useContext} from 'react'
import {StatusBar, Text, TextInput} from 'react-native'
import {
  Container,
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
import keys from '../../store/keys'
import globalStyles from '../../styles/styles'
import validator from 'validator'
import Header from '../../user/component/Header'
import EyeCloseIcon from '../../assets/icons/icon-eye-close.svg'
import EyeOpenIcon from '../../assets/icons/icon-eye-open.svg'

/* =============================================================================
<LoginScreen />
============================================================================= */
const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [eye, setEye] = useState(true)
  const [respData, setRespData] = useState(null)

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
      setErrorMessage('Please provide all fields.')
      return
    }

    if (!validator.isEmail(email)) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    userService.login(email, password, rememberMe).then(result => {
      if (result.error) {
        setErrorMessage(result?.error?.message || '')
        return
      }
      if (result.data && result.data.success === false) {
        setRespData(result.data)
        setErrorMessage(result?.data?.message || '')
        return
      }
      if (result?.data && result?.data?.success === true) {
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
      }
    })
  }
  const _handleResend = () => {
    console.log('to follow', respData)

    navigation.navigate('otpScreen', {
      data: respData.data,
      userId: respData.data.id,
      email,
      password
    })
  }

  return (
    <Container>
      <StatusBar
        hidden={false}
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
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
              autoCapitalize="none"
              textContentType="emailAddress"
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

          <Text
            style={{
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 12,
              color: 'black'
            }}
            onPress={() => navigation.navigate('Register')}
          >
            Didn't have an account? Register now
          </Text>
          {errorMessage && (
            <View style={globalStyles.loginErrorContainer}>
              <Text style={globalStyles.errorHelper}>{errorMessage}</Text>
              <Text style={globalStyles.resendText} onPress={_handleResend}>
                Tap HERE to enter OTP
              </Text>
            </View>
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
