import * as Colors from '../../../config/colors'

import {Container, Title, View} from '../../../common'
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useIsFocused, useNavigation} from '@react-navigation/native'

import ChatListItem from '../components/Chats/ChatListItem'
import ModalFilter from '../../../auth/components/Modal/modalfilter'
import PlusIcon from '../../../assets/icons/icon-plus-circle-big.svg'
import Text from '../../../common/TextV2'
import a11y from '../../../utils/accessibility'
import keys from '../../../store/keys'
import postService from '../../../services/post'
import session from '../../../store/session'
import {setKey} from '../../../store/actions'

/* =============================================================================
<ChatsScreen />
============================================================================= */
const ChatsScreen = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [records, setRecords] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [filteredRecords, setFilteredRecords] = useState([])
  const [forDisplay, setForDisplay] = useState([])
  const [sortBy, setSortBy] = useState('Newest')
  const [filters, setFilters] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [filterTags, setFilterTags] = useState([])
  const navigation = useNavigation()
  const [viewFilter, setViewFilter] = useState(false)

  const appSession = useSelector(state => state.session)
  const keyword = appSession[keys.postsSearchKeyword]
  const viewFilterFlag = appSession[keys.postsShowModalFilter]

  const _moveToCreatePost = () => {
    navigation.navigate('PostCreate')
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      reload()
    }

    return () => {
      isMounted = false
    }
  }, [isFocused, sortBy, filters])

  useEffect(() => {
    setViewFilter(viewFilterFlag)
  }, [viewFilterFlag])

  useEffect(() => {
    reload()
  }, [isFocused, navigation])

  const _sortRecords = rec => {
    return rec.sort((a, b) => {
      if (sortBy === 'Most Popular') {
        return b.likes - a.likes
      }
    })
  }

  useEffect(() => {
    if (!filterTags?.length) {
      setFilteredRecords(_sortRecords(records))
    } else {
      const newFilteredRecords = records.filter(record => {
        let returnValue
        const recordTags = record.tags || []
        recordTags.forEach(tag => {
          if (filterTags.includes(tag)) {
            returnValue = true
          }
        })
        return returnValue
      })
      setFilteredRecords(_sortRecords(newFilteredRecords))
    }
  }, [records, filterTags, sortBy])

  useEffect(() => {
    if (!keyword) {
      setForDisplay(records)
    } else {
      setForDisplay(
        filteredRecords.filter(
          record =>
            record.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            record.description?.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    }
  }, [keyword, filteredRecords])

  const reload = () => {
    postService.getAll(session.get(keys.token)).then(result => {
      if (result.error) {
        setErrorMessage(result.error)
        return
      }
      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message)
        return
      }
      setRecords(result.data.data)
    })
  }

  const onRefresh = () => {
    setRefreshing(true)
    reload()
    setRefreshing(false)
  }

  const _onPressCloseFilter = () => {
    setViewFilter(false)
    dispatch(setKey(keys.postsShowModalFilter, false))
  }

  const handleSubmit = filterValues => {
    _onPressCloseFilter()
    setFilterTags(filterValues.tags)
  }

  const renderItem = ({item}) => <ChatListItem data={item} reload={reload} />

  return (
    <Container style={{}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <FlatList
        data={forDisplay}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerText}>
            <Text family="semi" size="big" customStyle={styles.textGroup}>
              Posts
            </Text>
            <View horizontal>
              <TouchableOpacity
                style={styles.iconPlus}
                onPress={_moveToCreatePost}
                {...a11y(
                  'create new post button',
                  'double tap here to create a new post'
                )}
              >
                <Text size="medium" family="medium" color={Colors.primary}>
                  {'Create New '}
                </Text>
                <PlusIcon width={24} />
              </TouchableOpacity>
            </View>
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
        postFilter={true}
        filterFlag={true}
        sortBy={sortBy}
        setFilters={e => setFilters(e)}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => _onPressCloseFilter()}
        onYes={handleSubmit}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 11,
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
  listContent: {
    paddingBottom: 0
  },
  buttonPost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonPostTxt: {
    color: Colors.primary
  },
  iconPlus: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textGroup: {
    lineHeight: 22,
    flex: 1
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    padding: 16
  }
})

export default ChatsScreen
