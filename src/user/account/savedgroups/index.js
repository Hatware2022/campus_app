import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
  Card,
  Title,
  Tag,
  Touchable,
  TagInput,
  Button,
} from '../../../common';
import Text from '../../../common/TextV2';
import UserImage from '../../../assets/images/user.png';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import {useRoute} from '@react-navigation/native';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import BackIcon from '../../../assets/icons/icon-back.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../../../common/Gap';
import Header from '../../component/Header';
import SavedList from '../component/SaveList';

/* =============================================================================
<SavedGroups />
============================================================================= */
const SavedGroups = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header title={'Saved Groups'} />

      <Content paddingHorizontal={16}>
        <SavedList title={'Real Estate'} buttonTitle={'Leave Group'} />
        <SavedList title={'Real Estate'} buttonTitle={'Leave Group'} />
        <SavedList title={'Real Estate'} buttonTitle={'Leave Group'} />
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

export default SavedGroups;
