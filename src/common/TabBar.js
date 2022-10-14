import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity,Image} from 'react-native'

import View from './View'
import Text from './TextV2'
import Touchable from './Touchable'
import {TextInput} from '../common'
// import {useDispatch, useSelector} from 'react-redux'

import * as Colors from '../config/colors'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Chapman from '../assets/icons/chapman.svg'
import FilterIcon from '../assets/icons/icon-filter.svg'
import SearchIcon from '../assets/icons/icon-search.svg'
import CampusContext from '../CampusContext'

/* =============================================================================
<TabBar />
============================================================================= */
// const dispatch = useDispatch()
const TabBar = ({
  jumpTo,
  textStyle,
  itemStyle,
  containerStyle,
  navigationState,
  searchBarPlaceholder = 'Search here',
  searchBarKeyword = '',
  // searchBarChangeHandler: keyword => {
  //   dispatch(setKey(keys.postsSearchKeyword, keyword))
  // },
  // filterPressHandler: () => {
  //   dispatch(setKey(keys.postsShowModalFilter, true))
  // } 
  searchBarChangeHandler = keyword => {dispatch(setKey(keys.postsSearchKeyword, keyword))},
  filterPressHandler = () => {dispatch(setKey(keys.postsShowModalFilter, true))}
}) => {
  const insets = useSafeAreaInsets()
  const {loginAsClub} = useContext(CampusContext)

  const _safeArea = {
    paddingTop: insets.top,
    backgroundColor: Colors.white100
  }

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

      <View horizontal style={styles.mainFilterContainer}>
        <TextInput
          left={<SearchIcon />}
          value={searchBarKeyword}
          containerStyle={{
            borderRadius: 30,
          }}
          inputStyle={{height:35,marginTop:7}}
          contentContainerStyle={{
            borderRadius: 30,
            height: 44
          }}
          headerSearch={true}
          onChange={text => {
            searchBarChangeHandler(text)
          }}
          placeholder={searchBarPlaceholder}
          accessibilityLabel={searchBarPlaceholder + ' text input.'}
        />
        <TouchableOpacity
          onPress={filterPressHandler}
          style={styles.filterIconContainer}
        >
          {loginAsClub ?
          <Image source={require('../assets/images/Filter.png')} style={{width:30,height:30}}/>
        : <FilterIcon />}
        </TouchableOpacity>
      </View>

      <View horizontal>
        {navigationState.routes.map((item, index) => {
          const active = index !== navigationState.index
          const activeStyle = {
            marginBottom: 10,
            fontWeight: !active ? '500' : '400'
          }

          return (
            <Touchable
              key={item.key}
              onPress={() => jumpTo(item.key)}
              style={[
                styles.item,
                !active ? styles.active : styles.inactive,
                itemStyle
              ]}
              accessible={true}
              accessibilityLabel={item.title + ' tab'}
              accessibilityHint={'double tap here to list all ' + item.title}
            >
              <View>
                <Text
                  color={active ? '#6B7476' : Colors.primary}
                  size="slightlyLarge"
                  customStyle={activeStyle}
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
    backgroundColor: Colors.primary
  },
  mainFilterContainer: {
    marginHorizontal: 15,
    width:'95%'
    // height:40
  },
  filterIconContainer: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    // flex: 1,
    paddingTop: 15,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 35,
    paddingHorizontal: 10
  },
  textContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary
  },
  inactive: {
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
