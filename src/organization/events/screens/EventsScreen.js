import React, {useEffect, useState, useContext} from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import {
  Button,
  Container,
  TextInput,
  Title,
  View,
  StackHeader
} from '../../../common'
import Text from '../../../common/TextV2'
import EventsFilter from '../components/Events/EventsFilter'
import EventListItem from '../components/Events/EventListItem'
import SearchIcon from '../../../assets/icons/app-search.svg'
import PlusIcon from '../../../assets/icons/icon-plus-circle.svg'
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg'
import * as Colors from '../../../config/colors'
import EVENTS from '../../../constants/events'
import {useNavigation, useIsFocused} from '@react-navigation/native'
import utils from '../../../utils/utils'
import session from '../../../store/session'
import keys from '../../../store/keys'
import eventService from '../../../services/event'
import userService from '../../../services/user'
import moment from 'moment'
import FilterIcon from '../../../assets/icons/icon-filter.svg'
import CampusContext from '../../../CampusContext'
import ModalFilter from '../../../auth/components/Modal/modalfilter'
import reactotron from 'reactotron-react-native'
import ModalConfirm from '../../../auth/components/Modal/modalconfirm'

/* =============================================================================
<EventsScreen />
============================================================================= */
const EventsScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const {loginAsClub} = useContext(CampusContext)
  const [records, setRecords] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [filters, setFilters] = useState(null)
  const [record, setRecord] = useState(null)
  const [viewFilter, setViewFilter] = useState(false)

  const _moveToCreatePost = () => {
    navigation.navigate('EventCreate')
  }

  useEffect(() => {
    const tokenData = utils.decodeJwt(session.get(keys.token))
    if (!tokenData) return
    userService.getById(session.get(keys.token), tokenData.id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data
        setRecord(r)
      }
    })
  }, [])

  useEffect(() => {
    if (isFocused) {
      onRefresh()
    }
  }, [isFocused, keyword, sortBy, filters])

  const reload = () => {
    setRefreshing(true)

    eventService.getAll(session.get(keys.token)).then(result => {
      if (result.error) {
        return
      }

      if (result.data && result.data.success === false) {
        return
      }

      let arr = result.data.data

      if (keyword.length > 0) {
        let f = filters?.keyword || keyword
        arr = arr.filter(k => k.title.toLowerCase().includes(f.toLowerCase()))
      }

      if (sortBy === 'Most Popular') {
        arr = arr.sort((a, b) => b.membersinfo.length - a.membersinfo.length)
      } else if (sortBy === 'Oldest First') {
        arr = arr.sort((a, b) => moment(a.created_at) - moment(b.created_at))
      } else if (sortBy === 'Newest First') {
        arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at))
      }
      // let arr = result.data.data
      // if (
      //   keyword.length > 0 ||
      //   (filters && filters.keyword && filters.keyword.length > 0)
      // ) {
      //   let f = (filters && filters.keyword) || keyword
      //   arr = arr.filter(k => k.title.toLowerCase().includes(f.toLowerCase()))
      // }

      // if (sortBy === 'Ending Soon') {
      //   arr = arr.sort(
      //     (a, b) =>
      //       moment(b.date).diff(moment(), 'days') -
      //       moment(a.date).diff(moment(), 'days')
      //   )
      // } else if (sortBy === 'Most Popular') {
      //   arr = arr.sort((a, b) => b.rsvp.length - a.rsvp.length)
      // } else if (sortBy === 'Newest') {
      //   arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at))
      // }

      // if (filters) {
      //   if (filters.tags.length > 0) {
      //     arr = arr.filter(k => k.tags.includes(filters.tags))
      //   }
      // }
      arr?.reverse()
      setRecords(arr)
    })
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const onRefresh = () => {
    reload()
  }

  const renderItem = ({item}) => (
    <EventListItem
      data={item}
      reload={reload}
      sessionUser={record}
      onPress={_moveToDetails}
    />
  )
  const _moveToDetails = item => {
    navigation.navigate('EventDetails', {data: item})
  }

  return (
    <Container backgroundColor={Colors.white250} style={{padding: 0}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {/* <View horizontal>
        <TextInput
          left={<SearchIcon />}
          value={keyword}
          onChange={setKeyword}
          placeholder="Search events here"
        />
        <TouchableOpacity
          onPress={() => setViewFilter(true)}
          style={{
            marginLeft: 8,
            alignSelf: 'center'
          }}
        >
          <FilterIcon />
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={records}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={loginAsClub?styles.listContent:{}}
        ListHeaderComponent={
          <View style={[styles.headerText,loginAsClub?{marginVertical: 10}:{}]}>
            {/* <Text family="semi" size="big" customStyle={styles.textEvent}>
              Events
            </Text> */}
            {loginAsClub && (
              <>
                <Text size="small" family="medium" color={Colors.primary}>
                  Host Event
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EventHost')}
                  style={styles.iconPlus}
                >
                  <PlusIcon />
                </TouchableOpacity>
              </>
            )}
          </View>
        }
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
      <ModalFilter
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => setViewFilter(false)}
        onYes={() => setViewFilter(false)}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: Colors.primary
  },
  createEventButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlus: {
    marginLeft: 6
  },
  textEvent: {
    lineHeight: 22,
    flex: 1
  }
})

export default EventsScreen
