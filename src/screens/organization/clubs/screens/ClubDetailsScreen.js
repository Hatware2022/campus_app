import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
  Text,
  Card,
  Title,
  Tag,
} from '../../../common';

import UserImage from '../../../assets/images/user.png';

import SocialButtons from '../components/ClubDetails/SocialButtons';

import * as Colors from '../../../config/colors';

/* =============================================================================
<ClubDetailsScreen />
============================================================================= */
const ClubDetailsScreen = () => {
  return (
    <Container>
      <StackHeader backButton title="Club" />

      <Content paddingHorizontal={20} paddingVertical={30} bottomSafeArea>
        <View center>
          <Avatar source={UserImage} size={84} />
          <Text fontSize={14} marginVertical={10}>
            Computer Science
          </Text>

          <SocialButtons />
        </View>

        <View>
          <Title type="h4" marginVertical={10}>
            Bio
          </Title>
          <Card height={114}>
            <Text>
              Directions: Here is where you write a little bit more about what
              you desire to get out of your time at the Company.
            </Text>
          </Card>
        </View>

        <View style={styles.underline} />

        <View horizontal>
          <View flex={1} center>
            <Text fontFamily="Montserrat-SemiBold">Contact us</Text>
            <Text>Computerscie@gmail.com</Text>
          </View>
        </View>

        <View style={styles.underline} />

        <View>
          <Title type="h5" marginVertical={10}>
            Tags
          </Title>
          <View style={styles.tagContainer}>
            <Tag text="Business" style={styles.tag} />
            <Tag text="Hiking" style={styles.tag} />
            <Tag text="Reading" style={styles.tag} />
            <Tag text="Art" style={styles.tag} />
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
