// import React from 'react';
// import {StatusBar} from 'react-native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import UserTab from './UserTab';
// import OrganizationTab from './OrganizationTab';

// import HomeScreen from '../home/screens/HomeScreen';
// import AppIntroScreen from '../auth/screens/AppIntroScreen';
// import LoginScreen from '../auth/screens/LoginScreen';
// import SignUpScreen from '../auth/screens/SignUpScreen';
// import SplashScreen from '../auth/screens/SplashScreen';
// import ChatScreen from '../chat/screens/ChatScreen';
// import NotificationsScreen from '../notifications/screens/NotificationsScreen';

// // User Screens
// import ProfileDetailsScreen from '../user/profiles/screens/ProfileDetailsScreen';
// import ChatPostCommentsScreen from '../user/chats/screens/ChatPostCommentsScreen';
// import GroupDetailsScreen from '../user/groups/screens/GroupDetailsScreen';
// import GroupPostCommentsScreen from '../user/groups/screens/GroupPostCommentsScreen';
// import EditUserProfileScreen from '../user/profile/screens/EditUserProfileScreen';
// import UserNotificationSettingsScreen from '../user/profile/screens/UserNotificationSettingsScreen';

// // Organization Screens
// import EventDetailsScreen from '../organization/events/screens/EventDetailsScreen';
// import EventCreateScreen from '../organization/events/screens/EventCreateScreen';
// import ClubDetailsScreen from '../organization/clubs/screens/ClubDetailsScreen';
// import PostCreateScreen from '../organization/posts/screens/PostCreateScreen';
// import PostCommentsScreen from '../organization/posts/screens/PostCommentsScreen';
// import EditOrganizationProfileScreen from '../organization/profile/screens/EditOrganizationProfileScreen';
// import OrganizationNotificationSettingsScreen from '../organization/profile/screens/OrganizationNotificationSettingsScreen';

// const Stack = createStackNavigator();

// /* =============================================================================
// <AppNavigation />
// ============================================================================= */
// const AppNavigation = () => {
//   return (
//     <SafeAreaProvider>
//       <StatusBar backgroundColor="#FFF" barStyle="light-content" />

//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Splash"
//           screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Splash" component={SplashScreen} />
//           <Stack.Screen name="AppIntro" component={AppIntroScreen} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="SignUp" component={SignUpScreen} />

//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="UserTab" component={UserTab} />
//           <Stack.Screen name="OrganizationTab" component={OrganizationTab} />

//           <Stack.Screen name="Chat" component={ChatScreen} />
//           <Stack.Screen name="Notifications" component={NotificationsScreen} />

//           <Stack.Screen
//             name="ProfileDetails"
//             component={ProfileDetailsScreen}
//           />
//           <Stack.Screen
//             name="ChatPostComments"
//             component={ChatPostCommentsScreen}
//           />
//           <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
//           <Stack.Screen
//             name="GroupPostComments"
//             component={GroupPostCommentsScreen}
//           />
//           <Stack.Screen
//             name="EditUserProfile"
//             component={EditUserProfileScreen}
//           />
//           <Stack.Screen
//             name="UserNotificationSettings"
//             component={UserNotificationSettingsScreen}
//           />

//           <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
//           <Stack.Screen name="EventCreate" component={EventCreateScreen} />
//           <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} />
//           <Stack.Screen name="PostCreate" component={PostCreateScreen} />
//           <Stack.Screen name="PostComments" component={PostCommentsScreen} />
//           <Stack.Screen
//             name="EditOrganizationProfile"
//             component={EditOrganizationProfileScreen}
//           />
//           <Stack.Screen
//             name="OrganizationNotificationSettings"
//             component={OrganizationNotificationSettingsScreen}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default AppNavigation;
