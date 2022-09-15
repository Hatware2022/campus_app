import React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Dimensions} from 'react-native';

import ChatsScreen from '../../chats/screens/ChatsScreen';
import GroupsScreen from '../../groups/screens/GroupsScreen';
import ProfilesScreen from '../../profiles/screens/ProfilesScreen';

import {Container, TabBar} from '../../../common';

const renderScene = SceneMap({
  profiles: ProfilesScreen,
  chats: ChatsScreen,
  groups: GroupsScreen,
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
    {key: 'profiles', title: 'Profiles'},
    {key: 'chats', title: 'Chat'},
    {key: 'groups', title: 'Groups'},
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
