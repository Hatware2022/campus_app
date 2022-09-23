// ReactotronConfig.js
import Reactotron from 'reactotron-react-native'

// then add it to the plugin list
Reactotron.configure()
  .useReactNative() //  <- here i am!
  .connect() //Don't forget about me!
