import React, {useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'

import {View, Container, Content, Avatar, Button} from '../../../common'
import Text from '../../../common/TextV2'

import groupPostService from '../../../services/grouppost'
import session from '../../../store/session'
import keys from '../../../store/keys'

import * as Colors from '../../../config/colors'
import Header from '../../component/Header'
import Underline from '../../component/Underline'
import Gap from '../../../common/Gap'
import Fonts from '../../../config/fonts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

/* =============================================================================
<GroupCreateScreen />
============================================================================= */
const GroupCreateScreen = () => {
  const [valuePost, setValuePost] = useState('')
  const route = useRoute()
  const navigation = useNavigation()
  const {groupDetails} = route.params

  const insets = useSafeAreaInsets()

  const _safeArea = {
    marginBottom: 16 + insets.bottom
  }

  const handlePost = () => {
    try {
      groupPostService
        .add(
          session.get(keys.token),
          JSON.stringify({
            content: valuePost,
            groupId: groupId,
            tags: []
          })
        )
        .then(_res => {
          navigation.pop()
        })
    } catch (error) {}
  }

  return (
    <Container>
      <Header title={'Create Post'} />
      <Content padding={16}>
        <View style={styles.userDetails}>
          <Avatar source={groupDetails?.imageUrl} size={48} />
          <Text size="big" family="semi" customStyle={styles.textTitle}>
            {groupDetails?.title}
          </Text>
        </View>

        <Underline marginVertical={16} />
        <Gap height={8} />
        <Text family="semi">Post</Text>

        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor={Colors.black400}
            selectionColor={Colors.black600}
            style={styles.input}
            multiline
            placeholder="Write your post here"
            value={valuePost}
            onChangeText={value => {
              setValuePost(value)
            }}
          />
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Send"
          onPress={handlePost}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    marginHorizontal: 16
  },
  input: {
    marginHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600
  },
  containerInput: {
    padding: 16,
    backgroundColor: Colors.white200,
    borderRadius: 8,
    justifyContent: 'center'
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300
  },
  button: {
    margin: 16
  },
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
    marginBottom: 10,
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
  }
})

export default GroupCreateScreen
