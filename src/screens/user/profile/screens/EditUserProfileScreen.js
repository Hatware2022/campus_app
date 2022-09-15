import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
	Avatar,
	Container,
	Content,
	StackHeader,
	View,
	Text,
	TextArea,
	TextInput,
	SocialButtons,
	TagInput,
	Button,
	Select,
	Touchable
} from '../../../common';

import UserImage from '../../../assets/images/user.png';
import LinkedInIcon from '../../../assets/icons/app-linkedin.svg';
import TiktokIcon from '../../../assets/icons/app-tiktok.svg';
import InstagramIcon from '../../../assets/icons/app-instagram.svg';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import globalStyles from "../../../styles/styles";
import ImagePicker from 'react-native-image-crop-picker';
import imageService from '../../../services/image';

/* =============================================================================
<EditUserProfileScreen/>
============================================================================= */
const EditUserProfileScreen = () => {
	const [record, setRecord] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [major, setMajor] = useState('');
	const [gradeYear, setGradeYear] = useState('');
	const [gender, setGender] = useState('');
	const [bio, setBio] = useState('');
	const [insta, setInsta] = useState('');
	const [tiktok, setTiktok] = useState('');
	const [linkedin, setLinkedin] = useState('');
	const [interests, setInterests] = useState([]);
	const [activities, setActivities] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [file, setFile] = useState(null);

	useEffect(() => {
		setErrorMessage(null);
		setSuccessMessage(null);
	}, []);

	const reload = () => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;
		userService.getById(session.get(keys.token), tokenData._id)
			.then(result => {
				if(result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);

					setFirstName(r.firstName);
					setLastName(r.lastName);
					setImageUrl(r.imageUrl);
					setMajor(r.major);
					setGradeYear(r.gradYear);
					setGender(r.gender);
					setBio(r.bio);
					setInsta(r.insta);
					setTiktok(r.tiktok);
					setLinkedin(r.linkedin);
					setInterests(r.downFor);
					setActivities(r.interest);
				}
			});
	}

	useEffect(() => {
		reload();
	}, []);

	const _update = () => {
		
		setErrorMessage(null);
		setSuccessMessage(null);
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;
		userService.update(session.get(keys.token), tokenData._id, {
			firstName,
			lastName,
			major,
			gradYear: gradeYear,
			gender,
			bio,
			insta,
			tiktok,
			linkedin,
			interest: activities,
			downFor: interests
		})
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
				reload();
				return;
			}
		});
	}

	const _handleChooseFile = () => {
		try {
			const tokenData = utils.decodeJwt(session.get(keys.token));
			if(!tokenData) return;

			ImagePicker.openPicker({
				cropping: false,
				multiple: false
			})
			.then(k => {
				const file = {
					name: k.path.split("/").pop(),
					type: k.mime,
					uri: Platform.OS === 'ios' ? k.path.replace('file://', '') : k.path
				};

				imageService.create(file)
					.then(result => {
						if(result.data && result.data.success === true) {
							userService.update(session.get(keys.token), tokenData._id, {imageUrl: result.data.url})
								.then(result1 => {
									setImageUrl(result.data.url);
								});
						}
					});
			})
            .catch(err => {});
		}
		catch (err) { }
	}


	if(!record) return <></>

	return (
		<Container>
			<StackHeader backButton title="Profile" />

			<Content bottomSafeArea paddingHorizontal={20} paddingVertical={30}>
				<View center>
					<Avatar source={{uri: imageUrl}} size={84} onPress={_handleChooseFile} />
					<Text fontSize={14} marginVertical={10}>
						{`${record.firstName} ${record.lastName}`}
					</Text>

					<SocialButtons data={record} />
				</View>

				
				<TextInput placeholder="First Name" value={firstName} onChange={setFirstName} />
				
				<TextInput placeholder="Last Name" value={lastName} onChange={setLastName} />


				<TextInput placeholder="Major" value={major} onChange={setMajor} />

				{/* <Select
					label="Major"
					data={['Major 1', 'Major 2']}
					value={major}
					onChange={setMajor}
				/> */}

				<Select
					label="Grade year"
					data={['1 year', '2 years']}
					value={gradeYear}
					onChange={setGradeYear}
				/>

				<Select
					label="Gender"
					data={['Male', 'Female']}
					value={gender}
					onChange={setGender}
				/>

				<View style={styles.underline} />

				<TextArea
					label="Social Links"
					height={'auto'}
					editable={false}
					placeholder="Directions: here is where you write a little bit more about what you desire to get out of your time at the Company. "
				/>

				<TextInput left={<InstagramIcon />} placeholder="Paste link here" value={insta} onChange={setInsta} />
				<TextInput left={<TiktokIcon />} placeholder="Paste link here" value={tiktok} onChange={setTiktok}  />
				<TextInput left={<LinkedInIcon />} placeholder="Paste link here" value={linkedin} onChange={setLinkedin}  />

				<TextArea
					label="Bio"
					height={'auto'}
					editable={false}
					placeholder="Include details about who you are and what you seek to get out of your college experience. "
				/>

				<TextArea
					placeholder="Write here..."
					value={bio}
					onChange={setBio}
					height={'auto'}
				/>

				<View style={styles.underline} />

				<TextArea 
					label="Interests"
					editable={false}
					height={'auto'}
					placeholder="Elaborate about your interest here in 1-3 sentence..." />

				<TagInput
					label="Choose interests"
					values={interests}
					onChange={setInterests}
					height={'auto'}
					tags={['Business', 'Hiking', 'Reading', 'See all']}
				/>
				<View style={styles.underline} />

				<TextArea 
					label="Down for"
					editable={false}
					height={'auto'}
					placeholder="Elaborate about your interest here in 1-3 sentence..." />

				<TagInput
					label="Choose activities"
					values={activities}
					onChange={setActivities}
					tags={['Business', 'Hiking', 'Reading', 'See all']}
				/>

				<View style={styles.underline} />

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
				<View center>
					<Button width={146} height={51} title="Update" onPress={_update} />
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	uploadBtn: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	underline: {
		height: 0.5,
		width: '90%',
		alignSelf: 'center',
		marginVertical: 20,
		backgroundColor: Colors.border,
	},
	smallLabel: {
		fontSize: 15,
	},
});

export default EditUserProfileScreen;
