import React, {useState} from 'react';
import {StyleSheet, TextInput, StatusBar} from 'react-native';
import {Container, Content, View, Button} from '../../common';
import Text from '../../common/TextV2';

import * as Colors from '../../config/colors';

import {useRoute} from '@react-navigation/native';

import Gap from '../../common/Gap';

import Header from '../../user/component/Header';
import Fonts from '../../config/fonts';
import ModalAlert from '../components/Modal/modalalert';
import axios from 'axios';
import constants from '../../utils/constants';

/* =============================================================================
<ForgotPasswordScreen />
============================================================================= */
const ForgotPasswordScreen = () => {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [viewModal, setViewModal] = useState(false);


  const handleValidation = () =>{
    if(email === ""){
      alert('Email is required')
    }
    else{
      handleforgotPassword()
    }
  }
  const handleforgotPassword=()=>{
    try {
      let response =  axios({
        url: `${constants.API_URL}/users/forgotPassword`,
        method: 'POST',
        data:{
          "email":email
        }
      }).then((res)=>{
        if (res.data && res.data.success === true) {
          setViewModal(true)
        }
      });
    } catch (error) {
      console.log('Error while Sending Password Reset Email => ' + error);
    }
  }

  return (
    <Container>
     <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Header title={'Forgot Password'} />

      <Content padding={16}>
        <Text color={Colors.black500}>
          Forgot your password? Don’t worry, just enter your email below and you
          can reset your password there.
        </Text>
        <Gap height={16} />

        <Text family="medium">Email</Text>
        <View style={styles.containerEmail}>
          <TextInput
            // style={styles.textInputReason}
            placeholder="Enter your email here"
            value={email}
            onChangeText={value => {
              setEmail(value);
            }}
          />
        </View>
      </Content>
      <Button
        title="Confirm"
        onPress={() => handleValidation()}
        bottom
        disabled={false}
      />

      <ModalAlert
        titlemessage={'Reset password done'}
        submessage={'We have sent a reset password to your email.'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onYes={() => setViewModal(false)}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    flex: 1,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
  containerContent: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  containerSearch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  containerEmail: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.white200,
  },
  input: {
    marginHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
  },
});

export default ForgotPasswordScreen;
