import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from '../../../common';

import {useRoute} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../../component/Header';
import SavedList from '../component/SaveList';

/* =============================================================================
<SavedClubs />
============================================================================= */
const SavedClubs = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header title={'Saved Clubs'} />

      <Content paddingHorizontal={16}>
        <SavedList title={'Computer Club'} buttonTitle={'Exit Club'} />
        <SavedList title={'Judo Club'} buttonTitle={'Exit Club'} />
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    flex: 1,
  },
});

export default SavedClubs;
