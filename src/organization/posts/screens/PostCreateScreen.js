import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, Pressable} from 'react-native';
import {
  View,
  Container,
  Content,
  Tag,
  Button,
  Touchable,
} from '../../../common';
import Text from '../../../common/TextV2';

import DemoImage from '../../../assets/images/empty-image.png';

import PlusIcon from '../../../assets/icons/icon-plus-red.svg';
import PictureIcon from '../../../assets/icons/icon-picture.svg';

import * as Colors from '../../../config/colors';
import Header from '../../../user/component/Header';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import TrashIcon from '../../../assets/icons/icon-trash-red.svg';

/* =============================================================================
<PostCreateScreen />
============================================================================= */
const PostCreateScreen = () => {
  const [tags, setTags] = useState([
    'Lost & Found',
    'Ride Share',
    'For Sale',
    'Question',
    'General',
    'Other',
  ]);
  const [valuePost, setValuePost] = useState('');
  const [tag, setTag] = useState(['']);
  const insets = useSafeAreaInsets();
  const [galleryImage, setGalleryImage] = useState(null);

  // const selectTag = useRef([]);

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  const takephotofromLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.3,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // empty action
      } else if (response.errorCode) {
        // empty action
      } else {
        const source = {
          uri: response.assets?.[0].uri,
        };
        setGalleryImage(source);
      }
    });
  };

  return (
    <Container>
      <Header title={'Create Post'} />
      <Content padding={16}>
        <Text family="semi">Post</Text>
        <View style={styles.containerPost}>
          <TextInput
            multiline
            placeholder="Write your post here"
            value={valuePost}
            onChangeText={value => {
              setValuePost(value);
            }}
          />
        </View>

        <Text family="semi">Add Image</Text>
        {galleryImage ? (
          <View style={styles.containerImage}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image}
              source={galleryImage}>
              <Touchable
                onPress={() => setGalleryImage(null)}
                style={styles.containerTrash}>
                <TrashIcon />
              </Touchable>
            </FastImage>
          </View>
        ) : (
          <Touchable
            style={styles.containerAddImage}
            onPress={takephotofromLibrary}>
            <PictureIcon />
            <Text color={Colors.black500} customStyle={styles.textAddImage}>
              Click to add image
            </Text>
            <PlusIcon />
          </Touchable>
        )}

        <Text family="semi">Add Tags</Text>

        <View horizontal marginTop={12} style={{flexWrap: 'wrap'}}>
          {tags.map((item, index) => {
            const isSelect = tag.includes(item);
            // console.log('selectTag', tag);
            // console.log('selectTagselectTag', selectTag.current);
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
          onPress={() => console.log('a')}
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
    borderWidth: 1,
    borderColor: Colors.white300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
  },
  containerAddImage: {
    borderWidth: 1,
    borderColor: Colors.white300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  image: {
    width: '100%',
    height: 220,
    alignItems: 'flex-end',
  },
  containerImage: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.black400,
  },
  containerTrash: {
    height: 32,
    width: 32,
    margin: 16,
    borderRadius: 32,
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostCreateScreen;
