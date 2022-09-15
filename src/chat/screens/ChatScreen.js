import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Container, View, Avatar} from '../../common';
import Text from '../../common/TextV2';
import Message from '../components/Chat/Message';
import Composer from '../components/Chat/Composer';
import Header from '../components/Chat/Header';
import UserImage from '../../assets/images/user.png';
import MESSAGES from '../../constants/messages';
import messageService from '../../services/message';
import {useIsFocused} from '@react-navigation/native';
import session from '../../store/session';
import keys from '../../store/keys';
import utils from '../../utils/utils';
import userService from '../../services/user';
import socket from '../../utils/socket';
import conversation from '../../services/conversation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as Colors from '../../config/colors';
import BackIcon from '../../assets/icons/icon-back.svg';
import Gap from '../../common/Gap';
import Underline from '../../user/component/Underline';

const renderMessage = props => {
  return <Message {...props} />;
};

/* =============================================================================
<ChatScreen />
============================================================================= */
const ChatScreen = ({}) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const chat = route.params.data || null;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [record, setRecord] = useState(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const _safeAreaStyle = {
    paddingTop: insets.top,
  };

  const _handleSend = values => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, values),
    );
    setText('');
    // const data =  {
    // 	conversationId: chat._id,
    // 	senderId: values[0].user._id,
    // 	receiverId: chat.members.find(k => k !== values[0].user._id),
    // 	text: values[0].text
    // };
    // messageService.create(session.get(keys.token), data);
    // conversation.update(session.get(keys.token), chat._id, {title: values[0].text});
    // socket.emit("sendMessage", data);
  };

  // useEffect(() => {
  //     if (socket) {
  //         socket.on("getMessage", data => {
  //             reload();
  //         });
  //     }
  // }, []);

  // useEffect(() => {
  // 	const tokenData = utils.decodeJwt(session.get(keys.token));
  // 	if(!tokenData) return;
  // 	userService.getById(session.get(keys.token), tokenData._id)
  // 		.then(result => {
  // 			if(result.data && result.data.success === true) {
  // 				let r = result.data.data;
  // 				setRecord(r);
  // 			}
  // 		});
  // }, []);

  // useEffect(() => {
  // 	let isMounted = true;
  // 	if (isMounted) {
  // 		reload();
  // 	}

  // 	return () => { isMounted = false };
  // }, [isFocused]);

  // const reload = () => {
  // 	if(!chat) return;
  // 	messageService.getAll(session.get(keys.token), chat._id)
  // 		.then(result => {
  // 			if(result.data && result.data.success === true) {
  // 				let arr = result.data.data;
  // 				setMessages(arr);
  // 			}
  // 		});
  // }

  // if(!record) return <></>

  return (
    <Container backgroundColor="#FFF">
      {/* {chat != null && <Header chat={chat} />} */}
      <View style={[_safeAreaStyle, styles.headerContainer]}>
        <View horizontal alignItems="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Avatar size={36} source={{uri: null}} style={styles.avatar} />
          <Text size="big" family="semi" color={Colors.whiteText}>
            Josh Adams
          </Text>
        </View>
      </View>

      <View alignItems={'center'} paddingTop={16} paddingBottom={24}>
        <Avatar size={80} source={{uri: null}} style={styles.avatarProfile} />
        <Gap height={12} />
        <Text size="big" family="semi">
          Josh Adams
        </Text>
        <Gap height={12} />
        <View style={styles.viewProfile}>
          <Text size="big" family="semi" color={Colors.black500}>
            View Profile
          </Text>
        </View>
      </View>

      <Underline />

      {/* <GiftedChat
				messages={messages}
				user={{ _id: record._id, avatar: record.imageUrl ? record.imageUrl : null }}
				renderMessage={renderMessage}
				minComposerHeight={60}
				renderInputToolbar={props => (
					<Composer {...props} text={text} onChange={setText} />
				)}
				minInputToolbarHeight={60}
				onSend={_handleSend}
			/> */}
      <View flex={1}>
        <Text
          size="small"
          family="semi"
          color={Colors.black500}
          customStyle={styles.textDate}>
          Sun, 26 Jun, 18:00
        </Text>
        <GiftedChat
          messages={MESSAGES}
          user={MESSAGES[0]}
          renderMessage={renderMessage}
          minComposerHeight={60}
          renderInputToolbar={props => (
            <Composer {...props} text={text} onChange={setText} />
          )}
          minInputToolbarHeight={60}
          onSend={_handleSend}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  avatar: {
    marginHorizontal: 16,
  },
  avatarProfile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewProfile: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.black500,
  },
  textDate: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ChatScreen;
