import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Container,
  Card,
  //   TextInput,
  Content,
  Button,
  View,
  Header,
  Select,
} from '../../../common';
import Text from '../../../common/TextV2';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import ArrowDownIcon from '../../../assets/icons/icon-arrow-down.svg';
import ArrowUpIcon from '../../../assets/icons/icon-arrow-up.svg';
import NotificationBellIcon from '../../../assets/icons/app-notification-bell.svg';
import * as Colors from '../../../config/colors';
import Fonts from '../../../config/fonts';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../../../common/Gap';

/* =============================================================================
<SearchScreen />
============================================================================= */
const SearchScreen = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const insets = useSafeAreaInsets();

  const _safeArea = {
    paddingTop: insets.top,
  };

  const _handleSearch = () => {
    setKeyword('');
    navigation.navigate('UserTab', {
      screen: 'Home',
      params: {keyword: keyword},
    });
  };

  const _moveToNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <Container backgroundColor={Colors.background}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={[styles.header, _safeArea]}>
        <Text color={Colors.background} family="bold" size="big">
          Search
        </Text>
      </View>

      {/* <Select data={['Major 1', 'Major 2']} label="Search" /> */}

      <View padding={16}>
        <Text size="big" family="semi">
          Search Category
        </Text>
        <Gap height={8} />
        <TouchableOpacity style={styles.containerSelect}>
          <Text color={Colors.black500} customStyle={{flex: 1}}>
            Select search category here
          </Text>
          <ArrowDownIcon />
        </TouchableOpacity>

        <Gap height={16} />

        <View horizontal style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholder="Type anything that you want to search"
            placeholderTextColor={Colors.black400}
            selectionColor={Colors.primary}
            style={styles.textInput}
          />
        </View>
      </View>

      {/* <Header
				title="Search"
				rightIcon={<NotificationBellIcon />}
				onRightPress={_moveToNotifications}
			/> */}

      {/* <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Content justifyContent="center" padding={20}>
          <Card style={styles.card}>
            <TextInput
              contentContainerStyle={styles.input}
              left={<SearchIcon />}
              right={<ArrowDownIcon />}
              label="Type a keyword to search"
              labelStyle={styles.smallLabel}
              placeholder="People"
              value={keyword}
              onChange={setKeyword}
            />

            <Select data={['Major 1', 'Major 2']} label="Search" />

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
      </KeyboardAvoidingView> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    padding: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
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
  containerSelect: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: Colors.white300,
  },
  containerSearch: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.whiteText,
    marginTop: 7,
    borderWidth: 1,
    borderColor: Colors.white300,
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: 8,
    backgroundColor: Colors.background,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
  },
});

export default SearchScreen;
