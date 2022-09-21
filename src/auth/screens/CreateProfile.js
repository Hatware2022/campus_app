import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Image, TouchableOpacity,   } from 'react-native'
import React, {useState} from 'react'

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
import TiktokIcon from '../../assets/icons/icon-tiktok.svg'
import ImagePicker from 'react-native-image-crop-picker';
import ModalCreateProfile from '../../auth/components/Modal/modalcreateprofile';



export default function CreateProfile() {

  const navigation = useNavigation();

  const [imageName, setImageName] = useState('')
  const [description, setDescription] = useState('')
  const [isVisibal, setIsVisibal] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const [gradYear, setGradYear] = useState()
  const [gender, setGender] = useState()
  const [showGender, setShowGender] = useState(false)
  const [from, setFrom] = useState()
  const [instagram, setInstagram] = useState()
  const [tiktok, setTiktok] = useState()
  const [linkedin, setLinkedin] = useState()
  const [majorSelected, setMajorSelected] = useState()
  const [interetsSelected, setInteretsSelected] = useState()
  const [downForSelected, setDownForSelected] = useState()
  


  const gradYearList = [2022, 2023, 2024, 2025]

  const genderList = ['Male', 'Female', 'Non-binary']

  const chooseImage = async () => {
    // setSelectFileModal(false)

    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {
      console.log('image====>>>',image)
      
      let ext = image.path.split('.').pop()
      setImageName(`image.${ext}`)
      
    })
       
  }

  

  



  return (
    <View style={styles.contianer}>
      {/* <StatusBar
        backgroundColor={Colors.primary}
        barStyle={'light-content'}  
        translucent
       /> */}

      <View style={styles.header}>

        <TouchableOpacity onPress={()=> {navigation.goBack()}}>

          <AntDesign name='arrowleft' size={RFValue(22)} color='white'/>

        </TouchableOpacity>

        <Text style={styles.title}>Create Profile</Text>

      </View>

      <ScrollView style={{padding:RFValue(16)}}>
               
          <Text style={[styles.heading,{marginTop:RFValue(0)}]}>Add Profile Image</Text>
          
          <TouchableOpacity style={styles.addImage} onPress={()=>{chooseImage()}}>

            <View style={{flexDirection:'row'}}>

              <AntDesign name='picture' size={RFValue(18)} color='#B9BFC1' style={{marginRight:RFValue(13)}}/>

              <Text style={styles.detail}>{imageName == '' ? 'Click to add image' : imageName}</Text>
              
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
            onChangeText={setDescription}
            value={description}
          />
        
          <Text style={styles.heading}>Major</Text>

          <TouchableOpacity 
            style={styles.major} 
            onPress={()=>{
              setIsVisibal(true)
              setTypeModal('major')
          }}>
            
            <Text style={styles.detail}>{majorSelected? majorSelected : 'Choose your major here'}</Text>

            <MaterialIcons name='arrow-forward-ios' size={RFValue(20)} color='#6B7476'/>

          </TouchableOpacity>

          <Text style={styles.heading}>Grad Year</Text>

          <View style={styles.multiContainer}>

            {gradYearList.map((item)=> {
              return (
              <TouchableOpacity style={[styles.option,{borderColor: gradYear == item ? Colors.primary : 'gray', backgroundColor: gradYear == item ? Colors.red300 : 'transparent'}]} onPress={()=>{setGradYear(item)}}>
                <Text style={styles.regularText}>{item}</Text>
              </TouchableOpacity>
            )})}
        
          </View>

          <Text style={styles.heading}>Gender</Text>

          <View style={styles.multiContainer}>

            {genderList.map((item)=> {
              return (
              <TouchableOpacity style={[styles.option,{borderColor: gender == item ? Colors.primary : 'gray', backgroundColor: gender == item ? Colors.red300 : 'transparent'}]} onPress={()=>{setGender(item)}}>
                <Text style={styles.regularText}>{item}</Text>
              </TouchableOpacity>
            )})}

          </View>

          <View style={styles.multiContainer}>

            <SimpleRadioButton
              label="Display gender on profile"
              selected={showGender}
              onChange={() => {
                setShowGender(!showGender)
              }}
            />

          </View>
          
          <Text style={styles.heading}>From</Text>

          <View style={styles.fromContainer}>
 
            <TextInput
              placeholder='Write where from here'
              style={{width:'90%'}}
              placeholderTextColor={'#6B7476'}
              onChangeText={setFrom}
              value={from}
            />
            
            <Octicons name='location' size={RFValue(20)} color='#6B7476'/>

          </View>
         
          <View style={styles.groupHead}/>
          
          <Text style={styles.groupHeading}>Social Media</Text>

          <Text style={styles.heading}>Instagram</Text>

          <View style={styles.fromContainer}>
 
            <TextInput
              placeholder='Paste your social mdedia link here'
              style={{width:'90%'}}
              placeholderTextColor={'#6B7476'}
              onChangeText={setInstagram}
              value={instagram}
            />
            
            <AntDesign name='instagram' size={RFValue(20)} color='#6B7476'/>

          </View>
          

          <Text style={styles.heading}>TikTok</Text>

          <View style={styles.fromContainer}>
 
            <TextInput
              placeholder='Paste your social mdedia link here'
              style={{width:'90%'}}
              placeholderTextColor={'#6B7476'}
              onChangeText={setTiktok}
              value={tiktok}
            />
            
            <TiktokIcon style={{width:RFValue(50), height:RFValue(24)}}/>

          </View>
          
          <Text style={styles.heading}>Linkedin</Text>

          <View style={styles.fromContainer}>
 
            <TextInput
              placeholder='Paste your social mdedia link here'
              style={{width:'90%'}}
              placeholderTextColor={'#6B7476'}
              onChangeText={setLinkedin}
              value={linkedin}
            />
            
            <Entypo name='linkedin' size={RFValue(20)} color='#6B7476'/>

          </View>

        <View style={styles.groupHead}/>

        <View style={styles.intrestContainer}>

          <Text style={styles.heading}>Interests</Text>

          <TouchableOpacity onPress={()=>{
              setIsVisibal(true)
              setTypeModal('interets')
          }}>

            <Text style={styles.intrest}>Choose Interests</Text>

          </TouchableOpacity>

        </View>

        <View style={styles.groupHead}/>

        <View style={styles.intrestContainer}>

          <Text style={styles.heading}>Down For</Text>

          <TouchableOpacity onPress={()=>{
              setIsVisibal(true)
              setTypeModal('down for')
          }}>

            <Text style={styles.intrest}>Choose Down For</Text>

          </TouchableOpacity>

        </View>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity  style={styles.btn}>
            <Text style={styles.btnTitle}>Confirm Change</Text>
          </TouchableOpacity>

        </View>
        
      </ScrollView>

      <ModalCreateProfile
        isVisible={isVisibal}
        onCloseModal={() => setIsVisibal(false)}
        onYes={(item) => {
          setIsVisibal(false)
          if (typeModal == 'major') {
            setMajorSelected(item)
          } else
          if(typeModal == 'interets') {
            setInteretsSelected(item)
          } else 
          if (typeModal == 'down for') {
            setDownForSelected(item)
          }
          console.log('kiya aya................',item);

        }}
        modalType={typeModal}
        
      />



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
    height:RFValue(65),
    backgroundColor:Colors.primary, 
    alignItems:'center', 
    paddingHorizontal:RFValue(20)
  },
  title: {
    color:'white', 
    fontWeight:'bold', 
    fontSize:20, 
    fontFamily:'Rubik-Bold',
    marginLeft:RFValue(22),
    
  },
  heading: {
    color:'#373C3E', 
    fontSize:RFValue(13), 
    fontWeight:'700', 
    fontFamily:'Rubik-Bold',
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
    fontSize:RFValue(15), 
    fontWeight:'700', 
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
  },
  modalContainerStyle: {
    justifyContent: 'flex-end',
    margin: 0
  },
  fromContainer: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    // width:'100%', backgroundColor:'red', 
    // height:RFValue(48),  
    borderRadius:8, 
    paddingHorizontal:RFValue(16), 
    // paddingVertical:RFValue(12), 
    marginTop:RFValue(8),
    backgroundColor:'#FAFAFA'
    
  }
})