import React from 'react'
import {TabView, SceneMap} from 'react-native-tab-view'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import ChatsScreen from '../../chats/screens/ChatsScreen'
import GroupsScreen from '../../groups/screens/GroupsScreen'
import EventsScreen from '../../../organization/events/screens/EventsScreen'
// import EventsScreen from '../../events/screens/EventsScreen';
import ClubsScreen from '../../../organization/clubs/screens/ClubsScreen'
import PostsScreen from '../../../organization/posts/screens/PostsScreen'

import {Container, TabBar} from '../../../common'

import {setKey} from '../../../store/actions'
import keys from '../../../store/keys'

const renderScene = SceneMap({
  events: EventsScreen,
  posts: ChatsScreen,
  clubs: ClubsScreen
})

const renderTabBar = props => (
  <>
    <TabBar
      {...props}
      // containerStyle={styles.tabBar}
      // styles={{backgroundColor: 'blue'}}
    />
  </>
)

// const initialLayout = {width: Dimensions.get('window').width};

/* =============================================================================
<HomeScreen />
============================================================================= */
const OrganizationScreen = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {key: 'events', title: 'Events'},
    {key: 'posts', title: 'Posts'},
    {key: 'clubs', title: 'Clubs'}
  ])
  const dispatch = useDispatch()
  const appState = useSelector(state => state.session)

  const getTabProps = (props, ndx) => {
    const tabProps = [
      {...props, 
        searchBarPlaceholder: 'Search Events here',
        searchBarKeyword: appState[keys.eventsSearchKeyword],
        searchBarChangeHandler: keyword => {
          dispatch(setKey(keys.eventsSearchKeyword, keyword))
        },
        filterPressHandler: () => {
          dispatch(setKey(keys.eventsShowModalFilter, true))
        }
      },
      {...props, 
        searchBarPlaceholder: 'Search Posts here',
        searchBarKeyword: appState[keys.postsSearchKeyword],
        searchBarChangeHandler: keyword => {
          dispatch(setKey(keys.postsSearchKeyword, keyword))
        },
        filterPressHandler: () => {
          dispatch(setKey(keys.postsShowModalFilter, true))
        }
      },
      {
        ...props,
        searchBarPlaceholder: 'Search Clubs here',
        searchBarKeyword: appState[keys.clubsSearchKeyword],
        searchBarChangeHandler: keyword => {
          dispatch(setKey(keys.clubsSearchKeyword, keyword))
        },
        filterPressHandler: () => {
          dispatch(setKey(keys.clubsShowModalFilter, true))
        }
      }
    ]
    return tabProps[ndx]
  }

  return (
    <Container backgroundColor="#fff">
      {/* <View styles={{backgroundColor: 'red'}}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
          source={campusLogo}
        />
      </View> */}
      {/* <Text>dlmldlmdml</Text> */}

      <TabView
        renderScene={renderScene}
        renderTabBar={props => renderTabBar(getTabProps(props, index))}
        onIndexChange={setIndex}
        // initialLayout={initialLayout}
        navigationState={{index, routes}}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 19
    // justifyContent: 'space-between',
  },
  image: {
    width: 135,
    height: 22
  }
})

export default OrganizationScreen
