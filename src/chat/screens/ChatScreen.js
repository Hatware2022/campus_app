import React, {useState, useEffect, useRef} from 'react'
import {Bubble, Day, GiftedChat, Message} from 'react-native-gifted-chat'
import {useRoute, useNavigation} from '@react-navigation/native'
import {Container, View, Avatar} from '../../common'
import {ActivityIndicator, ScrollView, RefreshControl} from 'react-native'
import Text from '../../common/TextV2'
import Composer from '../components/Chat/Composer'
import messageService from '../../services/message'
import {useIsFocused} from '@react-navigation/native'
import session from '../../store/session'
import keys from '../../store/keys'
import utils from '../../utils/utils'
import userService from '../../services/user'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet, TouchableOpacity} from 'react-native'
import * as Colors from '../../config/colors'
import BackIcon from '../../assets/icons/icon-back.svg'
import Gap from '../../common/Gap'
import Underline from '../../user/component/Underline'
import reactotron from 'reactotron-react-native'
import {io} from 'socket.io-client'

const renderMessage = props => {
  return <Message {...props} />
}
const renderDay = props => {
  return (
    <Day
      {...props}
      dateFormat="ddd, d MMM, YYYY HH:mm"
      textStyle={{color: '#373C3E', fontWeight: 'bold'}}
    />
  )
}

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#F1F3F4'
        },
        left: {
          backgroundColor: '#FAFAFA'
        }
      }}
      textStyle={{
        right: {
          color: '#373C3E'
        },
        left: {
          color: '#373C3E'
        }
      }}
    />
  )
}

/* =============================================================================
<ChatScreen />
============================================================================= */
const ChatScreen = ({}) => {
  const route = useRoute()
  const isFocused = useIsFocused()
  const chat = route.params.data || null
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [record, setRecord] = useState(null)
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const tokenData = utils.decodeJwt(session.get(keys.token))
  const [state, setState] = useState({
    isAppReady: false,
    isTyping: false
  })
  var socket = useRef()
  var chatRef = useRef()

  const _safeAreaStyle = {
    paddingTop: insets.top
  }

  const _handleSend = values => {
    setMessages(previousMessages => GiftedChat.append(values, previousMessages))
    setText('')
    const data = {
      conversationId: chat?.id,
      receiverId: chat.members.find(item => item.id !== record?.id),
      senderId: record?.id,
      text: values[0]?.text
    }
    socket.current.emit('sendMessage', data)
    messageService.create(session.get(keys.token), data)
    chatRef.current.scrollToBottom()
    reload()
  }

  useEffect(() => {
    if (isFocused) {
      setState({...state, isAppReady: true})

      socket.current = io('https://staging-api.bondo.app')
      socket.current.emit('addUser', tokenData?.id)
      setState({...state, isAppReady: false})
    }
  }, [isFocused])

  useEffect(() => {
    socket.current.on('getMessage', data => {
      reactotron.log('MESSAGE RECEIVED! LL:', data)
      // setMessages([{...data, _id: data?.senderId}, ...messages])
      chatRef.current.scrollToBottom()
      reload()
    })
  }, [])

  const reload = async () => {
    try {
      setState({...state, isAppReady: true})

      let temp = null
      const tokenData = utils.decodeJwt(session.get(keys.token))
      if (!chat || !tokenData) return
      userService
        .getById(session.get(keys.token), tokenData.id)
        .then(result => {
          if (result.data && result.data.success === true) {
            let r = result.data.data
            setRecord(r)
            temp = r
          }
        })
      messageService.getAll(session.get(keys.token), chat.id).then(result => {
        if (result.data && result.data.success === true) {
          let arr = result.data.data
          const finalArr = arr.map(item => {
            return {
              ...item,
              _id: item.id,
              user: {
                _id: item.senderId === temp?.id ? 1 : item.senderId
              }
            }
          })
          setMessages(finalArr)
        }
      })
    } catch (err) {
    } finally {
      setState({...state, isAppReady: false})
      setTimeout(() => {
        chatRef?.current?.scrollToBottom()
      }, 1500)
    }
  }

  useEffect(() => {
    if (isFocused) {
      reload()
    }
  }, [isFocused])

  const renderAvatar = props => {
    return (
      <Avatar
        {...props}
        size={40}
        source={chat?.imageUrl ? {uri: chat?.imageUrl} : null}
      />
    )
  }

  const onPressViewProfile = () => {
    navigation.navigate('ProfileDetails', {
      _id: chat?.id
    })
  }

  return (
    <Container backgroundColor="#FFFF">
      <View style={[_safeAreaStyle, styles.headerContainer]}>
        <View horizontal alignItems="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Avatar
            size={36}
            source={chat?.imageUrl ? {uri: chat?.imageUrl} : null}
            style={styles.avatar}
          />
          <Text size="big" family="semi" color={Colors.whiteText}>
            {chat?.senderName}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{flex: 1, height: '100%'}}
        refreshControl={
          <RefreshControl refreshing={state.isAppReady} onRefresh={reload} />
        }
      >
        <>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center'
            }}
          >
            <Avatar
              size={80}
              source={chat?.imageUrl ? {uri: chat?.imageUrl} : null}
              style={styles.avatarProfile}
            />
            <Gap height={12} />
            <Text size="big" family="semi">
              {chat?.senderName}
            </Text>
            <Gap height={12} />
            <TouchableOpacity
              style={styles.viewProfile}
              onPress={onPressViewProfile}
            >
              <Text size="big" family="semi" color={Colors.black500}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
          <Underline />
        </>
        <GiftedChat
          ref={chatRef}
          dateFormat="DD/MM/YYYY"
          renderUsernameOnMessage
          alwaysShowSend={false}
          scrollToBottom={true}
          messages={messages}
          user={{
            _id: 1,
            name: record?.name,
            avatar: record?.imageUrl
          }}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#F1F3F4" />
          )}
          textInputProps={{
            color: '#373C3E'
          }}
          keyboardShouldPersistTaps="never"
          renderDay={renderDay}
          renderAvatar={renderAvatar}
          renderMessage={renderMessage}
          renderBubble={renderBubble}
          minComposerHeight={60}
          renderInputToolbar={props => (
            <View style={{bottom: 0}}>
              <Composer {...props} text={text} onChange={setText} />
            </View>
          )}
          minInputToolbarHeight={60}
          onSend={_handleSend}
          inverted={false}
        />
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary
  },
  avatar: {
    marginHorizontal: 16
  },
  avatarProfile: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewProfile: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.black500
  },
  textDate: {
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default ChatScreen
