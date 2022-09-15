import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Container,
  StackHeader,
  Content,
  Avatar,
  TextInput,
  TextArea,
  Touchable,
  Title,
  Tag,
  Button,
} from '../../../common';

import UserImage from '../../../assets/images/user.png';

import PlusIcon from '../../../assets/icons/app-plus.svg';
import AddImageIcon from '../../../assets/icons/app-add-image.svg';

import * as Colors from '../../../config/colors';

/* =============================================================================
<GroupCreateScreen />
============================================================================= */
const GroupCreateScreen = () => {
  const [tags, setTags] = useState(['For Sale', 'Partying', 'Surfing']);

  return (
    <Container>
      <StackHeader type="secondary" title="Create Group" />

      <Content bottomSafeArea padding={20}>
        <View style={styles.userDetails}>
          <Avatar source={UserImage} size={56} />
          <Text marginHorizontal={10}>Angela Belli</Text>
        </View>

        <TextInput placeholder="Add title here" />

        <Touchable style={styles.addImageContainer}>
          <AddImageIcon />
          <Text marginVertical={10} fontSize={15}>
            Add Image
          </Text>
        </Touchable>

        <Title marginVertical={10} type="h4">
          Choose Tags
        </Title>

        <View style={styles.tagContainer}>
          {tags.map((item, index) => (
            <Tag selected text={item} key={index} />
          ))}

          <Touchable style={styles.addTagButton}>
            <PlusIcon />
          </Touchable>
        </View>

        <Title marginVertical={10} type="h4">
          About
        </Title>
        <TextArea placeholder="Add text about event here" />

        <Button title="Post" style={styles.postButton} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImageContainer: {
    width: '100%',
    height: 250,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  tagContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  addTagButton: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    width: 107,
    height: 40,
    marginVertical: 10,
  },
});

export default GroupCreateScreen;
