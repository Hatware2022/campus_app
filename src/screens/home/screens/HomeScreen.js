import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Touchable, Text } from '../../common';
import session from '../../store/session';
import keys from '../../store/keys';
import * as Colors from '../../config/colors';

/* =============================================================================
<HomeScreen /> NOT IN USED PLEASE VERIFY
============================================================================= */
const HomeScreen = () => {
	const navigation = useNavigation();

	const _moveToUsersTab = () => {
		session.set(keys.loginType, "user");
		navigation.navigate('UserTab');
	}

	const _moveToOrgTab = () => {
		session.set(keys.loginType, "organization");
		navigation.navigate('OrganizationTab');
	}

	return (
		<Container safeArea>
			<Content padding={20} justifyContent="center">
				<Touchable
					style={styles.listItem}
					onPress={_moveToUsersTab}>
					<Text style={styles.listItemText}>User</Text>
				</Touchable>

				<Touchable
					style={styles.listItem}
					onPress={_moveToOrgTab}>
					<Text style={styles.listItemText}>Organization</Text>
				</Touchable>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	listItem: {
		padding: 15,
		borderRadius: 5,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	listItemText: {
		color: Colors.background,
	},
});

export default HomeScreen;
