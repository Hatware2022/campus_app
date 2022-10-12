import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import {useSelector} from 'react-redux'
import {Container, View, Title} from '../../../common'
import Text from '../../../common/TextV2'
import GroupListItem from '../components/Groups/GroupListItem'
import PlusIcon from '../../../assets/icons/icon-plus-circle-big.svg'
import * as Colors from '../../../config/colors'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import groupService from '../../../services/group'
import session from '../../../store/session'
import keys from '../../../store/keys'
import ModalFilter from '../../../auth/components/Modal/groupsmodalfilter'
import {setKey} from '../../../store/actions'

/* =============================================================================
<GroupsScreen />
============================================================================= */
const GroupsScreen = () => {
  const isFocused = useIsFocused()
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [forDisplay, setForDisplay] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const sortValues = ['Most Popular', 'Most Recent']
  const [sortBy, setSortBy] = useState(sortValues[1])
  const [errorMessage, setErrorMessage] = useState(null)
  const [filterTags, setFilterTags] = useState([])

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const appSession = useSelector(state => state.session)
  const keyword = appSession[keys.groupsSearchKeyword]

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      reload()
    }

    return () => {
      isMounted = false
    }
  }, [isFocused])

  const _sortRecords = (records) => {
    return records.sort((a,b) => {
      if(sortBy === 'Most Popular') {
        return a.members.length < b.members.length
      } else {
        return new Date(a.createdAt).valueOf() < new Date(b.createdAt).valueOf()
      }
    })
  }

  useEffect(() => {
    if(!filterTags.length) {
      setFilteredRecords(_sortRecords(records))
    } else {
      const newFilteredRecords = records.filter(record => {
        let returnValue
        (record.tags || []).forEach(tag => {
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
      setForDisplay(filteredRecords)
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
    groupService.getAll(session.get(keys.token)).then(result => {
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

  const _moveToCreateGroup = () => {
    navigation.navigate('GroupNew')
  }

  const handleSubmit = filterValues => {
    setFilterTags(filterValues.tags)
    setSortBy(filterValues.sortBy)
  }

  const handleCloseFilterModal = () => {
    dispatch(setKey(keys.groupsShowModalFilter, false))
  }

  return (
    <Container style={{padding: 16}}>
      <StatusBar
        backgroundColor={Colors.white100}
        barStyle="dark-content"
        translucent
      />

      <View style={styles.container}>
        {/* <GroupsFilter /> */}
        <FlatList
          data={forDisplay}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.headerText}>
              <Text family="semi" size="big" customStyle={styles.textGroup}>
                Groups
              </Text>
              <TouchableOpacity
                onPress={_moveToCreateGroup}
                style={styles.iconPlus}
                accessible={true}
                accessibilityLabel="create new group button"
                accessibilityHint="double tap here to create a new group"
              >
                <Text size="medium" family="medium" color={Colors.primary}>
                  {'Create New  '}
                </Text>
                <PlusIcon />
              </TouchableOpacity>
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
      </View>

      <ModalFilter
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={appSession[keys.groupsShowModalFilter]}
        onCloseModal={handleCloseFilterModal}
        onYes={handleSubmit}
        sortValues={sortValues}
        tags={records.reduce((prev, curr) => {
          const tagsToInclude = curr.tags.filter(
            tag => prev.indexOf(tag) === -1
          )
          return [...prev, ...tagsToInclude]
        }, [])}
        tagValues={filterTags}
      />
    </Container>
  )
}

const renderItem = ({item}) => <GroupListItem data={item} />

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: Colors.primary
  },
  container: {
    flex: 1,
    marginTop: -10
  },
  list: {
    flex: 1
  },
  textGroup: {
    lineHeight: 22,
    flex: 1
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Medium'
  },
  listContent: {
    paddingBottom: 20
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 24
  },
  iconPlus: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default GroupsScreen
