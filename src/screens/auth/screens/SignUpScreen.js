import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
	Container,
	Card,
	TextInput,
	Text,
	Content,
	Button,
	Touchable,
} from '../../common';

import * as Colors from '../../config/colors';
import validator from 'validator';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/styles';
import userService from '../../services/user';
import session from '../../store/session';
import keys from '../../store/keys';
import utils from '../../utils/utils';

/* =============================================================================
<SignUpScreen />
============================================================================= */
const SignUpScreen = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const navigation = useNavigation();

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

	const _handleSignUp = () => {
		setSuccessMessage(null);
		setErrorMessage(null);
		if (!firstname || !lastname || !email || !password) {
			setErrorMessage(`Please provide all fields.`);
			return;
		}

		if (!validator.isEmail(email)) {
			setErrorMessage(`Please provide a valid email address.`);
			return;
		}

		userService.signup(firstname, lastname, email, password)
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
					setSuccessMessage(result.data.message);
					
					userService.login(email, password)
						.then(result1 => {
							if (result1.error) {
								setErrorMessage(result1.error);
								return;
							}

							if(result1.data.success === false) {
								setErrorMessage(result1.data.message);
								return;
							}

							if(result1.data.success === true) {
								session.set(keys.token, result1.data.token);
								session.set(keys.isLoggedIn, "true");
								
								let tokenData = utils.decodeJwt(result1.data.token);
								if(tokenData.role === "user") {
									session.set(keys.loginType, "user");
									navigation.navigate('UserTab');
								}
								else if (tokenData.role === "organization") {
									navigation.navigate('Home');
								}
							}
						});
				}
			});
	};

	const _moveToSignIn = () => {
		navigation.navigate('Login');
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

					<TextInput placeholder="First name" value={firstname} onChange={setFirstname} />
					<TextInput placeholder="Last name" value={lastname} onChange={setLastname} />
					<TextInput placeholder="Email" value={email} onChange={setEmail} />
					<TextInput secureTextEntry placeholder="Passcode" value={password} onChange={setPassword} />


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
						title="Sign Up"
						onPress={_handleSignUp}
						style={styles.button}
					/>

					<Touchable style={styles.signInButton} onPress={_moveToSignIn}>
						<Text style={styles.signInButtonText}>Sign In</Text>
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
	signInButton: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signInButtonText: {
		color: Colors.primary,
	},
});

export default SignUpScreen;
