import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Container, TextInput, View, Title} from '../../../common';
import Text from '../../../common/TextV2';
import GroupsFilter from '../components/Groups/GroupsFilter';
import GroupListItem from '../components/Groups/GroupListItem';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import FilterIcon from '../../../assets/icons/icon-filter.svg';
import PlusIcon from '../../../assets/icons/icon-plus-circle.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../../config/colors';
import GROUPS from '../../../constants/groups';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import groupService from '../../../services/group';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import ModalFilter from '../../../auth/components/Modal/modalfilter';

/* =============================================================================
<GroupsScreen />
============================================================================= */
const GroupsScreen = () => {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [displayRecords, setDisplayRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigation = useNavigation();
  const [viewFilter, setViewFilter] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  useEffect(() => {
    if(!keyword) {
      setDisplayRecords(records);
    } else {
      setDisplayRecords(records.filter((record) => 
        record.title?.toLowerCase().includes(keyword.toLowerCase()) || 
        record.description?.toLowerCase().includes(keyword.toLowerCase())))
    }
  }, [keyword, records])

  const reload = () => {
    groupService.getAll(session.get(keys.token)).then(result => {
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      if (result.data && result.data.success === false) {
        setErrorMessage(result.data.message);
        return;
      }

      let arr = result.data.data;

      if (keyword.length > 0) {
        let f = filters.keyword || keyword;
        arr = arr.filter(k => k.detail.toLowerCase().includes(f.toLowerCase()));
      }

      if (sortBy === 'Most Popular') {
        arr = arr.sort((a, b) => b.likes.length - a.likes.length);
      } else if (sortBy === 'Oldest First') {
        arr = arr.sort((a, b) => moment(a.created_at) - moment(b.created_at));
      } else if (sortBy === 'Newest First') {
        arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
      }

      setRecords(arr);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  const _moveToCreateGroup = () => {
    navigation.navigate('GroupNew');
  };

  return (
    <Container style={{padding: 16}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View horizontal>
        <TextInput
          left={<SearchIcon />}
          value={keyword}
          onChange={setKeyword}
          placeholder="Search Groups here"
        />
        <TouchableOpacity
          onPress={() => setViewFilter(true)}
          style={{
            marginLeft: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* <GroupsFilter /> */}
        <FlatList
          data={displayRecords}
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
                style={styles.iconPlus}>
                <Text size="small" family="medium" color={Colors.primary}>
                  {`Create New  `}
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
        isVisible={viewFilter}
        onCloseModal={() => setViewFilter(false)}
        onYes={() => setViewFilter(false)}
      />
    </Container>
  );
};

const renderItem = ({item}) => <GroupListItem data={item} />;

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
  textGroup: {
    lineHeight: 22,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Medium',
  },
  listContent: {
    paddingBottom: 20,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 24,
  },
  iconPlus: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GroupsScreen;
