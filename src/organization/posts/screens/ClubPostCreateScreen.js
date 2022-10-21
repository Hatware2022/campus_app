import React, {useState, useEffect} from 'react'
import {StyleSheet, TextInput, Pressable} from 'react-native'
import {View, Container, Content, Button, Touchable} from '../../../common'
import Text from '../../../common/TextV2'

import PlusIcon from '../../../assets/icons/icon-plus-red.svg'
import PictureIcon from '../../../assets/icons/icon-picture.svg'

import * as Colors from '../../../config/colors'
import Header from '../../../user/component/Header'
import clubService from '../../../services/club'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import {launchImageLibrary} from 'react-native-image-picker'
import TrashIcon from '../../../assets/icons/icon-trash-red.svg'
import session from '../../../store/session'
import keys from '../../../store/keys'
import {useNavigation} from '@react-navigation/native'

/* =============================================================================
<ClubPostCreateScreen />
============================================================================= */
const ClubPostCreateScreen = () => {
  const navigation = useNavigation()
  const [tags, setTags] = useState([
    {
      id: 1,
      checked: false,
      tag: 'Lost & Found'
    },
    {
      id: 2,
      checked: false,
      tag: 'Ride Share'
    },
    {
      id: 3,
      checked: false,
      tag: 'For Sale'
    },
    {
      id: 4,
      checked: false,
      tag: 'Question'
    },
    {
      id: 5,
      checked: false,
      tag: 'General'
    },
    {
      id: 6,
      checked: false,
      tag: 'Other'
    }
  ])
  const [valuePost, setValuePost] = useState('')
  const [tag, setTag] = useState([''])
  const insets = useSafeAreaInsets()
  const [galleryImage, setGalleryImage] = useState(null)
  const [clubList, setClubList] = useState([])
  const [club, setClub] = useState(null)

  const _safeArea = {
    marginBottom: 16 + insets.bottom
  }

  useEffect(() => {
    getClubList()
  }, [])

  const takephotofromLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.2,
      maxWidth: 500,
      maxHeight: 500
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        const source = {
          uri: response.assets?.[0].uri,
          file: response
        }
        setGalleryImage(source)
      }
    })
  }

  const handleTagCheck = e => {
    let temp = []
    tags.forEach((ele, i) => {
      e.id === ele.id
        ? temp.push({...ele, checked: !ele.checked})
        : temp.push(ele)
    })
    setTags(temp)
  }

  const handleSelectClub = e => {
    let temp = []
    clubList.forEach((ele, i) => {
      e.id === ele.id
        ? temp.push({...ele, checked: !ele.checked})
        : temp.push(ele)
    })
    setClubList(temp)
  }

  const _handleSubmit = () => {
    let file = galleryImage.file.assets[0]
    const formdatas = new FormData()
    let img = {
      type: file.type,
      name: file.fileName,
      uri: file.uri
    }
    formdatas.append('image', img)
    postService
      .uploadPostImage(session.get(keys.token), formdatas)
      .then(result => {
        if (result.data && result.data.success === true) {
          postApi(result.data.url)
        }
      })
  }

  const postApi = url => {
    let selectedTag = []
    tags.forEach(e => {
      e.checked ? selectedTag.push(e.club) : null
    })

    let selectedClub = []
    clubList.forEach(e => {
      console.log('eeeee', e)
      e.checked ? selectedClub.push(e) : null
    })

    console.log('selectedClub', selectedClub)

    if (selectedClub.length > 1) {
      alert('Please choose only one club')
      return
    }

    if (selectedClub.length === 0) {
      alert('Please choose a club')
      return
    }

    let data = {
      content: valuePost,
      tags: selectedTag,
      imageUrl: url,
      clubId: selectedClub[0].id
    }
    clubService.create(session.get(keys.token), data).then(result => {
      console.log(result)
      if (result.data && result.data.success === true) {
        navigation.goBack()
        props.reload()
      }
    })
  }

  const getClubList = async () => {
    clubService.getClubByUser(session.get(keys.token)).then(result => {
      const clubs = result.data.data
      if (clubs.length === 1) {
        setClubList([{...clubs[0], checked: true}])
      } else {
        setClubList(clubs)
      }
    })
  }

  return (
    <Container>
      <Header title={'Create a Club Post'} />
      <Content padding={16}>
        <Text family="semi">Choose a Club</Text>
        {clubList && (
          <View horizontal marginTop={12}>
            {clubList.map(item => {
              return (
                <>
                  <Pressable
                    onPress={() => {
                      handleSelectClub(item)
                    }}
                    style={
                      item.checked
                        ? styles.containerClubSelected
                        : styles.containerClub
                    }
                    key={item.id}
                    accessible={true}
                    accessibilityHint="Double tap to choose tag"
                  >
                    <Text
                      color={item.checked ? Colors.primary : Colors.black600}
                    >
                      {item.title}
                    </Text>
                  </Pressable>
                </>
              )
            })}
          </View>
        )}
        <Text family="semi">Post</Text>
        <View style={styles.containerPost}>
          <TextInput
            multiline
            placeholder="Write your post here"
            value={valuePost}
            onChangeText={value => {
              setValuePost(value)
            }}
          />
        </View>

        <Text family="semi">Add Image</Text>
        {galleryImage ? (
          <View style={styles.containerImage}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image}
              source={galleryImage}
            >
              <Touchable
                onPress={() => setGalleryImage(null)}
                style={styles.containerTrash}
              >
                <TrashIcon />
              </Touchable>
            </FastImage>
          </View>
        ) : (
          <Touchable
            style={styles.containerAddImage}
            onPress={takephotofromLibrary}
          >
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
            const isSelect = tag.includes(item)
            return (
              <>
                <Pressable
                  onPress={() => {
                    handleTagCheck(item)
                  }}
                  style={
                    item.checked
                      ? styles.containerTagActive
                      : styles.containerTag
                  }
                  key={index}
                  accessible={true}
                  accessibilityHint="Double tap to choose tag"
                >
                  <Text color={item.checked ? Colors.primary : Colors.black600}>
                    {item.tag}
                  </Text>
                </Pressable>
              </>
            )
          })}
        </View>
      </Content>

      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Submit"
          onPress={() =>
            galleryImage?.file?.assets?.[0] === undefined
              ? postApi('')
              : _handleSubmit()
          }
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addImageContainer: {
    width: '100%',
    height: 250,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card
  },
  tagContainer: {
    marginBottom: 20,
    flexDirection: 'row'
  },
  addTagButton: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postButton: {
    width: 107,
    height: 40,
    marginVertical: 10
  },
  containerPost: {
    borderWidth: 1,
    borderColor: Colors.white300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16
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
    alignItems: 'center'
  },
  textAddImage: {
    flex: 1,
    marginHorizontal: 10
  },
  containerTag: {
    borderWidth: 1,
    borderColor: Colors.black400,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12
  },
  containerTagActive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: Colors.red300
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300
  },
  button: {
    margin: 16
  },
  image: {
    width: '100%',
    height: 220,
    alignItems: 'flex-end'
  },
  containerImage: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.black400
  },
  containerTrash: {
    height: 32,
    width: 32,
    margin: 16,
    borderRadius: 32,
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clubContainer: {
    display: 'flex',
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  containerClub: {
    borderWidth: 1,
    borderColor: Colors.black400,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12
  },
  containerClubSelected: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: Colors.red300
  }
})

export default ClubPostCreateScreen
