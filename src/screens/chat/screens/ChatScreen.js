import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { Container } from '../../common';
import Message from '../components/Chat/Message';
import Composer from '../components/Chat/Composer';
import Header from '../components/Chat/Header';
import UserImage from '../../assets/images/user.png';
import MESSAGES from '../../constants/messages';
import messageService from '../../services/message';
import { useIsFocused } from "@react-navigation/native";
import session from '../../store/session';
import keys from '../../store/keys';
import utils from '../../utils/utils';
import userService from '../../services/user';
import socket from '../../utils/socket';
import conversation from '../../services/conversation';

const renderMessage = props => <Message {...props} />;

/* =============================================================================
<ChatScreen />
============================================================================= */
const ChatScreen = ({ }) => {
	const route = useRoute();
    const isFocused = useIsFocused();
	const chat = route.params.data || null;
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);
	const [record, setRecord] = useState(null);

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
			{chat != null && <Header chat={chat} />}

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
		</Container>
	);
};

export default ChatScreen;
