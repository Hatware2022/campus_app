import React, {useState, useEffect, useContext} from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import {Container, TextInput, View, Title} from '../../common'
import Text from '../../common/TextV2'
import InboxListItem from '../components/Inbox/InboxListItem'
import SearchIcon from '../../assets/icons/icon-search.svg'
import FilterIcon from '../../assets/icons/icon-filter.svg'
import PlusIcon from '../../assets/icons/icon-plus-circle-big.svg'
import Chapman from '../../assets/icons/chapman.svg'
import * as Colors from '../../config/colors'
import {useIsFocused} from '@react-navigation/native'
import conversationService from '../../services/conversation'
import keys from '../../store/keys'
import session from '../../store/session'
import utils from '../../utils/utils'
import moment from 'moment'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Fonts from '../../config/fonts'
import CampusContext from '../../CampusContext'
import Header from '../../user/component/Header'
import reactotron from 'reactotron-react-native'
import {io} from 'socket.io-client'

/* =============================================================================
<InboxScreen />
============================================================================= */
const InboxScreen = ({navigation}) => {
  const isFocused = useIsFocused()
  const [records, setRecords] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [keyword, setKeyword] = useState('')
  const insets = useSafeAreaInsets()

  const _safeAreaStyle = {
    paddingTop: insets.top,
    backgroundColor: Colors.white100
    // minHeight: HEADER_HEIGHT + insets.top,
  }
  useEffect(() => {
    if (isFocused) {
      reload()
    }
  }, [isFocused, keyword])

  const reload = () => {
    setRefreshing(true)

    const tokenData = utils.decodeJwt(session.get(keys.token))
    if (!tokenData) return
    conversationService
      .getAll(session.get(keys.token), tokenData.id)
      .then(result => {
        let arr = result.data.data
        if (keyword.length > 0) {
          arr = arr.filter(k =>
            k?.senderName?.toLowerCase().includes(keyword.toLowerCase())
          )
        }
        arr = arr.sort((a, b) => moment(a.updatedAt) - moment(b.updatedAt))

        setRecords(arr?.reverse())
      })
      .finally(() =>
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
      )
  }

  const onRefresh = () => {
    reload()
  }

  const {loginAsClub} = useContext(CampusContext)

  if (loginAsClub) {
    return (
      <Container>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Header title={'Chat'} />
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text size="big" color={Colors.black500}>
            Messages are disabled for clubs
          </Text>
        </View>
      </Container>
    )
  }

  return (
    <Container backgroundColor={Colors.background}>
      {/* <StatusBar backgroundColor={Colors.primary} barStyle="light-content" /> */}

      <View style={[_safeAreaStyle, styles.headerContainer]}>
        <View
          horizontal
          marginVertical={16}
          marginHorizontal={16}
          justifyContent="space-between"
        >
          <Chapman />
        </View>

        <View horizontal style={styles.mainFilterContainer}>
          <TextInput
            left={<SearchIcon />}
            value={keyword}
            inputStyle={{height:40,marginTop:2}}
            containerStyle={{
              borderRadius: 30,
              // height:40
            }}
            contentContainerStyle={{
              borderRadius: 30,
              height:40
            }}
            onChange={text => {
              setKeyword(text)
            }}
            placeholder={'Find your friends here'}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={styles.filterIconContainer}
          >
            <FilterIcon />
          </TouchableOpacity>
        </View>
        {/* <View horizontal style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholder="Find your friends here"
            placeholderTextColor={Colors.black400}
            selectionColor={Colors.primary}
            style={styles.textInput}
            value={keyword}
            onChangeText={value => {
              setKeyword(value)
            }}
          />
        </View> */}
        <View
          horizontal
          justifyContent="space-between"
          alignItems="center"
          padding={20}
        >
          <Text size="semi" family="medium" color={Colors.primary}>
            Chats
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
            <View horizontal alignItems={'center'}>
              <Text size="medium" family="medium" color={Colors.primary}>
                {'Create New  '}
              </Text>
              <PlusIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={records}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Title type="h6" marginHorizontal={20} marginVertical={20}>
            No data found.
          </Title>
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
    </Container>
  )
}

const renderItem = ({item}) => <InboxListItem data={item} />

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white100
  },
  mainFilterContainer: {
    marginHorizontal: 15,
    marginTop:4
  },
  filterIconContainer: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  listContent: {
    paddingBottom: 20
  },
  containerSearch: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.whiteText,
    marginTop: 10,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    paddingHorizontal: 8,
    backgroundColor: Colors.background,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600
  }
})

export default InboxScreen
