import {useEffect} from 'react'

import messaging from '@react-native-firebase/messaging'
import {initializeFirebase} from '../../utils/firebase'
import PushNotification from 'react-native-push-notification'

const NotificationHandler = () => {
  useEffect(() => {
    initializeFirebase()

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      )
      // Need to discuss with BE Team
      // navigation.navigate(remoteMessage.data.type);
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          )
        }
      })

    // Check whether an initial notification is available
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification
      )
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.smallIcon,
        channelId: remoteMessage.messageId,
        vibration: true,
        visibility: 'public',
        playSound: true
      })
    })

    return unsubscribe
  }, [])
  return null
}

export default NotificationHandler
