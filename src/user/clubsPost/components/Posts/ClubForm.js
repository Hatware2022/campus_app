import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
	View,
	Text,
	TextArea,
	Avatar,
	Touchable,
	Button,
	TagInput
} from '../../../../common';
import UserImage from '../../../../assets/images/user.png';
import AddImageIcon from '../../../../assets/icons/app-add-image.svg';
import PlusIcon from '../../../../assets/icons/app-plus.svg';
import * as Colors from '../../../../config/colors';
import userService from '../../../../services/user';
import postService from '../../../../services/post';
import imageService from '../../../../services/image';
import utils from '../../../../utils/utils';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from "@react-navigation/native";

/* =============================================================================
<ChatForm />
============================================================================= */
const ClubForm = props => {

    const isFocused = useIsFocused();
	const [record, setRecord] = useState(null);
	const [tags, setTags] = useState([]);
	const [post, setPost] = useState("");
	const [file, setFile] = useState(null);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			setRecord(null);
			setTags([]);
			setPost("");
			setFile(null);
		}

		return () => { isMounted = false };
	}, [isFocused]);

	useEffect(() => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;
		userService.getById(session.get(keys.token), tokenData._id)
			.then(result => {
				if(result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

	const _handlePost = () => {
		if(!file) return;
		imageService.create(file)
			.then(imageResponse => {

				if (imageResponse.data.success === true) {

					postService.create(session.get(keys.token), {
						userId: record._id,
						detail: post,
						tags: tags,
						imageUrl: imageResponse.data.url
					})
						.then(result => {
							if (result.data && result.data.success === true) {
								setShowForm(false);
								props.reload();
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
            .catch(err => {});
		}
		catch (err) { }
	}

	if (!showForm) {
		return (
			<View style={styles.createPostButtonContainer}>
				<Button
					width={143}
					height={42}
					title="Create post"
					onPress={() => setShowForm(true)}
				/>
			</View>
		);
	}

	if(!record) return <></>

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.userContainer}>
					<Avatar source={record.imageUrl} size={56} />
					<Text style={styles.name}>{record.firstName} {record.lastName}</Text>
				</View>

				<Touchable style={styles.uploadBtn} onPress={_handleChooseFile}>
					<AddImageIcon />
					<Text style={styles.uploadBtnText}>Upload Image</Text>
				</Touchable>
			</View>

			<TextArea placeholder="Write your post here..." value={post} onChange={setPost} />

			<View>
				<Text style={styles.tagTitle}>Add Tags</Text>

				<View style={styles.tagContainer}>
					{/* {tags.map((item, index) => (
						<View key={index} style={styles.tag}>
							<Text fontFamily="Montserrat-Light">{item}</Text>
						</View>
					))} */}

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
			</View>

			<Button
				title="Post"
				style={styles.postButton}
				onPress={_handlePost}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	createPostButtonContainer: {
		marginVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		margin: 20,
		padding: 20,
		borderRadius: 10,
		shadowColor: Colors.border,
		backgroundColor: Colors.background,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	topContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	userContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: {
		paddingLeft: 10,
	},
	uploadBtn: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	uploadBtnText: {
		fontSize: 7,
		marginTop: 5,
		color: Colors.secondaryText,
	},
	tagTitle: {
		marginTop: 10,
		marginBottom: 5,
	},
	tagContainer: {
		marginTop: 5,
		flexDirection: 'row',
	},
	tag: {
		height: 31,
		minWidth: 80,
		marginRight: 5,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F5',
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
		marginTop: 20,
	},
});

export default ClubForm;
