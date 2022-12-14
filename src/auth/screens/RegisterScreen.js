import React, {useState, useEffect} from 'react';
import {StatusBar, TextInput} from 'react-native';
import {
  Container,
  Card,
  View,
  Content,
  Button,
  Touchable,
  SimpleRadioButton,
  BottomButton,
} from '../../common';
import Text from '../../common/TextV2';
import moment from 'moment';
import styles from '../../styles/styles';

import * as Colors from '../../config/colors';

import {useNavigation} from '@react-navigation/native';
import userService from '../../services/user';
import session from '../../store/session';
import keys, {token} from '../../store/keys';
import globalStyles from '../../styles/styles';
import validator from 'validator';
import utils from '../../utils/utils';
import Header from '../../user/component/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIcon from '../../assets/icons/icon-back.svg';
import CalendarIcon from '../../assets/icons/icon-calendar-gray.svg';
import EyeCloseIcon from '../../assets/icons/icon-eye-close.svg';
import EyeOpenIcon from '../../assets/icons/icon-eye-open.svg';
import ModalCalendar from '../components/Modal/modalcalendar';

/* =============================================================================
<RegisterScreen />
============================================================================= */
const RegisterScreen = () => {
  const [term, setTerm] = useState(false);
  const [policy, setPolicy] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const insets = useSafeAreaInsets();
  const [showCalendar, setShowCalendar] = useState(false);
  const [temporaryDate, setTemporaryDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(null);
  const [eye, setEye] = useState(true);

  const _safeAreaStyle = {
    paddingTop: insets.top,
    // paddingBottom: insets.bottom,
  };

  useEffect(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    const token = session.get(keys.token) || null;
    const isLoggedIn = session.get(keys.isLoggedIn) || null;
    const loginType = session.get(keys.loginType) || null;
    if (token && isLoggedIn) {
      if (loginType === 'user') {
        navigation.navigate('UserTab');
      }
      if (loginType === 'organization') {
        navigation.navigate('OrganizationTab');
      }
    }
  }, []);

  const _onConfirmDate = () => {
    setShowCalendar(false);
    setBirthDate(temporaryDate);
  };

  const _handleLogin = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage(`Please provide all fields.`);
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage(`Please provide a valid email address.`);
      return;
    }

    userService.login(email, password).then(result => {
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message);
        return;
      }

      if (result.data && result.data.success === true) {
        session.set(keys.token, result.data.token);
        session.set(keys.isLoggedIn, 'true');

        let tokenData = utils.decodeJwt(result.data.token);
        if (tokenData.role === 'user') {
          session.set(keys.loginType, 'user');
          navigation.navigate('UserTab');
        } else if (tokenData.role === 'organization') {
          navigation.navigate('Home');
        }
      }
    });
  };

  const _moveToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Header title={'Register'} />
      <Content>
        <View
          style={{backgroundColor: Colors.background, flex: 1, padding: 16}}>
          <Text  style={styles.lableuser}>User Name</Text>
          <View>
            <TextInput
            style={styles.lableinput}
            placeholderTextColor={'#6B7476'}
              placeholder="Enter your email here"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
          </View>

          <Text style={styles.lableuser}>Email</Text>
          <View>
            <TextInput
            style={styles.lableinput}
          placeholderTextColor={'#6B7476'}
              placeholder="Enter your email here"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
          </View>

          <Text style={styles.lableuser}>Phone Number</Text>
          <View>
            <TextInput
            style={styles.lableinput}
          placeholderTextColor={'#6B7476'}
              placeholder="Enter your phone number here"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
          </View>

          <Text style={styles.lableuser}>Day of birth</Text>
          <Touchable
          style={styles.lableinput}
          placeholderTextColor={'#6B7476'}
            onPress={() => setShowCalendar(true)}>
            <Text>
              {birthDate !== null
                ? moment(birthDate).format('MMM DD YYYY')
                : 'Click to enter day of birth'}
            </Text>
            <CalendarIcon style={styles.eyeicon} />
          </Touchable>

          <Text style={styles.lableuser}>Password</Text>
          <View>
            <TextInput
              style={styles.lableinput}
              placeholderTextColor={'#6B7476'}
              secureTextEntry
              placeholder="Enter your password"
              value={password}
              onChangeText={value => {
                setPassword(value);
              }}
            />
           <Touchable style={styles.eyeicon} onPress={() => setEye(!eye)}>
              {eye ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </Touchable>
           
          </View>

          <Text style={styles.lableuser}>Confirm Password</Text>
          <View>
            <TextInput
              style={styles.lableinput}
              placeholderTextColor={'#6B7476'}
              secureTextEntry={eye}
              placeholder="Enter your password"
              value={password}
              onChangeText={value => {
                setPassword(value);
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
            children={
              <Text
                family="medium"
                color={Colors.primary}
                customStyle={{textDecorationLine: 'underline'}}>
                term & condition
              </Text>
            }
          />
          <SimpleRadioButton
            label="Agree to"
            selected={policy}
            onChange={() => setPolicy(!policy)}
            children={
              <Text
                family="medium"
                color={Colors.primary}
                customStyle={{textDecorationLine: 'underline'}}>
                data policy
              </Text>
            }
          />
        </View>
      </Content>

      <Button title="Confirm" onPress={_handleLogin} bottom disabled={false} />

      <ModalCalendar
        title="Day of birth"
        visibleValue={showCalendar}
        onBackdropPress={() => setShowCalendar(false)}
        onBackButtonPress={() => setShowCalendar(false)}
        temporaryDate={temporaryDate}
        onDateChange={date => setTemporaryDate(date)}
        onConfirm={_onConfirmDate}
      />
    </Container>
  );
};



export default RegisterScreen;
