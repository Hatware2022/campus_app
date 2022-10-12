import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {
  Avatar,
  Container,
  Content,
  Button,
  View,
  Card,
  TagInput
} from '../../../common'
import Text from '../../../common/TextV2'
import SocialButtons from '../components/ProfileDetails/SocialButtons'
import * as Colors from '../../../config/colors'
import utils from '../../../utils/utils'
import {useRoute} from '@react-navigation/native'
import session from '../../../store/session'
import keys from '../../../store/keys'
import userService from '../../../services/user'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Gap from '../../../common/Gap'
import Header from '../../component/Header'
import conversationService from '../../../services/conversation'

/* =============================================================================
<ProfileDetailsScreen />
============================================================================= */
const ProfileDetailsScreen = ({navigation}) => {
  const route = useRoute()
  const [record, setRecord] = useState(null)
  const insets = useSafeAreaInsets()
  const tokenData = utils.decodeJwt(session.get(keys.token))
  const [existingConversationData, setExistingConversationData] = useState(null)
  useEffect(() => {
    const _id = route.params._id
    if (!_id) return
    userService.getById(session.get(keys.token), _id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data
        setRecord(r)
      }
    })
    conversationService
      .findConversationByIds(session.get(keys.token), tokenData.id, _id)
      .then(res => {
        if (res?.data?.success) {
          setExistingConversationData(res?.data?.data)
        }
      })
  }, [])

  const _safeArea = {
    marginBottom: 16 + insets.bottom
  }

  const onPressStartConversation = () => {
    const {fromScreen, setPreviousData, previousData} = route?.params || {}
    if (fromScreen === 'Chat' && previousData) {
      navigation.goBack()
      setPreviousData(previousData)
    }
    if (existingConversationData) {
      navigation.navigate('Chat', {
        data: existingConversationData
      })
    } else {
      const payload = {
        user1: tokenData?.id,
        user2: record?.id
      }
      conversationService.create(session.get(keys.token), payload).then(res => {
        if (res?.data?.success) {
          navigation.navigate('Chat', {
            data: res?.data?.data
          })
        }
      })
    }
  }

  return (
    <Container>
      <Header title={'Profile Detail'} />

      <Content bottomSafeArea paddingHorizontal={16} paddingVertical={16}>
        <View center>
          <Avatar
            source={{uri: record?.imageUrl ? record?.imageUrl : null}}
            size={80}
          />
          <Gap height={12} />
          <Text size="big" family="semi">
            {record?.name ? record?.name : 'Dummy'}
          </Text>
          <Gap height={16} />

          <SocialButtons data={record} />
        </View>

        <View
          borderWidth={1}
          borderColor={Colors.white300}
          marginHorizontal={-16}
          marginVertical={24}
        />

        <View>
          <Text family="semi" size="mediumLarge">
            Bio
          </Text>
          <Gap height={12} />
          <Card>
            <Text>{record?.bio ? record?.bio : 'This is dummy data'}</Text>
          </Card>
        </View>

        <View>
          <Card
            subCard
            leftTitle={'Major'}
            subContent={record?.major ? record?.major : 'Biologi'}
          />
          <Card
            subCard
            leftTitle={'Year'}
            subContent={record?.gradYear ? record?.gradYear : 'Junior'}
          />
          <Card
            subCard
            leftTitle={'Gender'}
            subContent={record?.gender ? record?.gender : 'Male'}
          />
          <Card
            subCard
            leftTitle={'From'}
            subContent={
              record?.address ? record?.address : 'dummy address, USA'
            }
          />

          <View
            borderWidth={1}
            borderColor={Colors.white300}
            marginVertical={24}
          />
        </View>

        <Text family="semi" size="mediumLarge">
          Interest
        </Text>
        {record?.interest && record?.interest.length > 0 ? (
          <TagInput label="Interests" tags={record?.interest} />
        ) : null}
        <Gap height={12} />

        <View
          borderWidth={1}
          borderColor={Colors.white300}
          marginVertical={24}
        />

        <Text family="semi" size="mediumLarge">
          Up For
        </Text>
        {record?.downFor && record?.downFor.length > 0 ? (
          <TagInput label="Interests" tags={record?.downFor} />
        ) : null}
        <Gap height={12} />
      </Content>

      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Start Conversation"
          onPress={onPressStartConversation}
        />
      </View>
    </Container>
  )
}
const styles = StyleSheet.create({
  underline: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Colors.border
  },
  tagContainer: {
    flexDirection: 'row'
  },
  tag: {
    minWidth: 80,
    marginRight: 8,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderColor: Colors.card,
    backgroundColor: Colors.card
  },
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary
  },
  iconBack: {
    marginRight: 16
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300
  },
  button: {
    margin: 16
  }
})

export default ProfileDetailsScreen
