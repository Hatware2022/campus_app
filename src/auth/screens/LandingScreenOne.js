import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import UniversityChapmanLogo from '../../assets/icons/university-chapman-logo.svg'
import UniversityStanfordLogo from '../../assets/icons/university-stanford-logo.svg'
import {useNavigation} from '@react-navigation/native'

const LandingScreenOne = () => {
  const navigation = useNavigation()
  const universitiesData = [
    {
      id: 1,
      universityName: 'Chapman University',
      universityLogo: <UniversityChapmanLogo height={38} width={38} />
    },
    {
      id: 2,
      universityName: 'Stanford University',
      universityLogo: <UniversityStanfordLogo height={38} width={38} />
    }
  ]
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Bondo-text.png')}
        style={styles.logoTxt}
      />

      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          color="#5AB7D2"
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={'Search universities here'}
          style={styles.searchTxtInput}
          onChangeText={e => console.log(e)}
        />
      </View>

      <FlatList
        data={universitiesData}
        style={styles.flatlist}
        renderItem={({item: {universityName, universityLogo}, index}) => (
          <TouchableOpacity
            style={styles.flatlistContainer}
            onPress={() => navigation.navigate('LandingScreenTwo')}
          >
            {universityLogo}
            <Text style={styles.universityName}>{universityName}</Text>
            <View style={styles.selectContainer}>
              <Text style={styles.selectTxt}>Select</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <Text style={styles.orTxt}>or</Text>
        <TouchableOpacity style={styles.btnOne}>
          <Text style={styles.btnTxt}>Join your university</Text>
        </TouchableOpacity>

        <Text style={styles.term}>
          By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  logoTxt: {
    alignSelf: 'center',
    marginTop: '15%'
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
    width: '80%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: '20%'
  },
  searchIcon: {
    marginTop: 10,
    marginLeft: 10
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 61,
    width: '90%',
    alignSelf: 'center'
  },
  divider: {
    width: 100,
    height: 1,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 10
  },
  orTxt: {
    color: '#5AB7D2',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10
  },
  term: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '60%',
    lineHeight: 12,
    marginTop: 37,
    fontSize: 10,
    color: '#B3B3B3',
    fontWeight: '400'
  },
  flatlist: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '10%'
  },
  flatlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    marginTop: 3
  },
  universityName: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#373C3E'
  },
  selectContainer: {
    width: 70,
    height: 23,
    borderRadius: 3,
    borderColor: '#5AB7D2',
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectTxt: {
    alignSelf: 'center',
    color: '#5AB7D2'
  },
  searchTxtInput: {
    paddingLeft: 10
  }
})

export default LandingScreenOne
