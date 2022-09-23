import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, Pressable,FlatList} from 'react-native';
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
import postService from '../../../services/post';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import TrashIcon from '../../../assets/icons/icon-trash-red.svg';
import session from '../../../store/session';
import keys from '../../../store/keys';
import {useNavigation} from '@react-navigation/native';

/* =============================================================================
<PostCreateScreen />
============================================================================= */
const PostCreateScreen = () => {
  const navigation = useNavigation();
  const [tags, setTags] = useState([
    {
      id:1,
      checked:false,
      tag:'Lost & Found'
    },
    {
      id:2,
      checked:false,
      tag:'Ride Share'
    },
    {
      id:3,
      checked:false,
      tag:'For Sale'
    },
    {
      id:4,
      checked:false,
      tag:'Question'
    },
    {
      id:5,
      checked:false,
      tag:'General'
    },
    {
      id:6,
      checked:false,
      tag:'Other'
    },
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

  const handleTagCheck =(e)=>{
    let temp =[]
    tags.forEach((ele,i)=>{
      e.id === ele.id ? temp.push({...ele,checked:!ele.checked}) : temp.push(ele)
    })
    setTags(temp)
  }

  const _handleSubmit =() => {
    const formdatas = new FormData();
    formdatas.append("image", galleryImage.uri);
    postService
    .uploadPostImage(session.get(keys.token), formdatas)
    .then(result => {
      // alert(JSON.stringify(result))
      if (result.data && result.data.success === true) {
        navigation.goBack()
        props.reload();
      }
    });
    
    let selectedTag=[]
    tags.forEach((e)=>{
      e.checked ? selectedTag.push(e.tag): null
    })
    let data ={
      "content" :valuePost,
      "tags": selectedTag,
      "imageUrl": galleryImage?.uri
    }
    postService
    .create(session.get(keys.token), data)
    .then(result => {
      alert(JSON.stringify(result?.data.code))
      if (result.data && result.data.success === true) {
        navigation.goBack()
        props.reload();
      }
    });
  }

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
         
          {/* <FlatList
                    data={tags}
                    style={styles.list}
                    renderItem={({ item, index }) => {
                       const isSelect = tag.includes(item);
                      return(
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
                      )}}
                    // scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                  /> */}
          {tags.map((item, index) => {
            const isSelect = tag.includes(item);
            // console.log('selectTag', tag);
            // console.log('selectTagselectTag', selectTag.current);
            return (
              <>
                <Pressable
                  onPress={() => {
                    handleTagCheck(item)
                    // tag.push(item);
                    // setTag(tag);
                  }}
                  style={
                    item.checked ? styles.containerTagActive : styles.containerTag
                  }
                  key={index}>
                  <Text color={item.checked ? Colors.primary : Colors.black600}>
                    {item.tag}
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
          onPress={() => _handleSubmit()}
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
