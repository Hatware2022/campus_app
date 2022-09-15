import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
	Container,
	Card,
	TextInput,
	View,
	Text,
	Content,
	Button,
	Touchable,
	SimpleRadioButton,
} from '../../common';

import * as Colors from '../../config/colors';

import { useNavigation } from '@react-navigation/native';
import userService from '../../services/user';
import session from '../../store/session';
import keys, { token } from '../../store/keys';
import globalStyles from '../../styles/styles';
import validator from 'validator';
import utils from '../../utils/utils';

/* =============================================================================
<LoginScreen />
============================================================================= */
const LoginScreen = () => {
	const [rememberMe, setRememberMe] = useState(true);
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		setSuccessMessage(null);
		setErrorMessage(null);
	}, []);

	useEffect(() => {
		const token = session.get(keys.token) || null;
		const isLoggedIn = session.get(keys.isLoggedIn) || null;
		const loginType = session.get(keys.loginType) || null;
		if (token && isLoggedIn) {
			if (loginType === "user") {
				navigation.navigate('UserTab');
			}
			if (loginType === "organization") {
				navigation.navigate('OrganizationTab');
			}
		}
	}, []);

	const _handleLogin = () => {

		setSuccessMessage(null);
		setErrorMessage(null);
		if (!email || !password) {
			setErrorMessage(`Please provide all fields.`);
			return;
		}

		if (!validator.isEmail(email)) {
			setErrorMessage(`Please provide a valid email address.`);
			return;
		}

		userService.login(email, password)
			.then(result => {
				if (result.error) {
					setErrorMessage(result.error);
					return;
				}

				if(result.data && result.data.success === false) {
					setErrorMessage(result.data.message);
					return;
				}

				if(result.data && result.data.success === true) {
					session.set(keys.token, result.data.token);
					session.set(keys.isLoggedIn, "true");

					let tokenData = utils.decodeJwt(result.data.token);
					if(tokenData.role === "user") {
						session.set(keys.loginType, "user");
						navigation.navigate('UserTab');
					}
					else if (tokenData.role === "organization") {
						navigation.navigate('Home');
					}
				}
			});
	};

	const _moveToSignUp = () => {
		navigation.navigate('SignUp');
	};

	return (
		<Container backgroundColor={Colors.primary} safeArea>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			<Content
				justifyContent="center"
				paddingHorizontal={20}
				paddingVertical={30}>
				<Card style={styles.card}>
					<Text style={styles.title}>Welcome</Text>

					<TextInput placeholder="Email" value={email} onChange={setEmail} />
					<TextInput secureTextEntry placeholder="Passcode" value={password} onChange={setPassword} />

					<View style={styles.rememberMeContainer}>
						<SimpleRadioButton
							label="Remember me"
							selected={rememberMe}
							onChange={() => setRememberMe(!rememberMe)}
						/>
					</View>

					{
						errorMessage &&
						<Text style={globalStyles.errorHelper}>
							{errorMessage}
						</Text>
					}
					{
						successMessage &&
						<Text style={globalStyles.successHelper}>
							{successMessage}
						</Text>
					}

					<Button
						shadow
						title="Sign In"
						onPress={_handleLogin}
						style={styles.button}
					/>

					<Touchable style={styles.signUpButton} onPress={_moveToSignUp}>
						<Text style={styles.signUpButtonText}>Sign Up</Text>
					</Touchable>
				</Card>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	card: {
		paddingBottom: 50,
		backgroundColor: Colors.background,
	},
	title: {
		fontSize: 25,
		marginBottom: 20,
		textAlign: 'center',
		color: Colors.primary,
	},
	rememberMeContainer: {
		marginBottom: 30,
	},
	button: {
		marginVertical: 10,
	},
	signUpButton: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signUpButtonText: {
		color: Colors.primary,
	}
});

export default LoginScreen;
