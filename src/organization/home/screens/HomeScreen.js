import React from 'react'
import {TabView, SceneMap} from 'react-native-tab-view'
import {Dimensions} from 'react-native'
import GroupsScreen from '../../../user/groups/screens/GroupsScreen'
import ProfilesScreen from '../../../user/profiles/screens/ProfilesScreen'
import PostsScreen from '../../posts/screens/PostsScreen'

import {Container, TabBar} from '../../../common'

const renderScene = SceneMap({
  profiles: ProfilesScreen,
  posts: PostsScreen,
  groups: GroupsScreen
})

const renderTabBar = props => <TabBar {...props} />

const initialLayout = {width: Dimensions.get('window').width}

/* =============================================================================
<HomeScreen />
============================================================================= */
const HomeScreen = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {key: 'profiles', title: 'Profiles'},
    {key: 'posts', title: 'Posts'},
    {key: 'groups', title: 'Groups'}
  ])

  return (
    <Container backgroundColor="#fff">
      <TabView
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        navigationState={{index, routes}}
      />
    </Container>
  )
}
export default HomeScreen
