import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, RefreshControl} from 'react-native';
import {
  Container,
  StackHeader,
  TextInput,
  View,
  Title,
  Touchable,
  Content,
} from '../../common';
import Text from '../../common/TextV2';
import InboxListItem from '../components/Inbox/NotificationListItem';
import SearchIcon from '../../assets/icons/app-search.svg';
import * as Colors from '../../config/colors';
import {useIsFocused} from '@react-navigation/native';
import notificationService from '../../services/notification';
import session from '../../store/session';
import keys from '../../store/keys';
import Header from '../../user/component/Header';
import Underline from '../../user/component/Underline';
import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<NotificationsScreen />
============================================================================= */
const NotificationsScreen = () => {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');

  const navigation = useNavigation();

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
    notificationService.getAll(session.get(keys.token)).then(result => {
      let arr = result.data.data;
      if (keyword.length > 0) {
        arr = arr.filter(k => k.bio.includes(keyword));
      }

      setRecords(arr);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <Header title={'Notification'} />
      <Content padding={16}>
        <Touchable
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('DetailNotification')}>
          <View
            style={{
              backgroundColor: Colors.red300,
              height: 32,
              width: 32,
              borderRadius: 32,
            }}
          />
          <View flex={1} marginHorizontal={16} justifyContent="center">
            <Text family="semi">Student Post</Text>
            <Text size="small" color={Colors.black500}>
              Snipped of notification
            </Text>
          </View>
          <View>
            <Text color={Colors.black400} size="small">
              2 Jun
            </Text>
          </View>
        </Touchable>

        <Underline />

        <Touchable style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: Colors.red300,
              height: 32,
              width: 32,
              borderRadius: 32,
            }}
          />
          <View flex={1} marginHorizontal={16} justifyContent="flex-start">
            <Text family="semi">Student Post</Text>
            <Text size="small" color={Colors.black500}>
              Snipped of notification
            </Text>
          </View>
          <View>
            <Text
              color={Colors.black400}
              size="small"
              customStyle={styles.textDate}>
              2 Jun
            </Text>
            <View style={styles.dotNotif} />
          </View>
        </Touchable>
        <Underline />
      </Content>

      {/* <FlatList
        data={records}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
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
      /> */}
    </Container>
  );
};

const renderItem = ({item}) => <InboxListItem data={item} />;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
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
  dotNotif: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDate: {
    justifyContent: 'flex-start',
  },
});

export default NotificationsScreen;
