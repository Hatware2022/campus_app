import React, {useEffect} from 'react'
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
/* =============================================================================
<LandingOneScreen />
============================================================================= */
const LandingScreenOne = props => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Bondo-text.png')}
        style={styles.logoTxt}
      />

      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          color={'#5AB7D2'}
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={'Search universities here'}
          style={{paddingLeft: 10}}
          onChangeText={e => console.log(e)}
        />
      </View>

      <FlatList
        data={['', '']}
        style={styles.flatlist}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.flatlistContainer}
            onPress={() => props.navigation.navigate('LandingScreenTwo')}
          >
            <Image
              source={require('../../assets/images/Bondo.png')}
              style={{width: 35, height: 35, marginTop: 8}}
            />
            <Text style={styles.title}>Chapman University</Text>
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
    marginTop: '10%'
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
    bottom: 20,
    width: '80%',
    alignSelf:'center'
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
    width: '80%',
    lineHeight:12.1,
    marginTop: 30,
    fontSize: 12
  },
  flatlist: {
    width: '80%', 
    alignSelf: 'center', 
    marginTop: '10%'
  },
  flatlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    marginTop: 3
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
  selectContainer: {
    width: 70,
    height: 23,
    borderRadius: 3,
    borderColor: '#5AB7D2',
    borderWidth: 1,
    marginTop: 15,
    marginRight: 10
  },
  selectTxt: {
    alignSelf: 'center', 
    color: '#5AB7D2'
  }
})

export default LandingScreenOne
