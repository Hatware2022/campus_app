import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	View,
	Text,
	Content,
	Avatar,
	Container,
	StackHeader,
	TextInput,
	TextArea,
	Touchable,
	Title,
	Tag,
	Button,
	TagInput
} from '../../../common';
import DemoImage from '../../../assets/images/empty-image.png';
import PlusIcon from '../../../assets/icons/app-plus.svg';
import AddImageIcon from '../../../assets/icons/app-add-image.svg';
import * as Colors from '../../../config/colors';
import { useIsFocused, useRoute, useNavigation } from "@react-navigation/native";
import utils from '../../../utils/utils';
import session from '../../../store/session';
import userService from '../../../services/user';
import eventService from '../../../services/event';
import imageService from '../../../services/image';
import ImagePicker from 'react-native-image-crop-picker';
import keys from '../../../store/keys';
import globalStyles from '../../../styles/styles';

/* =============================================================================
<EventCreateScreen />
============================================================================= */
const EventCreateScreen = () => {

	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const [record, setRecord] = useState(null);
	const [title, setTitle] = useState("");
	const [file, setFile] = useState(null);
	const [tags, setTags] = useState([]);
	const [about, setAbout] = useState("");
	const [when, setWhen] = useState("");
	const [where, setWhere] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			setTitle("");
			setTags([]);
			setFile(null);
			setAbout("");
			setWhen("");
			setWhere("");
		}

		return () => { isMounted = false };
	}, [isFocused]);

	useEffect(() => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if (!tokenData) return;
		userService.getById(session.get(keys.token), tokenData._id)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

	const _handleSubmit = () => {
		if (!record || !file || !title || !about || !when || !where || tags.length === 0) {
			setErrorMessage("Please provide all fields.");
			return;
		}
		setErrorMessage("");
		setSuccessMessage("");
		imageService.create(file)
			.then(imageResponse => {
				if (imageResponse.data.success === true) {
					eventService.create(session.get(keys.token), {
						userId: record._id,
						title: title,
						tags: tags,
						imageUrl: imageResponse.data.url,
						detail: about,
						date: when,
						location: where
					})
						.then(result => {
							if (result.data && result.data.success === true) {
								setSuccessMessage("Event created successfully!");
								console.log("Created");
								navigation.navigate("OrganizationTab", { screen: 'Home' });
							}
						});
				}
			});
	}

	const _handleChooseFile = () => {
		try {
			ImagePicker.openPicker({
				cropping: false,
				multiple: false
			})
				.then(k => {
					setFile({
						name: k.path.split("/").pop(),
						type: k.mime,
						uri: Platform.OS === 'ios' ? k.path.replace('file://', '') : k.path
					});
				})
				.catch(err => { });
		}
		catch (err) { }
	}

	return (
		<Container>
			<StackHeader type="secondary" title="Create Event" />

			<Content padding={20} bottomSafeArea>
				<View style={styles.userDetails}>
					{record &&
						<>
							<Avatar source={{ uri: record.imageUrl ? record.imageUrl : null }} size={56} />
							<Text marginHorizontal={10}>{record.firstName} {record.lastName}</Text>
						</>
					}
				</View>

				<View marginVertical={10}>
					<TextInput placeholder="Add title here" value={title} onChange={setTitle} />
				</View>

				<Touchable style={styles.addImageContainer} onPress={_handleChooseFile}>
					<AddImageIcon />
					<Text marginVertical={10} fontSize={15}>
						Add Image
					</Text>
				</Touchable>

				<Title marginVertical={10} type="h4">
					Choose Tags
				</Title>

				<View style={styles.tagContainer}>
					<TagInput
						label=""
						values={tags}
						onChange={setTags}
						tags={['Business', 'Hiking', 'Reading']}
					/>

					{/* <Touchable style={styles.addTagButton}>
            <PlusIcon />
          </Touchable> */}
				</View>

				<TextArea label="About" placeholder="Add text about event here" value={about} onChange={setAbout} />

				<TextInput label="When" placeholder="MM/DD/YYYY" value={when} onChange={setWhen} />
				<TextInput placeholder="Insert date and time of day" editable={false} />

				<TextInput label="Where" placeholder="Add place here" value={where} onChange={setWhere} />

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
					<Button title="Post" style={styles.postButton} onPress={_handleSubmit} />
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	userDetails: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	addImageContainer: {
		width: '100%',
		height: 250,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.card,
	},
	tagContainer: {
		marginTop: 5,
		marginBottom: 20,
		flexDirection: 'row',
	},
	addTagButton: {
		width: 31,
		height: 31,
		alignItems: 'center',
		justifyContent: 'center',
	},
	postButton: {
		width: 107,
		height: 40,
		marginVertical: 10,
	},
});

export default EventCreateScreen;
