import React, {useEffect} from 'react'
import {Alert, LogBox, View} from 'react-native'
import AppNavigation from './navigation'
import {MenuProvider} from 'react-native-popup-menu'
import {setKey, removeKey} from './store/actions'
import {connect} from 'react-redux'
import {CampusContextProvider} from './CampusContext'
import NotificationHandler from './handlers/NotificationHandler'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'EventEmitter.removeListener',
  'Encountered two children with the same key'
])
/* =============================================================================
<App />
============================================================================= */
const App = ({globalState, setKey}) => {
  return (
    <>
      <MenuProvider>
        <CampusContextProvider>
          <NotificationHandler />

          <AppNavigation />
        </CampusContextProvider>
      </MenuProvider>
    </>
  )
}

const mapStateToProps = store => ({globalState: store.session})
const mapDispatchToProps = dispatch => ({
  setKey: (key, value) => dispatch(setKey(key, value)),
  removeKey: key => dispatch(removeKey(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
