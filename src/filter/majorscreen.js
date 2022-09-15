import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Container, Content, View, Tag, Button} from '../common';
import Text from '../common/TextV2';

import * as Colors from '../config/colors';

import {useRoute, useNavigation} from '@react-navigation/native';

import SearchIcon from '../assets/icons/icon-search.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../common/Gap';

import Header from '../user/component/Header';
import Fonts from '../config/fonts';

/* =============================================================================
<MajorScreen />
============================================================================= */
const MajorScreen = () => {
  const [majordata, setMajordata] = useState([
    'Business admin',
    'Film / Video production',
    'Psychology',
    'Corporate communications',
    'Speech communication',
    'Business',
    'Health services admin',
    'Political science',
    'Public relations',
    'Accounting',
    'Economics',
    'Education',
    'Biology',
    'Playwriting',
    'Sociology',
  ]);
  const [searchMajor, setSearchMajor] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [valuemajor, setValuemajor] = useState('');

  console.log('route', route);

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  const _handleSubmitMajor = () => {
    navigation.navigate('UserTab', {
      activatemodal: true,
      majorValue: valuemajor,
    });
  };

  return (
    <Container>
      <Header title={'Major'} />

      <Content padding={16}>
        <View style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Search for which major"
            value={searchMajor}
            onChangeText={value => {
              setSearchMajor(value);
            }}
          />
        </View>

        <Gap height={16} />
        <Text family="semi">Add Tags</Text>
        <Gap height={12} />

        <View style={styles.containerContent}>
          {majordata.map(item => (
            <Tag
              key={item}
              text={item}
              selected={valuemajor === item}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                marginBottom: 12,
              }}
              onPress={() => setValuemajor(item)}
            />
          ))}
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Submit"
          onPress={_handleSubmitMajor}
        />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    flex: 1,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
  containerContent: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  containerSearch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  input: {
    marginHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
  },
});

export default MajorScreen;
