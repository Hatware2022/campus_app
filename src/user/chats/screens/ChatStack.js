import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatsScreen from './ChatsScreen';
import ChatPostCommentsScreen from './ChatPostCommentsScreen';

const Stack = createStackNavigator();

/* =============================================================================
<ChatStack />
============================================================================= */
const ChatStack = () => {
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

export default ChatStack;
