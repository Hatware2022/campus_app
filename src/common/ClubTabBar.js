import * as Colors from '../config/colors'

import {Image, StyleSheet, TouchableOpacity} from 'react-native'

import React from 'react'
import SearchIcon from '../assets/icons/icon-search.svg'
import Text from './TextV2'
import {TextInput} from '../common'
import Touchable from './Touchable'
import View from './View'
import a11y from '../utils/accessibility'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

/* =============================================================================
<TabBar />
============================================================================= */
const ClubTabBar = ({
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
    paddingTop: insets.top,
    backgroundColor: Colors.white100
  }

  return (
    <View style={[styles.container, _safeArea, containerStyle]}>
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
              {...a11y(
                `${item.title} tab`,
                `double tap here to list all ${item.title}`
              )}
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

      <View horizontal style={styles.mainFilterContainer}>
        <TextInput
          left={<SearchIcon />}
          value={searchBarKeyword}
          containerStyle={{
            borderRadius: 30
          }}
          inputStyle={{height: 35, marginTop: 7}}
          contentContainerStyle={{
            borderRadius: 30,
            height: 44
          }}
          headerSearch={true}
          onChange={text => {
            searchBarChangeHandler(text)
          }}
          placeholder={searchBarPlaceholder}
          {...a11y(`${searchBarPlaceholder} text input`)}
        />
        <TouchableOpacity
          onPress={filterPressHandler}
          style={styles.filterIconContainer}
        >
          <Image
            source={require('../assets/images/Filter.png')}
            style={{width: 30, height: 30}}
          />
          {/* <FilterIcon /> */}
        </TouchableOpacity>
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
    width: '95%',
    marginTop: 20
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

export default ClubTabBar
