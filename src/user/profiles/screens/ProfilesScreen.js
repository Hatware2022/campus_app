import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
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

/* =============================================================================
<ProfilesScreen />
============================================================================= */
const ProfilesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('A-Z');
  const [filters, setFilters] = useState(null);
  const [viewFilter, setViewFilter] = useState(false);
  const [displayRecords, setDisplayRecords] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused, sortBy, filters]);
  
  useEffect(() => {
    if(!keyword) {
      setDisplayRecords(records);
    } else {
      setDisplayRecords(records.filter((record) => 
        // record.title?.toLowerCase().includes(keyword.toLowerCase()) || 
        record.name?.toLowerCase().includes(keyword.toLowerCase())))
    }
  }, [keyword, records])

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
        (filters && filters.keyword && filters.keyword.length > 0)
      ) {
        let f = (filters && filters.keyword) || keyword;
        arr = arr.filter(k => k.bio.toLowerCase().includes(f.toLowerCase()));
      }

      if (sortBy === 'A-Z') {
        arr = arr.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'Z-A') {
        arr = arr.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortBy === 'Newest') {
        arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
      }

      if (filters) {
        if (filters.major.length > 0) {
          arr = arr.filter(k =>
            k.major.toLowerCase().includes(filters.major.toLowerCase()),
          );
        }
        if (filters.gradeYear.length > 0) {
          arr = arr.filter(
            k => k.gradYear.toLowerCase() === filters.gradeYear.toLowerCase(),
          );
        }
        if (filters.interests.length > 0) {
          arr = arr.filter(k => k.downFor.includes(filters.interests));
        }
        if (filters.from.length > 0) {
          arr = arr.filter(
            k => k.city.toLowerCase() === filters.from.toLowerCase(),
          );
        }
        if (filters.gender.length > 0) {
          arr = arr.filter(
            k => k.gender.toLowerCase() === filters.gender.toLowerCase(),
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

  return (
    <Container backgroundColor={Colors.white250} style={{padding: 16}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.container}>
        <FlatList
          data={displayRecords}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <View horizontal>
                <TextInput
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
                </TouchableOpacity>
              </View>
              <Text customStyle={styles.title} family="semi" size="big">
                Profiles
              </Text>
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
        onCloseModal={() => setViewFilter(false)}
        onYes={() => setViewFilter(false)}
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
