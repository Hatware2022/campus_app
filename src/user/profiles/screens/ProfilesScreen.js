import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import {Container, View, Title, TextInput} from '../../../common';
import Text from '../../../common/TextV2';
import ProfileListItem from '../components/Profiles/ProfileListItem';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import FilterIcon from '../../../assets/icons/icon-filter.svg';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import * as Colors from '../../../config/colors';
import userService from '../../../services/user';
import session from '../../../store/session';
import keys from '../../../store/keys';
import moment from 'moment';
import ModalFilter from '../../../auth/components/Modal/modalfilter';
import {setKey} from '../../../store/actions'

/* =============================================================================
<ProfilesScreen />
============================================================================= */
const ProfilesScreen = () => {
  const dispatch = useDispatch()
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('A-Z');
  const [filters, setFilters] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);

  const appSession = useSelector(state => state.session)
  const keyword = appSession[keys.profilesSearchKeyword]
  const viewFilterFlag = appSession[keys.profilesShowModalFilter]

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused, keyword, sortBy, filters]);

  useEffect(() => {
    setViewFilter(viewFilterFlag)
  }, [viewFilterFlag]);

  useEffect(() => {
    const keywordFromOtherScreen = route.params ? route.params.keyword : null;
    if (keywordFromOtherScreen) {
      setKeyword(keywordFromOtherScreen);
    }
  }, [route.params]);

  useEffect(() => {
    const keywordFromOtherScreen = route.params ? route.params.keyword : null;
    if (keywordFromOtherScreen) {
      setKeyword(keywordFromOtherScreen);
    }
  }, [route.params]);

  const reload = () => {
    userService.getAll(session.get(keys.token)).then(result => {
      let arr = result.data.data;
      setRecords(arr);
      if (
        keyword.length > 0 ||
        (filters && filters?.keyword && filters?.keyword.length > 0)
      ) {
        let f = (filters && filters?.keyword) || keyword;
        arr = arr.filter(k => k?.bio?.toLowerCase().includes(f.toLowerCase()) ||
        k?.name?.toLowerCase().includes(f.toLowerCase()));
      }

      if (sortBy === 'A-Z') {
        arr = arr.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'Z-A') {
        arr = arr.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortBy === 'Newest') {
        arr = arr.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
      }
      if (filters) {
        if (filters?.major?.length > 0) {
          arr = arr.filter(k =>
            k?.major && k?.major != null && k?.major.toLowerCase().includes(filters.major.toLowerCase()),
          );
        }
        if (filters?.gradeYear?.length > 0) {
          arr = arr.filter(
            k => k?.gradYear && k?.gradYear != null && k?.gradYear.toLowerCase() === filters.gradeYear.toLowerCase(),
          );
        }
        if (filters?.downfor?.length > 0) {
          arr = arr.filter(record => {
            let returnValue
            (record.downFor || []).forEach(downforItem => {
              if (filters.downfor.includes(downforItem)) {
                returnValue = true
              }
            })
            return returnValue
          })
        }
        if (filters?.from?.length > 0) {
          arr = arr.filter(
            k => k?.address && k?.address != null && k?.address.toLowerCase().includes(filters.from.toLowerCase())||
            k?.city && k?.city != null && k?.city.toLowerCase().includes(filters.from.toLowerCase()),
          );
        }
        if (filters?.gender?.length > 0) {
          arr = arr.filter(
            k => k?.gender && k?.gender != null & k?.gender.toLowerCase() === filters.gender.toLowerCase(),
          );
        }
      }

      setRecords(arr);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  const _onPressMajor = () => {
    setViewFilter(false);
    navigation.navigate('MajorScreen', {
      navscreen: 'Profiles',
    });
  };

  const _onPressDownFor = () => {
    setViewFilter(false);
    navigation.navigate('DownForScreen');
  };

  const _onPressInterest = () => {
    setViewFilter(false);
    navigation.navigate('InterestScreen');
  };

  const _onPressCloseFilter = () => {
    setViewFilter(false);
    dispatch(setKey(keys.profilesShowModalFilter, false))
  };

  return (
    <Container backgroundColor={records && records.length>0 ? Colors.white250 : '#fff'} style={{}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.container}>
        <FlatList
          data={records}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <View style={{backgroundColor:Colors.white100,flex:1,paddingLeft: 16, paddingTop: 16}}>
              <Text customStyle={styles.title} family="semi" size="big">
                Profiles
              </Text>
                {/* <TextInput
                  left={<SearchIcon />}
                  value={keyword}
                  onChange={setKeyword}
                  placeholder="Search profiles here"
                />
                <TouchableOpacity
                  onPress={() => setViewFilter(true)}
                  style={{
                    marginLeft: 8,
                    alignSelf: 'center',
                  }}>
                  <FilterIcon />
                </TouchableOpacity> */}
              </View> 
            </>
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
        isVisible={viewFilter}
        profilesFlag={true}
        sortBy={sortBy}
        setFilters={value => setFilters(value)}
        filterFlag={true}
        setSortBy={e => setSortBy(e)}
        onCloseModal={() => _onPressCloseFilter()}
        onYes={() => _onPressCloseFilter()}
      />
    </Container>
  );
};

const renderItem = ({item}) => <ProfileListItem data={item} />;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  title: {
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default ProfilesScreen;
