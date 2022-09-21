import React, {useState} from 'react';
import {StyleSheet, TextInput, Pressable} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {View, Container, Content, Tag, Button} from '../../../common';
import Text from '../../../common/TextV2';
import groupService from '../../../services/group';
import session from '../../../store/session';
import keys from '../../../store/keys';

import DemoImage from '../../../assets/images/empty-image.png';

import PlusIcon from '../../../assets/icons/icon-plus-red.svg';
import PictureIcon from '../../../assets/icons/icon-picture.svg';

import * as Colors from '../../../config/colors';
import Header from '../../../user/component/Header';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<GroupNewScreen />
============================================================================= */
const GroupNewScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [tags, setTags] = useState([
    'Lost & Found',
    'Ride Share',
    'For Sale',
    'Question',
    'General',
    'Other',
  ]);
  const [groupName, setGroupName] = useState('');
  const [tag, setTag] = useState(['']);
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    groupService.create(session.get(keys.token), JSON.stringify({
      "title": groupName,
      "members": [],
      "type": "public",
      "description": "Vanilla group"
    })).then((res) => {
      const {data} = res;
      if(data?.success) {
        navigation.pop();
      }
    }).catch((_err) => {})
  }

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  return (
    <Container>
      <Header title={'Create New Group'} />
      <Content backgroundColor={Colors.white100} padding={16}>
        <Text family="semi">Group Name</Text>
        <View style={styles.containerPost}>
          <TextInput
            multiline
            placeholder="Write your group name here"
            value={groupName}
            onChangeText={value => {
              setGroupName(value);
            }}
          />
        </View>

        <Text family="semi">Profile Picture</Text>
        <View style={styles.containerAddImage}>
          <PictureIcon />
          <Text color={Colors.black500} customStyle={styles.textAddImage}>
            Click to add image
          </Text>
          <PlusIcon />
        </View>

        <Text family="semi">Add Tags</Text>

        <View horizontal marginTop={12} style={{flexWrap: 'wrap'}}>
          {tags.map((item, index) => {
            const isSelect = tag.includes(item);
            return (
              <>
                <Pressable
                  onPress={() => {
                    tag.push(item);
                    setTag(tag);
                  }}
                  style={
                    isSelect ? styles.containerTagActive : styles.containerTag
                  }
                  key={index}>
                  <Text color={isSelect ? Colors.primary : Colors.black600}>
                    {item}
                  </Text>
                </Pressable>
              </>
            );
          })}
        </View>
      </Content>

      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Submit"
          onPress={handleSubmit}
        />
      </View>
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
  containerPost: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: Colors.white200,
  },
  containerAddImage: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white200,
  },
  textAddImage: {
    flex: 1,
    marginHorizontal: 10,
  },
  containerTag: {
    borderWidth: 1,
    borderColor: Colors.black400,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12,
  },
  containerTagActive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: Colors.red300,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
});

export default GroupNewScreen;
