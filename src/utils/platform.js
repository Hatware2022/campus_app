import {Platform} from 'react-native'

const GetOS = (() => {
  let instance
  return {
    getInstance: () => {
      if (!instance) {
        instance = Platform.OS
      }
      return instance
    }
  }
})()

export default GetOS
