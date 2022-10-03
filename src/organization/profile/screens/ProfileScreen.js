import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {
	View,
	Text,
	Avatar,
	Content,
	Container,
	Touchable,
} from '../../../common';
import UserImage from '../../../assets/images/empty-image.png';
import SettingListItem from '../components/Profile/SettingListItem';
import * as Colors from '../../../config/colors';
import session from '../../../store/session';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import { useIsFocused } from "@react-navigation/native";
import utils from '../../../utils/utils';

/* =============================================================================
<ProfileScreen />
============================================================================= */
const ProfileScreen = () => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
	const [record, setRecord] = useState(null);

	const _moveToViewProfile = () => {
		navigation.navigate('EditOrganizationProfile');
	};

	const _safeArea = {
		paddingTop: 50 + insets.top,
	};


	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused]);

	const reload = () => {
		const tokenData = utils.decodeJwt(session.get(keys.token)) || null;
		if (!tokenData) return;
		userService.getById(session.get(keys.token), tokenData.id)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result?.data?.data;
					alert(JSON.stringify(r))
					setRecord(r);
				}
			});
	}

	const _handleLogout = () => {
		session.logout();
		navigation.navigate("Login");
	}

	if (!record) return <></>

	return (
		<Container backgroundColor="#fafafa">
			<View style={[styles.userContainer, _safeArea]}>
				<Avatar size={82} source={{uri: record.imageUrl ? record.imageUrl : null}} />
				<Touchable
					style={styles.userTextContainer}
					onPress={_moveToViewProfile}>
					<Text style={styles.name}>{record.firstName} {record.lastName}</Text>
					<Text style={styles.vieProfile}>View profile</Text>
				</Touchable>
			</View>

			<Content>
				{/* <SettingListItem name="Your Events" onPress={() => null} />
        <SettingListItem name="Your Announcements" onPress={() => null} />
        <SettingListItem name="Saved Organizations" onPress={() => null} />
        <SettingListItem
          name="Edit Notification Settings"
          onPress={() =>
            navigation.navigate('OrganizationNotificationSettings')
          }
          border={false}
        /> */}

				{/* <View paddingVertical={15} />

        <SettingListItem
          border={false}
          name="Career Center"
          onPress={() => null}
        /> */}

				{/* <View paddingVertical={15} /> */}

				<SettingListItem
					border={false}
					name="Logout"
					onPress={_handleLogout}
				/>
			</Content>
		</Container>
	);
};
const styles = StyleSheet.create({
	userContainer: {
		padding: 20,
		paddingVertical: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary,
	},
	name: {
		fontSize: 20,
		color: Colors.background,
		fontFamily: 'Montserrat-Bold',
	},
	vieProfile: {
		color: Colors.background,
	},
	userTextContainer: {
		paddingHorizontal: 20,
	},
});

export default ProfileScreen;
