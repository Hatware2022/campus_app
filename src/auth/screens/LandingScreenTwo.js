import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
/* =============================================================================
<LandingOneScreen />
============================================================================= */
const LandingScreenTwo = () => {
  const navigation = useNavigation()
  const [checkbox,setCheckbox]= useState(false)

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logoo.png')}
        style={styles.logoTxt}
      />

    <Text style={{fontSize:30,width:'40%',fontWeight:'bold',color:'#fff',lineHeight:34,marginLeft:'8%',marginTop:'18%'}}>See what’s happening on campus today</Text>



      <View style={styles.bottomContainer}>
       
        <TouchableOpacity style={styles.btnOne} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.btnTxt}>Login with email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{flexDirection:'row',marginTop:20,marginLeft:'10%'}} onPress={()=>setCheckbox(!checkbox)}>
            <MaterialIcons name={!checkbox ? 'check-box-outline-blank' : 'check-box'} color={'#fff'} style={{alignSelf:'center',paddingHorizontal:5}} />
        <Text style={{color:'#fff'}}>Login as a Club</Text>
        </TouchableOpacity>

        <Text style={styles.term}>By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.</Text>
       
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A70032',
    width: '100%',
    height: '100%'
  },
  logoTxt: {
    alignSelf: 'center',
    marginTop: '10%',
    width:220,
    height:130
  },

  btnOne: {
    width: '80%',
    height: 44,
    backgroundColor: '#5AB7D2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '3%'
  },
  btnTxt: {
    alignSelf: 'center',
    color: '#fff',
    marginTop: 12,
    fontWeight: '600'
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    width: '90%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: '10%'
  },
  searchIcon: {
    marginTop: 10, 
    marginLeft: 10
  },
  bottomContainer: {
    position: 'absolute', 
    bottom: 50,
    width:'100%'
  },
  term: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '50%',
    marginTop: 20,
    fontSize: 10,
    color:'#fff'
  }
})

export default LandingScreenTwo
