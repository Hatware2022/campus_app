import * as Colors from '../../../../config/colors'

import {Avatar, Touchable, View} from '../../../../common'

import Gap from '../../../../common/Gap'
import PeopleIcon from '../../../../assets/icons/icon-people-plus.svg'
import React from 'react'
import {StyleSheet} from 'react-native'
import Text from '../../../../common/TextV2'
import a11y from '../../../../utils/accessibility'
import {useNavigation} from '@react-navigation/native'

/* =============================================================================
<GroupListItem />
============================================================================= */
const GroupListItem = ({data}) => {
  const navigation = useNavigation()

  const _moveToDetails = () => {
    navigation.navigate('GroupDetails', {data})
  }

  function myDebounce(call,t){
    let timmer;
    return function (...arg){
      if(timmer) clearTimeout(timmer)
      timmer =  setTimeout(()=>{
        call();
      },t)
    }
  }

  const BetterFunction=myDebounce(_moveToDetails,1000);

  return (
    <Touchable
      onPress={BetterFunction}
      style={styles.container}
      accessibilityHint="double tap to list group posts"
    >
      <Avatar size={60} source={data.imageUrl} />
      <View
        flex={1}
        justifyContent="center"
        marginHorizontal={12}
        {...a11y(
          `Group name ${data.title} group description ${data.description}`
        )}
      >
        <Text family="semi" size="big">
          {data.title}
        </Text>
        <Gap height={4} />
        <Text size="medium" numberOfLines={1}>
          {data.description}
        </Text>
      </View>
      <View
        horizontal
        alignItems="center"
        {...a11y(`Group members ${data.members.length}`)}
      >
        <Text customStyle={{color: '#A8ACAD', marginRight: 5}}>
          {data.members.length}
        </Text>
        <PeopleIcon />
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  backgroundImage: {
    width: 151.3,
    height: 134.1
  },
  backgroundImageStyle: {
    borderRadius: 15
  },
  innerContainer: {
    flex: 1,
    borderRadius: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  name: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.background,
    fontFamily: 'Montserrat-SemiBold'
  }
})

export default GroupListItem
