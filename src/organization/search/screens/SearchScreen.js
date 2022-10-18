import React from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import * as Colors from '../../../config/colors'
import {useNavigation} from '@react-navigation/native'

/* =============================================================================
<SearchScreen />
============================================================================= */
const SearchScreen = () => {
  const navigation = useNavigation()

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#A70032'} />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Chat</Text>
        </View>

        <Text style={styles.label}>Messages are disabled for clubs</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.whiteText
  },
  headerContainer: {
    height: 80, 
    backgroundColor: '#A70032'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 38,
    marginLeft: '4%'
  },
  label: {
    fontWeight: '400',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: '60%'
  }
})

export default SearchScreen
