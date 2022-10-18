import session from '../../store/session'
import keys from '../../store/keys'

import messaging from '@react-native-firebase/messaging'

import reactotron from 'reactotron-react-native'
import {Platform} from 'react-native'

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    reactotron.log('Authorization status:', authStatus)
    return enabled
  }
  return false
}

async function getToken() {
  const token =
    Platform.OS === 'android'
      ? await messaging().getToken()
      : await messaging().getAPNSToken()
  reactotron.log('getToken:', token)

  session.set(keys.fcmToken, token)
}

async function initializeFirebase() {
  const response = await requestUserPermission()
  if (!response) {
    reactotron.log('Firebase permission failed!')
  } else {
    await getToken()
  }
}

export {initializeFirebase, getToken}
