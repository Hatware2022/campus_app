import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  View,
  Card,
  Text,
  Container,
  StackHeader,
  Content,
  Avatar,
  Title,
  Tag,
  Button,
} from '../../../common';

import MemberList from '../components/EventDetails/MemberList';

import UserImage from '../../../assets/images/user.png';

import {useRoute} from '@react-navigation/native';

/* =============================================================================
<EventDetailsScreen />
============================================================================= */
const EventDetailsScreen = () => {
  const route = useRoute();

  const data = route.params?.data || {};

  return (
    <Container>
      <StackHeader type="secondary" title="Event" />

      <Content padding={20} bottomSafeArea>
        <View style={styles.userContainer}>
          <Avatar size={56} source={UserImage} />
          <Text style={styles.name}>{data?.user?.name}</Text>
        </View>

        <View marginVertical={10}>
          <Text>
            {data.title}{' '}
            <Text fontFamily="Montserrat-SemiBold">{data.meeting}</Text>
          </Text>
        </View>

        <Image source={data.image} style={styles.image} />

        <View style={styles.tagContainer}>
          <Tag text="For Sale" selected />
          <Tag text="Text Books" selected />
        </View>

        <View marginVertical={10}>
          <Title type="h4">About</Title>
          <Card>
            <Text>
              Join us today at so and so and where and where to enjoy what and
              what Join us today at so and so and where and where to enjoy what
              and what Join us today at so and so and where and where to enjoy
              what and what
            </Text>
          </Card>
        </View>

        <View marginVertical={10}>
          <Title type="h4">When</Title>
          <Card>
            <Text>July 21 at 7 pm</Text>
          </Card>
        </View>

        <View marginVertical={10}>
          <Title type="h4">Where</Title>
          <Card>
            <Text>215 E Elmont ave</Text>
          </Card>
        </View>

        <View marginVertical={10}>
          <Title type="h4">Attending</Title>

          <MemberList />
        </View>

        <Button style={styles.button} title="RSVP" />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 249,
    borderRadius: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 90,
    height: 31,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default EventDetailsScreen;
