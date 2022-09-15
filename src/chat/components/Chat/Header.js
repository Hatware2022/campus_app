import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Text, View, Touchable, Avatar } from '../../../common';
import LeftArrowIcon from '../../../assets/icons/app-arrow-left.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import USERS from "../../../constants/messages";

/* =============================================================================
<Header />
============================================================================= */
const Header = props => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const _layout = {
		height: 70 + insets.top,
		paddingTop: insets.top,
	};

	const [record, setRecord] = useState(null);

	// useEffect(() => {
	// 	const tokenData = utils.decodeJwt(session.get(keys.token));
	// 	if (!tokenData) return;
	// 	let otherUser = props.chat.members.find(k => k !== tokenData._id);
	// 	if (!otherUser) return;
	// 	userService.getById(session.get(keys.token), otherUser)
	// 		.then(result => {
	// 			if (result.data && result.data.success === true) {
	// 				let r = result.data.data;
	// 				setRecord(r);
	// 			}
	// 		});
	// }, []);

	// if (!record) return <></>

	return (
		<View style={[styles.container, _layout]}>
			<Touchable style={styles.backButton} onPress={() => navigation.goBack()}>
				<LeftArrowIcon />
			</Touchable>

			{/* <Avatar size={50} source={{ uri: record.imageUrl ? record.imageUrl : null }} /> */}
			<Avatar size={50} source={USERS[0].user.avatar} />

			<Text style={styles.name} numberOfLines={1}>
				{/* {record.firstName} {record.lastName} */}
				{USERS[0].user.name}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 5,
		borderBottomEndRadius: 15,
		borderBottomStartRadius: 15,
		backgroundColor: Colors.primary,
	},
	backButton: {
		height: 60,
		width: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		color: Colors.background,
		marginLeft: 10,
	},
});

export default Header;
