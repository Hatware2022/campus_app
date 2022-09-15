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

import DemoImage from '../../../assets/images/empty-image.png';

import PlusIcon from '../../../assets/icons/app-plus.svg';
import AddImageIcon from '../../../assets/icons/app-add-image.svg';

import * as Colors from '../../../config/colors';

/* =============================================================================
<PostCreateScreen />
============================================================================= */
const PostCreateScreen = () => {
  const [tags, setTags] = useState(['For Sale', 'For Sale', 'Text Books']);

  return (
    <Container>
      <StackHeader type="secondary" title="Create Post" />

      <Content padding={20} bottomSafeArea>
        <View style={styles.userDetails}>
          <Avatar source={DemoImage} size={56} />
          <Text marginHorizontal={10}>Comp Science</Text>
        </View>

        <View marginVertical={10}>
          <TextInput placeholder="Add title here" />
        </View>

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

        <Title type="h4">Text</Title>
        <TextArea placeholder="Add Text about event here" />

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
    marginBottom: 20,
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

export default PostCreateScreen;
