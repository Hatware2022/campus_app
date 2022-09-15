import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTab, ComingSoon} from '../common';

import InboxScreen from '../inbox/screens/InboxScreen';
import HomeScreen from '../user/home/screens/HomeScreen';
import SearchScreen from '../user/search/screens/SearchScreen';
import ProfileScreen from '../user/profile/screens/ProfileScreen';
import EventsScreen from '../user/events/screens/EventsScreen';

const Tab = createBottomTabNavigator();

/* =============================================================================
<UserTab />
============================================================================= */
const UserTab = () => (
  <Tab.Navigator
    tabBar={props => <BottomTab mode="user" {...props} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Inbox" component={InboxScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default UserTab;
