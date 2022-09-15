import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import {Container, StackHeader, View, Title} from '../../common';
import Text from '../../common/TextV2';
import InboxListItem from '../components/Inbox/InboxListItem';
import SearchIcon from '../../assets/icons/icon-search.svg';
import PlusIcon from '../../assets/icons/icon-plus.svg';
import ArrowDownIcon from '../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../config/colors';
import {useIsFocused} from '@react-navigation/native';
import conversationService from '../../services/conversation';
import keys from '../../store/keys';
import session from '../../store/session';
import utils from '../../utils/utils';
import moment from 'moment';
import INBOXES from '../../constants/inboxes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../config/fonts';
import CampusContext from '../../CampusContext';
import Header from '../../user/component/Header';

/* =============================================================================
<InboxScreen />
============================================================================= */
const InboxScreen = () => {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');

  const insets = useSafeAreaInsets();

  const _safeAreaStyle = {
    paddingTop: insets.top,
    // minHeight: HEADER_HEIGHT + insets.top,
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused, keyword]);

  const reload = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;
    conversationService
      .getAll(session.get(keys.token), tokenData._id)
      .then(result => {
        let arr = result.data.data;
        if (keyword.length > 0) {
          arr = arr.filter(k =>
            k.title.toLowerCase().includes(keyword.toLowerCase()),
          );
        }
        arr = arr.sort((a, b) => moment(a.updated_at) - moment(b.updated_at));
        setRecords(arr);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  const {loginAsClub} = useContext(CampusContext);

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
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={[_safeAreaStyle, styles.headerContainer]}>
        <View horizontal justifyContent="space-between" alignItems="center">
          <Text size="big" family="bold" color={Colors.whiteText}>
            Chat
          </Text>
          <PlusIcon />
        </View>

        <View horizontal style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholder="Find your friends here"
            placeholderTextColor={Colors.black400}
            selectionColor={Colors.primary}
            style={styles.textInput}
            value={keyword}
            onChangeText={value => {
              setKeyword(value);
            }}
          />
        </View>
      </View>

      <FlatList
        data={INBOXES}
        // data={records}
        style={styles.list}
        renderItem={renderItem}
        // keyExtractor={item => item._id}
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
  );
};

const renderItem = ({item}) => <InboxListItem data={item} />;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  containerSearch: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.whiteText,
    marginTop: 7,
  },
  textInput: {
    paddingHorizontal: 8,
    backgroundColor: Colors.background,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
  },
});

export default InboxScreen;
