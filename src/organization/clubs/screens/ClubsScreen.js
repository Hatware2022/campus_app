import React, {useState, useEffect} from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import {Container, TextInput, View} from '../../../common'
import Text from '../../../common/TextV2'
import {useDispatch, useSelector} from 'react-redux'

import ClubsFilter from '../components/Clubs/ClubsFilter'
import ClubListItem from '../components/Clubs/ClubListItem'

import SearchIcon from '../../../assets/icons/icon-search.svg'
import FilterIcon from '../../../assets/icons/icon-filter.svg'
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg'

import * as Colors from '../../../config/colors'
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native'
import CLUBS from '../../../constants/clubs'
import ModalFilter from '../../../auth/components/Modal/modalfilter'
import utils from '../../../utils/utils'
import session from '../../../store/session'
import keys from '../../../store/keys'
import {setKey} from '../../../store/actions'
import clubAPI from '../../../services/club'
import userService from '../../../services/user'
import moment from 'moment'

/* =============================================================================
<ClubsScreen />
============================================================================= */
const ClubsScreen = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [sortBy, setSortBy] = useState('Newest')
  const [filters, setFilters] = useState(null)
  // const [keyword, setKeyword] = useState('');
  const [viewFilter, setViewFilter] = useState(false)
  const [records, setRecords] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const appSession = useSelector(state => state.session)
  const keyword = appSession[keys.clubsSearchKeyword]
  const viewFilterFlag = appSession[keys.clubsShowModalFilter]

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setTimeout(() => {
        reload()
      }, 2000)
    }

    return () => {
      isMounted = false
    }
  }, [isFocused, keyword, sortBy, filters])

  useEffect(() => {
    setViewFilter(viewFilterFlag)
  }, [viewFilterFlag])

  const reload = async () => {
    clubAPI.getClub(session.get(keys.token)).then(result => {
      let arr = result.data.data
      if (
        keyword.length > 0 ||
        (filters && filters?.keyword && filters?.keyword.length > 0)
      ) {
        let f = (filters && filters?.keyword) || keyword
        arr = arr.filter(k => k.title.toLowerCase().includes(f.toLowerCase()))
      }

      if (sortBy === 'Ending Soon') {
        arr = arr.sort(
          (a, b) =>
            moment(b.date).diff(moment(), 'days') -
            moment(a.date).diff(moment(), 'days')
        )
      } else if (sortBy === 'Most Popular') {
        arr = arr.sort((a, b) => b.rsvp.length - a.rsvp.length)
      } else if (sortBy === 'Newest') {
        arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at))
      }

      if (filters) {
        if (filters.tags.length > 0) {
          arr = arr.filter(k => k.tags.includes(filters.tags))
        }
      }

      setRecords(arr)
    })
  }

  const onRefresh = () => {
    setRefreshing(true)
    reload()
    setRefreshing(false)
  }

  const _onPressCloseFilter = () => {
    setViewFilter(false)
    dispatch(setKey(keys.clubsShowModalFilter, false))
  }

  const renderItem = ({item}) => <ClubListItem data={item} reload={reload} />

  return (
    <Container backgroundColor={Colors.white200} style={{}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.container}>
        <FlatList
          data={records}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              {/* <View horizontal>
                <TextInput
                  left={<SearchIcon />}
                  value={keyword}
                  onChange={setKeyword}
                  placeholder="Search clubs here"
                />
                <TouchableOpacity
                  onPress={() => setViewFilter(true)}
                  style={{
                    marginLeft: 8,
                    alignSelf: 'center',
                  }}>
                  <FilterIcon />
                </TouchableOpacity>
              </View> */}
              <View
                style={{
                  backgroundColor: Colors.white100,
                  flex: 1,
                  paddingLeft: 16,
                  paddingTop: 16
                }}
              >
                <Text size="big" family="semi" customStyle={styles.title}>
                  Clubs
                </Text>
              </View>
            </>
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
      <ModalFilter
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => _onPressCloseFilter()}
        onYes={() => _onPressCloseFilter()}
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
  container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  title: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  listContent: {
    paddingBottom: 20
  }
})

export default ClubsScreen
