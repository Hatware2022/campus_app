import React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Dimensions} from 'react-native';

import EventsScreen from '../../events/screens/EventsScreen';
import ClubsScreen from '../../clubs/screens/ClubsScreen';
import PostsScreen from '../../posts/screens/PostsScreen';

import {Container, TabBar} from '../../../common';

const renderScene = SceneMap({
  events: EventsScreen,
  posts: PostsScreen,
  clubs: ClubsScreen,
});

const renderTabBar = props => (
  <TabBar {...props} containerStyle={styles.tabBar} />
);

const initialLayout = {width: Dimensions.get('window').width};

/* =============================================================================
<HomeScreen />
============================================================================= */
const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'events', title: 'Events'},
    {key: 'posts', title: 'Posts'},
    {key: 'clubs', title: 'Clubs'},
  ]);

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
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
