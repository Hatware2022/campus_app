import React, {useState, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {Touchable, View, Avatar} from '../../../common'
import Text from '../../../common/TextV2'
import * as Colors from '../../../config/colors'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import utils from '../../../utils/utils'
import session from '../../../store/session'
import keys from '../../../store/keys'
import userService from '../../../services/user'
import Gap from '../../../common/Gap'
import reactotron from 'reactotron-react-native'

/* =============================================================================
<InboxListItem />
============================================================================= */
const InboxListItem = ({data}) => {
  const navigation = useNavigation()
  const [record, setRecord] = useState(null)

  useEffect(() => {
    const tokenData = utils.decodeJwt(session.get(keys.token))
    if (!tokenData) return
    let otherUser = data.members.find(k => k !== tokenData.id)
    if (!otherUser) return
    userService.getById(session.get(keys.token), otherUser).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data
        setRecord(r)
      }
    })
  }, [])

  const _moveToChat = () => {
    navigation.navigate('Chat', {data, imageUrl: record?.imageUrl})
  }
  reactotron.log('data!! : ', record)

  return (
    <Touchable onPress={_moveToChat} style={styles.container}>
      <Avatar
        size={48}
        source={record?.imageUrl ? {uri: record?.imageUrl} : null}
      />
      <View style={styles.centerContainer}>
        <View horizontal alignItems="center" justifyContent="space-between">
          <Text size="big" family="semi">
            {data?.senderName}
          </Text>
          <Text size="small" color={Colors.black400}>
            {`${moment(data?.updatedAt).format('DD MMM')}`}
          </Text>
        </View>

        <Gap height={4} />
        <Text numberOfLines={1} color={Colors.black500}>
          {data?.latestMessage}
        </Text>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerContainer: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 18
  },
  message: {
    marginTop: 3,
    color: Colors.secondaryText
  },
  rightContainer: {
    height: 20
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText
  }
})

export default InboxListItem
