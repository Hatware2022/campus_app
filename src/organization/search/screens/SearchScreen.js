import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {
  Container,
  Card,
  TextInput,
  Content,
  Button,
  View,
  Header,
} from '../../../common';

import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import NotificationBellIcon from '../../../assets/icons/app-notification-bell.svg';

import * as Colors from '../../../config/colors';
import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<SearchScreen />
============================================================================= */
const SearchScreen = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');

  const _handleSearch = () => {
    setKeyword('');
    navigation.navigate('OrganizationTab', {
      screen: 'Home',
      params: {keyword: keyword},
    });
  };

  const _moveToNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <Container backgroundColor={Colors.primary}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <Header
        title="Search"
        rightIcon={<NotificationBellIcon />}
        onRightPress={_moveToNotifications}
      />

      <Content justifyContent="center" padding={20}>
        <Card style={styles.card}>
          <TextInput
            contentContainerStyle={styles.input}
            left={<SearchIcon />}
            right={<ArrowDownIcon />}
            label="Type a keyword to search"
            labelStyle={styles.smallLabel}
            placeholder="Posts"
            value={keyword}
            onChange={setKeyword}
          />

          <View center>
            <Button
              shadow
              title="Search"
              onPress={_handleSearch}
              style={styles.button}
            />
          </View>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  smallLabel: {
    fontSize: 15,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    width: '85%',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default SearchScreen;
