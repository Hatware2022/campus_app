import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfilesScreen from './ProfilesScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';

const Stack = createStackNavigator();

/* =============================================================================
<ProfileStack />
============================================================================= */
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
