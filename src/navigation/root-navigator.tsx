import {Landing, SelectUniversity} from '@/screens'
import {SET_KEY} from '@/stores/_store/actions'
import {RootStackParamList} from '@/types/root-stack-param-list'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

const {Navigator, Screen} = createStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Landing" component={Landing} />
      <Screen name="SelectUniversity" component={SelectUniversity} />
    </Navigator>
  )
}
