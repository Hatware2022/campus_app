import React, {useEffect, useState} from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Title, View} from '../../../common'
import Text from '../../../common/TextV2'

import ClubListItem from '../components/Posts/ClubListItem'

import PlusIcon from '../../../assets/icons/icon-plus-circle-big.svg'
import session from '../../../store/session'
import keys from '../../../store/keys'
import {setKey} from '../../../store/actions'
import * as Colors from '../../../config/colors'
import postService from '../../../services/post'
import moment from 'moment'
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native'
import ModalFilter from '../../../auth/components/Modal/modalfilter'

/* =============================================================================
<ClubScreen />
============================================================================= */
const ClubPostScreen = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [records, setRecords] = useState([])
  const [displayRecords, setDisplayRecords] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [sortBy, setSortBy] = useState('Newest')
  const [filters, setFilters] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigation = useNavigation()
  const [viewFilter, setViewFilter] = useState(false)

  const appSession = useSelector(state => state.session)
  const keyword = appSession[keys.postsSearchKeyword]
  const viewFilterFlag = appSession[keys.postsShowModalFilter]

  const loginType = session.get(keys.loginType)

  const _moveToCreatePost = () => {
    navigation.navigate('ClubPostCreate')
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

  useEffect(() => {
    if (!keyword) {
      setDisplayRecords(records)
    } else {
      setDisplayRecords(
        records.filter(
          record =>
            record?.user?.name?.toLowerCase().includes(keyword.toLowerCase()) ||
            record.content?.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    }
  }, [keyword, records, isFocused])

  useEffect(() => {
    onRefresh()
  }, [navigation, isFocused])

  const reload = () => {
    postService.getAllClub(session.get(keys.token)).then(result => {
      if (result.error) {
        setErrorMessage(result.error)
        return
      }

      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message)
        return
      }

      let arr = result.data.data

      if (keyword.length > 0 || (filters && filters?.keyword.length > 0)) {
        let f = filters?.keyword || keyword
        arr = arr.filter(k => k.detail.toLowerCase().includes(f.toLowerCase()))
      }

      if (sortBy === 'Most Popular') {
        arr = arr.sort((a, b) => b.likes - a.likes)
      } else if (sortBy === 'Newest') {
        arr = arr.sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
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
    dispatch(setKey(keys.postsShowModalFilter, false))
  }

  const renderItem = ({item}) => <ClubListItem data={item} reload={reload} />

  return (
    <Container style={{}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <FlatList
        data={displayRecords}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerText}>
            <Text family="semi" size="big" customStyle={styles.textGroup}>
              Posts
            </Text>
            {loginType === 'organization' && (
              <View horizontal>
                <TouchableOpacity
                  style={styles.iconPlus}
                  onPress={_moveToCreatePost}
                >
                  <Text size="medium" family="medium" color={Colors.primary}>
                    {'Create New  '}
                  </Text>
                  <PlusIcon width={24} />
                </TouchableOpacity>
              </View>
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
        postFilter={true}
        sortBy={sortBy}
        setSortBy={e => setSortBy(e)}
        isVisible={viewFilter}
        onCloseModal={() => console.log('ji') || _onPressCloseFilter()}
        onYes={() => _onPressCloseFilter()}
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

export default ClubPostScreen
