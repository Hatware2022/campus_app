import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {NativeBaseProvider} from 'native-base'

interface Props {
  children: React.ReactNode
}

export function AppContainer({children}: Props) {
  return (
    <NativeBaseProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider>
  )
}
