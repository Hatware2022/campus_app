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
const ClubDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <Container>
      <Header title={'Club Detail'} />
      <Content padding={16} bottomSafeArea>
        <View center>
          <Avatar source={UserImage} size={80} />
          <Gap height={8} />
          <Text size="big" family="semi">
            {item?.title}
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
              {item?.bio}
            </Text>
          </Card>
        </View>

        <Underline marginHorizontal={0} />

        <Text size="big" family="semi">
          Contact us
        </Text>
        <Gap height={16} />
        <Text>{item?.email}</Text>

        <Underline marginHorizontal={0} />

        <View>
          <Text size="big" family="semi">
            Tags
          </Text>
          <Gap height={16} />
          <View style={styles.tagContainer}>
            {item?.tags.map((item, index) => (
              <Tag key={index} text={item} />
            ))}
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
