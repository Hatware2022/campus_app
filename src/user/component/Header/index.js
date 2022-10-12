import React from 'react'
import {StyleSheet, TouchableOpacity, Platform, StatusBar} from 'react-native'
import BackIcon from '../../../assets/icons/icon-back-red.svg'

import {View} from '../../../common'
import Text from '../../../common/TextV2'
import * as Colors from '../../../config/colors'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'

const Header = ({title, rightIcon, onPressRightIcon}) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const _safeAreaStyle = {
    paddingTop: insets.top
  }
  return (
    <View style={[_safeAreaStyle, styles.headerContainer]}>
      <View horizontal alignItems="center">
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={() => navigation.goBack()}
          style={styles.iconBack}
        >
          <BackIcon />
        </TouchableOpacity>

        <View flex={1}>
          <Text size="big" family="semi" color={Colors.primary}>
            {title}
          </Text>
        </View>

        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? 90 : 50,
    backgroundColor: Colors.white100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBack: {
    marginRight: 13,
    marginLeft: 15
  }
})

export default Header
