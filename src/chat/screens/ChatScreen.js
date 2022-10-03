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
      dateFormat="ddd, d MMM, YYYY hh:mm"
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
  const [params, setParams] = useState({page: 1, perPage: 10})
  const tokenData = utils.decodeJwt(session.get(keys.token))
  const [state, setState] = useState({
    isRefreshing: false,
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
      userService
        .getById(session.get(keys.token), tokenData.id)
        .then(result => {
          if (result.data && result.data.success === true) {
            let r = result.data.data
            setRecord(r)
          }
        })
      socket.current = io('https://staging-api.bondo.app')
      socket.current.emit('addUser', tokenData?.id)
    }
  }, [isFocused])

  useEffect(() => {
    socket.current.on('getMessage', data => {
      reactotron.log('MESSAGE RECEIVED! LL:', data)
      chatRef.current.scrollToBottom()
      reload()
    })
  }, [])

  const reload = async () => {
    try {
      setState({...state, isRefreshing: true})

      const tokenData = utils.decodeJwt(session.get(keys.token))
      if (!chat || !tokenData) return
      const temp = {
        pagination: {
          page: params.page,
          perPage: params.perPage + 10
        }
      }
      setParams({page: params.page, perPage: params.perPage + 10})
      messageService
        .getAll(session.get(keys.token), chat.id, temp)
        .then(result => {
          if (result.data && result.data.success === true) {
            let arr = result.data.data
            const finalArr = arr.map(item => {
              return {
                ...item,
                _id: item.id,
                user: {
                  _id: item.senderId === tokenData?.id ? 1 : item.senderId
                }
              }
            })

            setMessages(finalArr)
          }
        })
    } catch (err) {
    } finally {
      setTimeout(() => {
        setState({...state, isRefreshing: false})
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
  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToTop = 10
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    )
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
          <RefreshControl refreshing={state.isRefreshing} onRefresh={reload} />
        }
        scrollEnabled={false}
      >
        <View>
          <View
            style={{
              paddingTop: 10,
              alignItems: 'center'
            }}
          >
            <Avatar
              size={80}
              source={chat?.imageUrl ? {uri: chat?.imageUrl} : null}
              style={styles.avatarProfile}
            />
            <Gap customStyle={{paddingVertical: 12}} />
            <Text size="big" family="semi">
              {chat?.senderName}
            </Text>
            <Gap customStyle={{paddingVertical: 12}} />
            <TouchableOpacity
              style={styles.viewProfile}
              onPress={onPressViewProfile}
            >
              <Text size="big" family="semi" color={Colors.black500}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <GiftedChat
          ref={chatRef}
          renderUsernameOnMessage
          alwaysShowSend={false}
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
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: ({nativeEvent}) => {
              if (isCloseToTop(nativeEvent)) {
                reload()
              }
            }
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
          inverted
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
