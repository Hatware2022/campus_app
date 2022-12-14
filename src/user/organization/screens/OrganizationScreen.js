import React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Dimensions, View} from 'react-native';

import ChatsScreen from '../../chats/screens/ChatsScreen';
import GroupsScreen from '../../groups/screens/GroupsScreen';
import EventsScreen from '../../../organization/events/screens/EventsScreen';
// import EventsScreen from '../../events/screens/EventsScreen';
import ClubsScreen from '../../../organization/clubs/screens/ClubsScreen';
import PostsScreen from '../../../organization/posts/screens/PostsScreen';

import {Container, TabBarNoHeader} from '../../../common';
import Text from '../../../common/TextV2';
import FastImage from 'react-native-fast-image';
import campusLogo from '../../../assets/images/campuslogo.png';

const renderScene = SceneMap({
  events: EventsScreen,
  posts: PostsScreen,
  clubs: ClubsScreen,
});

const renderTabBar = props => (
  <>
    <TabBarNoHeader
      {...props}
      // containerStyle={styles.tabBar}
      // styles={{backgroundColor: 'blue'}}
    />
  </>
);

// const initialLayout = {width: Dimensions.get('window').width};

/* =============================================================================
<HomeScreen />
============================================================================= */
const OrganizationScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'events', title: 'Events'},
    {key: 'posts', title: 'Posts'},
    {key: 'clubs', title: 'Clubs'},
  ]);

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
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        // initialLayout={initialLayout}
        navigationState={{index, routes}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 19,
    // justifyContent: 'space-between',
  },
  image: {
    width: 135,
    height: 22,
  },
});

export default OrganizationScreen;
