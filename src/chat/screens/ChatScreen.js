import React, {useState, useEffect, useRef} from 'react'
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import {useRoute, useNavigation} from '@react-navigation/native'
import {Container, View, Avatar} from '../../common'
import {ActivityIndicator} from 'react-native'
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
import BackIcon from '../../assets/icons/icon-back-black.svg'
import InfoIcon from '../../assets/icons/info-circle-black.svg'
import reactotron from 'reactotron-react-native'
import {io} from 'socket.io-client'
import moment from 'moment'

const renderBubble = props => {
  const currentMessage = props.currentMessage
  const tokenData = utils.decodeJwt(session.get(keys.token))
  return (
    <View style={styles.bubbleContainer}>
      {currentMessage.senderId !== tokenData.id && (
        <>
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#FAFAFA'
              }
            }}
            textStyle={{
              left: {
                fontFamily: 'SFProDisplay-Regular',
                color: '#373C3E'
              }
            }}
          />
          <Text customStyle={styles.messageTimeSender}>
            {moment(props.currentMessage.createdAt).format('LT')}
          </Text>
        </>
      )}
      {currentMessage.senderId === tokenData.id && (
        <>
          <Bubble
            {...props}
            textStyle={{
              right: {
                fontFamily: 'SFProDisplay-Regular',
                color: '#FFF'
              }
            }}
          />
          <Text customStyle={styles.messageTime}>
            {moment(props.currentMessage.createdAt).format('LT')}
          </Text>
        </>
      )}
    </View>
  )
}
/* =============================================================================
<ChatScreen />
============================================================================= */
const ChatScreen = ({}) => {
  const route = useRoute()
  const isFocused = useIsFocused()
  const [chat, setChatData] = useState(route.params.data || null)
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
    setMessages(previousMessages => GiftedChat.append(previousMessages, values))
    setText('')
    const data = {
      conversationId: chat?.id,
      receiverId: chat.members.find(item => item !== record.id),
      senderId: record?.id,
      text: values[0]?.text
    }
    socket.current.emit('sendMessage', data)
    messageService.create(session.get(keys.token), data)
    chatRef.current.scrollToBottom()
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
      if (!chat || !tokenData) {
        return
      }
      const temp = {
        pagination: {
          page: params.page,
          perPage: params.perPage + 10
        }
      }
      setParams({page: params.page, perPage: params.perPage + 10})
      if (chat.id) {
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
      }
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

  const onPressViewProfile = () => {
    navigation.navigate('ProfileDetails', {
      _id: chat.members.find(item => item !== record?.id),
      setPreviousData: setChatData,
      previousData: chat,
      fromScreen: 'Chat'
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
        <View horizontal justifyContent="space-between" alignItems="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={onPressViewProfile}
          >
            <Avatar
              size={36}
              source={chat?.imageUrl ? {uri: chat?.imageUrl} : null}
              style={styles.avatar}
            />
            <Text
              size="medium"
              family="SFProDisplay-Regular"
              color={Colors.black600}
              customStyle={{paddingTop: 2}}
            >
              {chat?.senderName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <InfoIcon />
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        ref={chatRef}
        alwaysShowSend={false}
        messages={messages}
        user={{
          _id: 1,
          name: record?.name,
          avatar: record?.imageUrl
        }}
        renderLoading={() => <ActivityIndicator size="large" color="#F1F3F4" />}
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
        loadEarlier={state.isRefreshing}
        onLoadEarlier={reload}
        isLoadingEarlier={state.isRefreshing}
        renderTime={() => <></>}
        keyboardShouldPersistTaps="never"
        renderBubble={renderBubble}
        minComposerHeight={60}
        renderInputToolbar={props => (
          <View style={{bottom: 0}}>
            <Composer
              {...props}
              text={text}
              onChange={setText}
              imageUrl={record?.imageUrl}
            />
          </View>
        )}
        minInputToolbarHeight={60}
        onSend={_handleSend}
        renderAvatar={null}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.white100
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
  },
  bubbleContainer: {
    width: '100%'
  },
  messageTimeSender: {
    color: '#ccc',
    fontSize: 10,
    textAlign: 'left',
    marginTop: 5
  },
  messageTime: {
    color: '#ccc',
    fontSize: 10,
    textAlign: 'right',
    marginTop: 5
  }
})

export default ChatScreen
