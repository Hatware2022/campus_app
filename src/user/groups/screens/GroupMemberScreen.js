import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Container, Content, Avatar} from '../../../common';
import Text from '../../../common/TextV2';

import UserImage from '../../../assets/images/user.png';

import * as Colors from '../../../config/colors';
import Header from '../../component/Header';
import Underline from '../../component/Underline';
import Gap from '../../../common/Gap';

/* =============================================================================
<GroupMemberScreen />
============================================================================= */
const GroupMemberScreen = () => {
  return (
    <Container>
      <Header title={'Group Member List'} />
      <Content padding={16}>
        <View style={styles.userDetails}>
          <Avatar source={UserImage} size={48} />
          <Text size="big" family="semi" customStyle={styles.textTitle}>
            Surf Up Group
          </Text>
        </View>

        <Underline marginVertical={16} />
        <View style={styles.containerMember}>
          <Avatar source={UserImage} size={38} />
          <View style={styles.contentTextMember}>
            <Text family="bold">Josh Adams</Text>
            <Gap height={4} />
            <Text size="small" color={Colors.black400}>
              joined since Jun 2022
            </Text>
          </View>
        </View>

        <View style={styles.containerMember}>
          <Avatar source={UserImage} size={38} />
          <View style={styles.contentTextMember}>
            <Text family="bold">Josh Adams</Text>
            <Gap height={4} />
            <Text size="small" color={Colors.black400}>
              joined since Jun 2022
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    marginHorizontal: 16,
  },

  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  contentTextMember: {
    marginHorizontal: 16,
  },
});

export default GroupMemberScreen;
