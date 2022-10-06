import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import View from './View'
import Text from './TextV2'
import Touchable from './Touchable'
import {TextInput} from '../common'

import * as Colors from '../config/colors'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import LogoIcon from '../assets/images/campuslogo.png'
import Chapman from '../assets/icons/chapman.svg'
import FilterIcon from '../assets/icons/icon-filter.svg'
import NotificationIcon from '../assets/icons/icon-notif.svg'
import SearchIcon from '../assets/icons/icon-search.svg'
import Gap from './Gap'
import {useNavigation} from '@react-navigation/native'

/* =============================================================================
<TabBar />
============================================================================= */
const TabBar = ({
  jumpTo,
  textStyle,
  itemStyle,
  containerStyle,
  navigationState,
  searchBarPlaceholder = 'Search here',
  searchBarKeyword = '',
  searchBarChangeHandler = keyword => {},
  filterPressHandler = () => {}
}) => {
  const insets = useSafeAreaInsets()

  const _safeArea = {
    height: 149 + insets.top,
    paddingTop: insets.top,
    backgroundColor: 'white'
  }
  // const navigation = useNavigation()

  return (
    <View style={[styles.container, _safeArea, containerStyle]}>
      <View
        horizontal
        marginVertical={16}
        marginHorizontal={16}
        justifyContent="space-between"
      >
        <Chapman />
      </View>

      <View horizontal style={{marginHorizontal: 15}}>
        <TextInput
          left={<SearchIcon />}
          value={searchBarKeyword}
          onChange={text => {
            searchBarChangeHandler(text)
          }}
          placeholder={searchBarPlaceholder}
        />
        <TouchableOpacity
          onPress={filterPressHandler}
          style={{
            marginLeft: 16,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <View horizontal>
        {navigationState.routes.map((item, index) => {
          const active = index !== navigationState.index
          return (
            <Touchable
              key={item.key}
              onPress={() => jumpTo(item.key)}
              style={[
                styles.item,
                !active ? styles.active : styles.inactive,
                itemStyle
              ]}
            >
              <View>
                <Text
                  color={active ? '#6B7476' : Colors.primary}
                  size="big"
                  customStyle={{marginBottom: 10, fontWeight: !active ? '500' : '400'}}
                >
                  {item.title}
                </Text>
              </View>
            </Touchable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 350,
    // width: '100%',
    // flexDirection: 'row',
    backgroundColor: Colors.primary
  },
  item: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 5,
    marginLeft: 15,
    marginRight: 45
  },
  textContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary

    // height: 41,
    // backgroundColor: 'pink'
  },
  inactive: {
    // borderBottomWidth: 3,
    // borderBottomColor: 'blue'
    color: '#6B7476'
  },
  activeTextContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.background
  },
  txt: {
    fontSize: 22,
    color: Colors.background
  },
  txtActive: {
    marginTop: 3
  },
  txtInactive: {
    color: Colors.background
  },
  image: {
    heigt: 100,
    width: 125
  }
})

export default TabBar
