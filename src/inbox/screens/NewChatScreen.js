import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from 'react-native'
import {Container, View, Title} from '../../common'
import Text from '../../common/TextV2'

import SearchIcon from '../../assets/icons/icon-search.svg'

import * as Colors from '../../config/colors'
import {useIsFocused} from '@react-navigation/native'
import session from '../../store/session'
import keys from '../../store/keys'
import userService from '../../services/user'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import BackIcon from '../../assets/icons/icon-back.svg'

import Fonts from '../../config/fonts'
import {FlatList} from 'react-native-gesture-handler'
import ProfileListItem from '../components/Inbox/ProfileListItem'

/* =============================================================================
<NewChatScreen />
============================================================================= */
const NewChatScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [keyword, setKeyword] = useState('')
  const [userList, setUserListt] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [isFirst, setIsFirstTime] = useState(true)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused || keyword) {
      onRefresh()
    }
  }, [isFocused, keyword])

  const _safeAreaStyle = {
    paddingTop: insets.top
  }

  const onRefresh = () => {
    setIsFirstTime(false)
    setRefreshing(true)
    userService
      .getProfilesByText(session.get(keys.token), keyword)
      .then(result => {
        setTimeout(() => {
          if (result.data && result.data.success === true) {
            let r = result.data.data
            setRefreshing(false)
            setUserListt(r)
          } else {
            setRefreshing(false)
            setUserListt([])
          }
        }, 500)
      })
  }

  return (
    <Container backgroundColor="#FFFF">
      <View style={[_safeAreaStyle, styles.headerContainer]}>
        <View horizontal alignItems="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>

          <Text
            size="big"
            family="semi"
            color={Colors.whiteText}
            customStyle={{paddingLeft: 20}}
          >
            New Chat
          </Text>
        </View>
      </View>
      <View style={{padding: 10, flex: 1}}>
        <View horizontal style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholder="Search for who you want to chat with"
            placeholderTextColor={Colors.black400}
            selectionColor={Colors.primary}
            style={styles.textInput}
            maxLength={40}
            value={keyword}
            onChangeText={value => {
              setKeyword(value)
            }}
          />
        </View>
        <FlatList
          data={userList}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            isFirst ? null : (
              <Title type="h6" marginHorizontal={20} marginVertical={20}>
                No data found.
              </Title>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </View>
    </Container>
  )
}
const renderItem = ({item}) => {
  return <ProfileListItem data={item} />
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary
  },
  containerSearch: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginTop: 10,
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600
  }
})

export default NewChatScreen
