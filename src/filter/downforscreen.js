import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Container, Content, View, Tag, Button} from '../common';
import Text from '../common/TextV2';

import * as Colors from '../config/colors';

import {useRoute} from '@react-navigation/native';

import SearchIcon from '../assets/icons/icon-search.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../common/Gap';

import Header from '../user/component/Header';
import Fonts from '../config/fonts';

const data = [
  'Road trips',
  'Skiing',
  'Snowboarding',
  'Festivals',
  'Sports',
  'Nights out',
  'Business',
  'Yoga',
  'Gym',
  'Surfing',
  'Content Creation',
  'Socializing',
  'Camping',
  'Exploring',
  'Art',
  'Gaming',
  'Startups',
  'Golf',
  'Entertainment',
];

/* =============================================================================
<DownForScreen />
============================================================================= */
const DownForScreen = () => {
  const [searchDownFor, setSearchDownFor] = useState('');
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  return (
    <Container>
      <Header title={'Down For'} />

      <Content padding={16}>
        <View style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Search for what are you down for"
            value={searchDownFor}
            onChangeText={value => {
              setSearchDownFor(value);
            }}
          />
        </View>

        <Gap height={16} />
        <Text family="semi">Add Tags</Text>
        <Gap height={12} />

        <View style={styles.containerContent}>
          {data.map(item => (
            <Tag
              text={item}
              //  selected={gradYear === '2023'}
              //  onPress={setGradYead}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                marginBottom: 12,
              }}
            />
          ))}
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Submit"
          onPress={() => console.log('a')}
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

export default DownForScreen;
