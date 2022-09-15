import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
} from 'react-native';
import {
	Container,
	Card,
	TextInput,
	Content,
	Button,
	View,
	Header,
	Select
} from '../../../common';
import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import NotificationBellIcon from '../../../assets/icons/app-notification-bell.svg';
import * as Colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';

/* =============================================================================
<SearchScreen />
============================================================================= */
const SearchScreen = () => {
	const navigation = useNavigation();
	const [keyword, setKeyword] = useState("");

	const _handleSearch = () => {
		setKeyword("");
		navigation.navigate("UserTab", {
			screen: 'Home',
			params: { keyword: keyword }
		});
	};

	const _moveToNotifications = () => {
		navigation.navigate('Notifications');
	};

	return (
		<Container backgroundColor={Colors.primary}>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			<Header
				title="Search"
				rightIcon={<NotificationBellIcon />}
				onRightPress={_moveToNotifications}
			/>

			<KeyboardAvoidingView
				style={styles.keyboardAvoidingView}
				behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<Content justifyContent="center" padding={20}>
					<Card style={styles.card}>
						<TextInput
							contentContainerStyle={styles.input}
							left={<SearchIcon />}
							right={<ArrowDownIcon />}
							label="Type a keyword to search"
							labelStyle={styles.smallLabel}
							placeholder="People"
							value={keyword}
							onChange={setKeyword}
						/>

						{/* <Select data={['Major 1', 'Major 2']} label="Search" /> */}

						<View center>
							<Button
								shadow
								title="Search"
								onPress={_handleSearch}
								style={styles.button}
							/>
						</View>
					</Card>
				</Content>
			</KeyboardAvoidingView>
		</Container>
	);
};

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	card: {
		padding: 20,
		paddingHorizontal: 15,
		backgroundColor: Colors.background,
	},
	smallLabel: {
		fontSize: 15,
	},
	input: {
		marginVertical: 5,
	},
	button: {
		width: '85%',
		marginTop: 5,
		marginBottom: 10,
	},
});

export default SearchScreen;
