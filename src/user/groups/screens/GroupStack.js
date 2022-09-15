import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GroupsScreen from './GroupsScreen';
import GroupCreateScreen from './GroupCreateScreen';
import GroupDetailsScreen from './GroupDetailsScreen';
import GroupPostCommentsScreen from './GroupPostCommentsScreen';

const Stack = createStackNavigator();

/* =============================================================================
<GroupStack />
============================================================================= */
const GroupStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="GroupCreate" component={GroupCreateScreen} />
      <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
      <Stack.Screen
        name="GroupPostComments"
        component={GroupPostCommentsScreen}
      />
    </Stack.Navigator>
  );
};

export default GroupStack;
