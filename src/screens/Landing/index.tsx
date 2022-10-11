import React, {useEffect} from 'react'
import {StyleSheet, StatusBar,View} from 'react-native'
// import {Avatar, Container, View} from '../../common'

// import LogoIcon from '../../assets/images/splashcampus.png'
// import * as Colors from '../../config/colors'

import {useNavigation} from '@react-navigation/native'
// import FastImage from 'react-native-fast-image'
// import Icons from 'react-native-vector-icons/AntDesign'
// import keys from '../../store/keys'
// import session from '../../store/session'
/* =============================================================================
<SplashScreen />
============================================================================= */
const Landing = () => {
  const navigation = useNavigation()

  return (
   <View>

   </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 33
  }
})

export default Landing







// import React, {useEffect} from 'react'
// import {
//   CommonActions,
//   NavigationContainer,
//   NavigationProp,
//   useNavigation
// } from '@react-navigation/native'
// import {Box, Button, Center, Image, Text, VStack} from 'native-base'
// import {Colors} from '@/styles'
// import {ms} from 'react-native-size-matters'
// import {useUniversities} from '@/stores'
// import {RootStackParamList} from '@/types/root-stack-param-list'

// export default function Landing() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>()
//   const {isLoadingUniversities, clearUniversities} = useUniversities(
//     state => state
//   )
//   useEffect(() => {
//     clearUniversities()
//   }, [])
//   const handleOnPressJoinUni = () => {
//     navigation.navigate('SelectUniversity')
//   }

//   return (
//     <Box bgColor={Colors.App.background} flex={1} p={2} safeArea>
//       <Box flex={1}>
//         <Center>
//           <Image
//             mt={ms(44)}
//             source={require('@/assets/images/Bondo-text.png')}
//             alt="bondo-text-logo"
//           />
//           <Image
//             w={ms(125)}
//             h={ms(122)}
//             mt={ms(95)}
//             mb={ms(60)}
//             source={require('@/assets/images/Bondo.png')}
//             alt="bondo-logo"
//             resizeMode="cover"
//           />
//           <Text
//             maxWidth="85%"
//             color={Colors.App.primary}
//             fontWeight="medium"
//             fontSize="2xl"
//             textAlign="center"
//           >
//             Connecting communities in a better way.
//           </Text>
//         </Center>
//       </Box>

//       <Box>
//         <VStack space={5} padding={10}>
//           <Button
//             bgColor={Colors.App.primary}
//             _pressed={{
//               bgColor: Colors.App.secondary
//             }}
//             h={ms(45)}
//             rounded="full"
//             _text={{
//               bold: true,
//               fontSize: 'md'
//             }}
//             isLoading={isLoadingUniversities}
//             disabled={isLoadingUniversities}
//             onPress={handleOnPressJoinUni}
//           >
//             Join your university
//           </Button>
//           <Button
//             bgColor={Colors.App.primary}
//             _pressed={{
//               bgColor: Colors.App.secondary
//             }}
//             h={ms(45)}
//             rounded="full"
//             _text={{
//               bold: true,
//               fontSize: 'md'
//             }}
//             disabled={isLoadingUniversities}
//           >
//             Join your organization
//           </Button>
//         </VStack>
//       </Box>
//     </Box>
//   )
// }
