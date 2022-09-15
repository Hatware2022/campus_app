import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  View,
  Card,
  Title,
  Tag,
} from '../../../common';
import Text from '../../../common/TextV2';

import UserImage from '../../../assets/images/user.png';

import SocialButtons from '../components/ClubDetails/SocialButtons';

import * as Colors from '../../../config/colors';
import Header from '../../../user/component/Header';
import Gap from '../../../common/Gap';
import Underline from '../../../user/component/Underline';

/* =============================================================================
<ClubDetailsScreen />
============================================================================= */
const ClubDetailsScreen = () => {
  return (
    <Container>
      <Header title={'Club Detail'} />
      <Content padding={16} bottomSafeArea>
        <View center>
          <Avatar source={UserImage} size={80} />
          <Gap height={8} />
          <Text size="big" family="semi">
            Computer Science
          </Text>

          <SocialButtons />
        </View>

        <Underline />

        <View>
          <Text size="big" family="semi">
            Bio
          </Text>

          <Gap height={12} />

          <Card>
            <Text>
              Directions: Here is where you write a little bit more about what
              you desire to get out of your time at the Company.
            </Text>
          </Card>
        </View>

        <Underline marginHorizontal={0} />

        <Text size="big" family="semi">
          Contact us
        </Text>
        <Gap height={16} />
        <Text>Computerscie@gmail.com</Text>

        <Underline marginHorizontal={0} />

        <View>
          <Text size="big" family="semi">
            Tags
          </Text>
          <Gap height={16} />
          <View style={styles.tagContainer}>
            <Tag text="Business" size="medium" />
            <Tag text="Hiking" size="medium" />
            <Tag text="Reading" size="medium" />
            <Tag text="Art" size="medium" />
          </View>
        </View>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  underline: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Colors.border,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    minWidth: 80,
    marginRight: 8,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderColor: Colors.card,
    backgroundColor: Colors.card,
  },
});

export default ClubDetailsScreen;
