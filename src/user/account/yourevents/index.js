import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
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
import FastImage from 'react-native-fast-image';
import MockImage from '../../../assets/images/mock-your-event.png';
import Underline from '../../../user/component/Underline';

/* =============================================================================
<SavedGroups />
============================================================================= */
const YourEvents = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header title={'Your Event'} />

      <Content padding={16}>
        {/* this soon create to component and mapping  */}

        <View horizontal alignItems={'center'}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={MockImage}
          />
          <View flex={1} marginHorizontal={16}>
            <Text customStyle={{marginBottom: 8}}>
              North Orange County Computer Meetings (NOCCC)
            </Text>
            <Text size="small">
              host by <Text family="semi">Computer Science</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: Colors.white200,
              borderRadius: 8,
            }}>
            <Text family="semi" size="big" color={Colors.primary}>
              RSVP
            </Text>
          </TouchableOpacity>
        </View>

        <Underline />

        <View horizontal alignItems={'center'}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={MockImage}
          />
          <View flex={1} marginHorizontal={16}>
            <Text customStyle={{marginBottom: 8}}>New Electric Car Show</Text>
            <Text size="small">
              host by <Text family="semi">Computer Science</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: Colors.white200,
              borderRadius: 8,
            }}>
            <Text family="semi" size="big" color={Colors.primary}>
              RSVP
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 62,
    borderRadius: 8,
  },
});

export default YourEvents;
