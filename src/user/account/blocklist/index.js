import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from '../../../common';

import {useRoute} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../../component/Header';
import SavedList from '../component/SaveList';

/* =============================================================================
<BlockList />
============================================================================= */
const BlockList = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header title={'Block List'} />

      <Content paddingHorizontal={16}>
        <SavedList title={'Adam Smith'} buttonTitle={'Unblock'} />
        <SavedList title={'Angela Belli'} buttonTitle={'Unblock'} />
        <SavedList title={'Jacklyn Monroe'} buttonTitle={'Unblock'} />
        <SavedList title={'Josh Adam'} buttonTitle={'Unblock'} />
        <SavedList title={'Raka Mock Name'} buttonTitle={'Unblock'} />
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

export default BlockList;
