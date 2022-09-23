import React, {useState, useEffect} from 'react';
import {StatusBar, TextInput,View,Text} from 'react-native';
import {
  Container,
  Card,
  Content,
  Button,
} from '../../common';
// import Text from '../../common/TextV2';
import moment from 'moment';
import styles from '../../styles/styles';
import userService from '../../services/user';

import * as Colors from '../../config/colors';

import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Header from '../../user/component/Header';
import session from '../../store/session';
import keys from '../../store/keys';


/* =============================================================================
<OTPScreen />
============================================================================= */
const OtpScreen = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
  const registrationData = props.route.params.data
  
  const [codeDigitOne, setCodeDigitOne] = useState('');
  const [codeDigitTwo, setCodeDigitTwo] = useState('');
  const [codeDigitThree, setCodeDigitThree] = useState('');
  const [codeDigitFour, setCodeDigitFour] = useState('');

  const _handleSendOtp =()=>{
      if(codeDigitOne === "" || codeDigitTwo === "" || codeDigitThree === "" || codeDigitFour === ""){
          alert('Incomplete OTP code')
      }
      else{
        
          let code = codeDigitOne + codeDigitTwo + codeDigitThree + codeDigitFour
     
          userService.sendOtp(registrationData?.email, code).then(result => {
            console.log("result.data",result)
            console.log(result)
            if (result.error) {
              alert(JSON.stringify(result.error.message))
              setErrorMessage(result.error);
              return;
            }
      
            if (result.data &&  result.data.success === false) {
              setErrorMessage(result.data.message);
              return;
            }
      
            if (result.data  && result.data.success === true) {
    //   alert('Otp verified')
    // session.set(keys.token, result.data.token);
    //     session.set(keys.isLoggedIn, 'true');

      navigation.navigate('CreateProfile',{userId:props.route.params?.userId, registrationData: registrationData,token:result.data.token})
            }
          });
      }
  }

  return (
    <Container style={styles.backgroundColorOtp}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Header title={'Otp'} />
      <Content>
      <Text style={styles.otpTitle}>
We have sent you a one time password to your phone number, please insert them here.
      </Text>

      <View style={styles.otpDirection}>
          <View style={styles.codeInputContainer}>
              <TextInput 
              value={codeDigitOne}
              placeholder={'-'}
              style={styles.codeInput}
              maxLength={1}
              onChangeText={(e)=>setCodeDigitOne(e)}
              />
          </View>
          <View style={styles.codeInputContainer}>
               <TextInput 
              value={codeDigitTwo}
              placeholder={'-'}
              style={styles.codeInput}
              maxLength={1}
              onChangeText={(e)=>setCodeDigitTwo(e)}
              />
          </View>
          <View style={styles.codeInputContainer}>
               <TextInput 
              value={codeDigitThree}
              placeholder={'-'}
              style={styles.codeInput}
              maxLength={1}
              onChangeText={(e)=>setCodeDigitThree(e)}
              />
          </View>
          <View style={styles.codeInputContainer}>
               <TextInput 
              value={codeDigitFour}
              placeholder={'-'}
              style={styles.codeInput}
              maxLength={1}
              onChangeText={(e)=>setCodeDigitFour(e)}
              />
          </View>
      </View>

      <Text style={styles.otpNotRecieved}>If you didn’t receive the OTP code, <Text style={{color:'#A70032',fontSize:14}} onPress={()=>alert('click here')}>click here</Text></Text>
      </Content>

      <Button title="Confirm" onPress={()=>_handleSendOtp()} bottom disabled={false} />

     
    </Container>
  );
};



export default OtpScreen;
