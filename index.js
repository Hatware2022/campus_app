import {AppRegistry, LogBox} from 'react-native'
import {name as appName} from './app.json'
import App from '@/app'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'EventEmitter.removeListener',
  'Encountered two children with the same key'
])

AppRegistry.registerComponent(appName, () => App)
