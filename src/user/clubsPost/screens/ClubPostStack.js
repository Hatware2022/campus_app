import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import ChatsScreen from './ChatsScreen';
// import ChatPostCommentsScreen from './ChatPostCommentsScreen';
import ChatsScreen from './ClubPostScreen';
import ChatPostCommentsScreen from './ClubPostCommentScreen';

const Stack = createStackNavigator();

/* =============================================================================
<ClubPostStack />
============================================================================= */
const ClubPostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chats" component={ChatsScreen} />
      <Stack.Screen
        name="ChatPostComments"
        component={ChatPostCommentsScreen}
      />
    </Stack.Navigator>
  );
};

export default ClubPostStack;
