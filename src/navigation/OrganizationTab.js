import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTab, ComingSoon} from '../common';

import InboxScreen from '../inbox/screens/InboxScreen';
import HomeScreen from '../organization/home/screens/HomeScreen';
import ProfileScreen from '../organization/profile/screens/ProfileScreen';
import SearchScreen from '../organization/search/screens/SearchScreen';
import EventsScreen from '../organization/events/screens/EventsScreen';
import PostsScreen from '../organization/posts/screens/PostsScreen';

const Tab = createBottomTabNavigator();

/* =============================================================================
<OrganizationTab />
============================================================================= */
const OrganizationTab = () => (
  <Tab.Navigator
    tabBar={props => <BottomTab mode="organization" {...props} />}
    screenOptions={{headerShown: false}}>
    {/* <Tab.Screen name="Home" component={PostsScreen} /> */}
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Post" component={EventsScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Inbox" component={InboxScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default OrganizationTab;
