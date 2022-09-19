import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import * as Colors from '../../config/colors';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  Container,
  Card,
  // View,
  Content,
  Button,
  Touchable,
  SimpleRadioButton,
} from '../../common';
import PlusIcon from '../../assets/icons/icon-tiktok.svg'



export default function CreateProfile() {

  const navigation = useNavigation();

  return (
    <View style={styles.contianer}>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle={'light-content'}  
       />

      <View style={styles.header}>

        <TouchableOpacity onPress={()=> {navigation.goBack()}}>

          <AntDesign name='arrowleft' size={RFValue(22)} color='white'/>

        </TouchableOpacity>

        <Text style={styles.title}>Create Profile</Text>

      </View>

      <ScrollView style={{padding:RFValue(16)}}>
               
          <Text style={[styles.heading,{marginTop:RFValue(0)}]}>Add Profile Image</Text>
          
          <TouchableOpacity style={styles.addImage}>

            <View style={{flexDirection:'row'}}>

              <AntDesign name='picture' size={RFValue(18)} color='#B9BFC1' style={{marginRight:RFValue(13)}}/>

              <Text style={styles.detail}>Click to add image</Text>
              
            </View>

            <AntDesign name='plus' size={RFValue(20)} color='#A70032' />

          </TouchableOpacity>

        <View style={styles.groupHead}/>

          <Text style={styles.groupHeading}>Bio</Text>

          <Text style={styles.heading}>Description</Text>
          
          <TextInput
            placeholder='Insert your bio here'
            style={styles.descriptionInput}
            placeholderTextColor={'#6B7476'}
          />
        
          <Text style={styles.heading}>Major</Text>

          <TouchableOpacity style={styles.major}>
            
            <Text style={styles.detail}>Choose your major here</Text>

            <MaterialIcons name='arrow-forward-ios' size={RFValue(20)} color='#6B7476'/>

          </TouchableOpacity>

          <Text style={styles.heading}>Grad Year</Text>

          <View style={styles.multiContainer}>
            
            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>2022</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>2023</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>2024</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>2025</Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.heading}>Gender</Text>

          <View style={styles.multiContainer}>
            
            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.regularText}>Non-binary</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.multiContainer}>

            <SimpleRadioButton
              label="Display gender on profile"
              selected={null}
              onChange={() => {}}
            />

          </View>
          
          <Text style={styles.heading}>From</Text>

          <TouchableOpacity style={styles.btnLink}>
            
            <Text style={styles.detail}>Choose where from here</Text>

            <Octicons name='location' size={RFValue(20)} color='#6B7476'/>

          </TouchableOpacity>
         
          <View style={styles.groupHead}/>
          
          <Text style={styles.groupHeading}>Social Media</Text>

          <Text style={styles.heading}>Instagram</Text>
          
          <TouchableOpacity style={styles.btnLink}>
            
            <Text style={styles.detail}>Paste your social mdedia link here</Text>

            <AntDesign name='instagram' size={RFValue(20)} color='#6B7476'/>

          </TouchableOpacity>

          <Text style={styles.heading}>TikTok</Text>

          <TouchableOpacity style={styles.btnLink}>
            
            <Text style={styles.detail}>Paste your social mdedia link here</Text>

            <Image source={require('../../../src/assets/images/tiktok.png')} style={{height:RFValue(24), width:RFValue(22)}}/>
            
          </TouchableOpacity>
          
          <Text style={styles.heading}>Linkedin</Text>
          
          <TouchableOpacity style={styles.btnLink}>
            
            <Text style={styles.detail}>Paste your social mdedia link here</Text>

            <Entypo name='linkedin' size={RFValue(20)} color='#6B7476'/>

          </TouchableOpacity>

        <View style={styles.groupHead}/>

        <View style={styles.intrestContainer}>

          <Text style={styles.heading}>Interests</Text>

          <TouchableOpacity>

            <Text style={styles.intrest}>Choose Interests</Text>

          </TouchableOpacity>

        </View>

        <View style={styles.groupHead}/>

        <View style={styles.intrestContainer}>

          <Text style={styles.heading}>Down For</Text>

          <TouchableOpacity>

            <Text style={styles.intrest}>Choose Down For</Text>

          </TouchableOpacity>

        </View>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity  style={styles.btn}>
            <Text style={styles.btnTitle}>Confirm Change</Text>
          </TouchableOpacity>

        </View>
        
      </ScrollView>



    </View>
  )
}

