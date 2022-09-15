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
import TrashIcon from '../../assets/icons/icon-trash-white.svg';
import * as Colors from '../../config/colors';
import {useIsFocused} from '@react-navigation/native';
import notificationService from '../../services/notification';
import session from '../../store/session';
import keys from '../../store/keys';
import Header from '../../user/component/Header';
import Underline from '../../user/component/Underline';
import ModalConfirm from '../../auth/components/Modal/modalconfirm';

/* =============================================================================
<DetailNotificationScreen />
============================================================================= */
const DetailNotificationScreen = () => {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [viewModal, setViewModal] = useState(false);

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <Header
        title={''}
        rightIcon={<TrashIcon />}
        onPressRightIcon={() => setViewModal(true)}
      />
      <Content padding={16}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.red300,
              height: 32,
              width: 32,
              borderRadius: 32,
            }}
          />
          <View flex={1} marginHorizontal={16}>
            <Text family="semi">Student Post</Text>
          </View>
          <View>
            <Text color={Colors.black400} size="small">
              2 Jun
            </Text>
          </View>
        </View>

        <Underline />

        <Text color={Colors.black500}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Content>

      <ModalConfirm
        titlemessage={'Are you sure want to delete this message?'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onYes={() => setViewModal(false)}
      />
    </Container>
  );
};

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

export default DetailNotificationScreen;
