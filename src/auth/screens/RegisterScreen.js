import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Linking, StatusBar, TextInput, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import validator from 'validator'
import EyeCloseIcon from '../../assets/icons/icon-eye-close.svg'
import EyeOpenIcon from '../../assets/icons/icon-eye-open.svg'
import {
  Button,
  Container,
  Content,
  SimpleRadioButton,
  Touchable,
  View
} from '../../common'
import Text from '../../common/TextV2'
import * as Colors from '../../config/colors'
import userService from '../../services/user'
import keys from '../../store/keys'
import session from '../../store/session'
import styles from '../../styles/styles'
import Header from '../../user/component/Header'
import constants from '../../utils/constants'

/* =============================================================================
<RegisterScreen />
============================================================================= */
const RegisterScreen = () => {
  const [term, setTerm] = useState(false)
  const [policy, setPolicy] = useState(false)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [eye, setEye] = useState(true)
  const [displayTerm, setDisplayTerms] = useState(false)
  const [webUrl, setWebUrl] = useState('')

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

  const _handleLogin = async () => {
    setSuccessMessage(null)
    setErrorMessage(null)

    if (userName.length < 2) {
      alert('User Name should be at least two characters')
      return
    }

    if (!email || !password) {
      alert('Please provide all fields.')
      setErrorMessage('Please provide all fields.')
      return
    }

    if (!validator.isEmail(email)) {
      alert('Please provide a valid email address.')
      setErrorMessage('Please provide a valid email address.')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (!term) {
      alert('Please check to agree with Terms & Conditions')
      return
    }

    if (!policy) {
      alert('Please check to agree with our Data Policy')
      return
    }

    let data = {
      name: userName,
      email: email
    }
    userService.register(userName, email, password).then(result => {
      if (result.error) {
        alert(JSON.stringify(result.error.message))
        setErrorMessage(result.error)
        return
      }

      if (
        result.data &&
        result.data.data &&
        result.data.data.success === false
      ) {
        setErrorMessage(result.data.message)
        return
      }

      if (
        result.data &&
        result.data.data &&
        result.data.data.success === true
      ) {
        alert('OTP sent. Please check you email to verify.')
        navigation.navigate('otpScreen', {
          data: data,
          userId: result.data.data.data.id,
          email,
          password
        })
      }
    })
  }

  return (
    <>
      <Container>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Header title={'Register'} />
        <Content>
          <View
            style={{backgroundColor: Colors.background, flex: 1, padding: 16}}
          >
            <Text customStyle={styles.registerTxt} style={styles.lableuser}>
              Name
            </Text>
            <View>
              <TextInput
                style={styles.lableinput}
                placeholderTextColor={'#6B7476'}
                placeholder="Enter your name here"
                value={userName}
                onChangeText={value => {
                  setUserName(value)
                }}
              />
            </View>

            <Text customStyle={styles.registerTxt} style={styles.lableuser}>
              Email
            </Text>
            <View>
              <TextInput
                style={styles.lableinput}
                placeholderTextColor={'#6B7476'}
                placeholder="Enter your email here"
                value={email}
                autoCapitalize="none"
                textContentType="emailAddress"
                onChangeText={value => {
                  setEmail(value)
                }}
              />
            </View>

            <Text customStyle={styles.registerTxt} style={styles.lableuser}>
              Password
            </Text>
            <View>
              <TextInput
                style={styles.lableinput}
                placeholderTextColor={'#6B7476'}
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
            <Text customStyle={styles.registerTxt} style={styles.lableuser}>
              Confirm Password
            </Text>
            <View>
              <TextInput
                style={styles.lableinput}
                placeholderTextColor={'#6B7476'}
                secureTextEntry={eye}
                placeholder="Enter your password"
                value={confirmPassword}
                onChangeText={value => {
                  setConfirmPassword(value)
                  // setPassword(value);
                }}
              />
              <Touchable style={styles.eyeicon} onPress={() => setEye(!eye)}>
                {eye ? <EyeOpenIcon /> : <EyeCloseIcon />}
              </Touchable>
            </View>

            <SimpleRadioButton
              label="Agree to"
              selected={term}
              onChange={() => setTerm(!term)}
              onPressItem={() => Linking.openURL(`${constants.HOST_URL}/terms`)}
              children={
                <Text
                  family="medium"
                  color={Colors.primary}
                  customStyle={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold'
                  }}
                >
                  Terms & Conditions
                </Text>
              }
            />
            <SimpleRadioButton
              label="Agree to"
              selected={policy}
              onChange={() => setPolicy(!policy)}
              onPressItem={() =>
                Linking.openURL(`${constants.HOST_URL}/privacy-policy`)
              }
              children={
                <Text
                  family="medium"
                  color={Colors.primary}
                  customStyle={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold'
                  }}
                >
                  Data Policy
                </Text>
              }
            />
          </View>
        </Content>

        <Button
          title="Confirm"
          onPress={() => _handleLogin()}
          bottom
          disabled={false}
        />
      </Container>
      {displayTerm && (
        <View style={{height: '100%'}}>
          <TouchableOpacity
            style={{height: 50, backgroundColor: 'white'}}
            onPress={() => setDisplayTerms(false)}
          >
            <Text
              customStyle={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 10,
                fontWeight: 'bold'
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
          <WebView source={{uri: webUrl}} />
        </View>
      )}
    </>
  )
}

export default RegisterScreen