const styles = StyleSheet.create({
  contianer: {
    flex:1,
    backgroundColor:'white'
  },
  header: {
    flexDirection:'row', 
    width:'100%', 
    height:RFValue(92),
    backgroundColor:Colors.primary, 
    alignItems:'center', 
    paddingHorizontal:RFValue(20)
  },
  title: {
    color:'white', 
    fontWeight:'bold', 
    fontSize:20, 
    fontFamily:'Rubik-Bold',
    marginLeft:RFValue(22)
  },
  heading: {
    color:'#373C3E', 
    fontSize:RFValue(14), 
    fontWeight:'500', 
    fontFamily:'Rubik-Medium',
    marginTop:RFValue(16)
  },
  detail: {
    color:'#6B7476', 
    fontSize:RFValue(14), 
    fontWeight:'400', 
    fontFamily:'Rubik-Regular'
  },
  groupHead: {
    borderWidth:RFValue(1), 
    borderColor:'#E3E8EB', 
    width:'100%', 
    marginTop:RFValue(25)
  },
  groupHeading: {
    color:'#373C3E', 
    fontSize:RFValue(16), 
    fontWeight:'600', 
    fontFamily:'Rubik-Bold',
    marginTop:RFValue(24)
  },
  profile: {
    width:'100%', 
    height:RFValue(100), 
    backgroundColor:'white', 
  },
  addImage: {
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%', 
    height:RFValue(48), 
    marginTop:RFValue(8), 
    borderRadius:8, 
    paddingHorizontal:RFValue(16), 
    paddingVertical:RFValue(12), 
    backgroundColor:'#FAFAFA' 
  },
  major: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:'100%', 
    height:RFValue(48),  
    borderRadius:8, 
    paddingHorizontal:RFValue(16), 
    paddingVertical:RFValue(12), 
    marginTop:RFValue(8),
    backgroundColor:'#FAFAFA'
  },
  multiContainer: {
    flexDirection:'row', 
    alignItems:'center', 
    marginTop:RFValue(15)
  },
  option: {
    borderWidth:0.5, 
    borderRadius:5, 
    borderColor:'gray',
    marginRight:RFValue(15), 
    paddingVertical:RFValue(3), 
    paddingHorizontal:RFValue(5)
  },
  regularText: {
    color:'#373C3E', 
    fontSize:RFValue(14), 
    fontWeight:'400', 
    fontFamily:'Rubik-Regular'
  },
  intrestContainer: {
    width:'100%', 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    paddingTop:RFValue(30)
  },
  intrest: {
    color:'#A70032', 
    fontSize:RFValue(14), 
    fontWeight:'500', 
    fontFamily:'Rubik-Medium', 
  },
  buttonContainer: {
    height:RFValue(94), 
    backgroundColor:'#FAFAFA', 
    padding:RFValue(16), 
    width:'100%', 
    alignItems:'center', 
    justifyContent:'center' 
  },
  btn: {
    backgroundColor:'#E3E8EB', 
    width:'100%', 
    height:RFValue(42), 
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius:8
  },
  btnTitle: {
    color:'#B9BFC1', 
    fontSize:RFValue(14), 
    fontWeight:'600', 
    fontFamily:'Rubik-Medium',
  },
  btnLink: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:'100%', 
    height:RFValue(48),  
    borderRadius:8, 
    paddingHorizontal:RFValue(16), 
    paddingVertical:RFValue(12), 
    marginTop:RFValue(8),
    backgroundColor:'#FAFAFA'
  },
  descriptionInput: { 
    width:'100%', 
    height:RFValue(48),  
    borderRadius:8, 
    paddingHorizontal:RFValue(16), 
    paddingVertical:RFValue(12), 
    marginTop:RFValue(8),
    backgroundColor:'#FAFAFA' 
  }
})