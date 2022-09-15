import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {
  Container,
  Content,
  StackHeader,
  View,
  Button,
  Touchable,
  Text,
} from '../../../common';

import * as Colors from '../../../config/colors';

/* =============================================================================
<OrganizationNotificationSettingsScreen/>
============================================================================= */
const OrganizationNotificationSettingsScreen = () => {
  const [joinGroup, setJoinGroup] = useState(true);
  const [mainChat, setMainChat] = useState(false);
  const [allEvent, setAllEvent] = useState(true);
  const [directMessage, setDirectMessage] = useState(false);

  return (
    <Container>
      <StackHeader type="secondary" title="Notification" />

      <Content padding={20} alignItems="center">
        <Text style={styles.title}>Notification settings</Text>

        <View style={styles.form}>
          <Touchable
            style={styles.listItem}
            onChange={() => setJoinGroup(!joinGroup)}>
            <Switch
              value={joinGroup}
              ios_backgroundColor={Colors.background}
              trackColor={{false: Colors.card, true: Colors.primary}}
              thumbColor={joinGroup ? Colors.card : Colors.primary}
              onChange={() => setJoinGroup(!joinGroup)}
            />
            <Text style={styles.text}>Joined Groups</Text>
          </Touchable>

          <Touchable
            style={styles.listItem}
            onChange={() => setMainChat(!mainChat)}>
            <Switch
              value={mainChat}
              ios_backgroundColor={Colors.background}
              trackColor={{false: Colors.card, true: Colors.primary}}
              thumbColor={mainChat ? Colors.card : Colors.primary}
              onChange={() => setMainChat(!mainChat)}
            />
            <Text style={styles.text}>Main Chat</Text>
          </Touchable>

          <Touchable
            style={styles.listItem}
            onChange={() => setAllEvent(!allEvent)}>
            <Switch
              value={allEvent}
              ios_backgroundColor={Colors.background}
              trackColor={{false: Colors.card, true: Colors.primary}}
              thumbColor={allEvent ? Colors.card : Colors.primary}
              onChange={() => setAllEvent(!allEvent)}
            />
            <Text style={styles.text}>All Events</Text>
          </Touchable>

          <Touchable
            style={styles.listItem}
            onChange={() => setDirectMessage(!directMessage)}>
            <Switch
              value={directMessage}
              ios_backgroundColor={Colors.background}
              trackColor={{false: Colors.card, true: Colors.primary}}
              thumbColor={directMessage ? Colors.card : Colors.primary}
              onChange={() => setDirectMessage(!directMessage)}
            />
            <Text style={styles.text}>Direct Messages</Text>
          </Touchable>
        </View>

        <View center marginVertical={20}>
          <Button width={207} height={51} title="Changes are saved!" />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
  },
  form: {
    marginVertical: 30,
  },
  listItem: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
  },
});

export default OrganizationNotificationSettingsScreen;
