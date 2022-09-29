import { StyleSheet } from 'react-native';
import * as Colors from "../config/colors";
import Fonts from "../config/fonts";

const styles = StyleSheet.create({
    errorHelper: {
        color: Colors.primary,
        marginBottom: 10
    },
    successHelper: {
        color: Colors.green,
        marginBottom: 10
    },
    lableinput: {
        fontFamily: Fonts.fontFamily.rubikRegular,
        flex: 1,
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginRight: 10,
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 15,

    },
    lableuser: {
        fontFamily: Fonts.fontFamily.rubikRegular,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        color: '#373C3E',
        marginBottom: 8,
    },
    eyeicon: {       
        position: 'absolute',
        right: 20,
        paddingTop: 25,
    },
    card: {
        paddingBottom: 50,
        backgroundColor: Colors.background,
      },
      title: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.primary,
      },
      rememberMeContainer: {
        marginBottom: 30,
      },
      button: {
        marginVertical: 10,
      },
      signUpButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      signUpButtonText: {
        color: Colors.primary,
      },
      iconBack: {
        marginRight: 16,
      },
      registerTxt:{
        color:Colors.text, 
        fontWeight:'bold'
      },
      backgroundColorOtp:{backgroundColor:'#E5E5E5'},
      otpTitle:{
        fontFamily:'Rubik',
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:14,
        lineHeight:18,
        color:'#6B7476',
        paddingHorizontal:10,
        marginTop:20
    },
    otpDirection:{
      marginTop:50,
      width:'85%',
      alignSelf:'center',
    },
    codeInputContainer:{width:72,height:72,backgroundColor:'#FAFAFA',borderRadius:10,marginRight:10,marginTop:20},
    codeInput:{alignSelf:'center',height:72,width:72,textAlign:'center'},
    otpNotRecieved:{color:'#6B7476',fontSize:14,marginLeft:10,marginTop:20}

});

export default styles;
