import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
	Avatar,
	Container,
	Content,
	StackHeader,
	View,
	Text,
	Card,
	Title,
	Tag,
	Touchable,
	TagInput
} from '../../../common';
import UserImage from '../../../assets/images/user.png';
import SocialButtons from '../components/ProfileDetails/SocialButtons';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import { useRoute } from '@react-navigation/native';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';

/* =============================================================================
<ProfileDetailsScreen />
============================================================================= */
const ProfileDetailsScreen = () => {

	const route = useRoute();
	const [record, setRecord] = useState(null);

	useEffect(() => {
		const _id = route.params._id;
		if (!_id) return;
		userService.getById(session.get(keys.token), _id)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

	if(!record) return <></>

	return (
		<Container>
			<StackHeader backButton title="Profile" />

			<Content bottomSafeArea paddingHorizontal={20} paddingVertical={30}>
				<View center>
					<Avatar source={{uri: record.imageUrl ? record.imageUrl : null}} size={84} />
					<Text fontSize={14} marginVertical={10}>
						{`${record.firstName} ${record.lastName}`}
					</Text>

					<SocialButtons data={record} />
				</View>

				<View>
					<Title type="h4" marginVertical={10}>
						Bio
					</Title>
					<Card>
						<Text>
							{record.bio}
						</Text>
					</Card>
				</View>

				<View style={styles.underline} />

				<View horizontal>
					<View flex={1} center>
						<Text fontFamily="Montserrat-SemiBold">
							Major: <Text>{record.major}</Text>
						</Text>
					</View>
					<View flex={1} center>
						<Text fontFamily="Montserrat-SemiBold">
							Year: <Text>{record.gradYear}</Text>
						</Text>
					</View>
				</View>

				<View style={styles.underline} />

				<TagInput
					label="Interests"
					tags={record.downFor}
				/>

				{/* <View>
					<Title type="h4" marginVertical={10}>
						Interests
					</Title>

					<Title type="h5" marginVertical={10}>
						Technology
					</Title>
					<Card>
						<Text>
							My old roommate and I made an app that is live in the App Store.
							Familiar with
						</Text>
					</Card>

					<Title type="h5" marginVertical={10}>
						Startups
					</Title>
					<Card>
						<Text>
							I have three ideas which I want to take to market. I have
							successfully started on business but need help with administrative
						</Text>
					</Card>
				</View> */}

				<View style={styles.underline} />

				<TagInput
					label="Down for"
					tags={record.downFor}
				/>
				{/* <View>
					<Title type="h4">Down for:</Title>

					<Title type="h5" marginVertical={10}>
						Movies:
					</Title>
					<Card>
						<Text>
							Who are capable of assisting in securing funding as well as
							sourcing from china
						</Text>
					</Card>

					<Title type="h5" marginVertical={10}>
						Partying:
					</Title>
					<Card>
						<Text>
							Who are interested in attending events and other workshops locally
						</Text>
					</Card>

					<Title type="h5" marginVertical={10}>
						Traveling
					</Title>
					<Card>
						<Text>
							Students who are interested investing in properties, or brokers
							looking for an
						</Text>
					</Card>
				</View> */}

				{/* <View style={styles.underline} /> */}

				{/* <View>
					<Title type="h4">Find similar Students</Title>

					<Title type="h5" marginVertical={10}>
						Interests
					</Title>
					<View style={styles.tagContainer}>
						<Tag text="Business" style={styles.tag} />
						<Tag text="Hiking" style={styles.tag} />
						<Tag text="Reading" style={styles.tag} />
						<Tag text="Art" style={styles.tag} />
					</View>

					<Title type="h5" marginVertical={10}>
						Down for:
					</Title>
					<View style={styles.tagContainer}>
						<Tag text="Movies" style={styles.tag} />
						<Tag text="Partying" style={styles.tag} />
						<Tag text="Surfing " style={styles.tag} />
						<Tag text="Hiking" style={styles.tag} />
					</View>
				</View> */}
			</Content>
		</Container>
	);
};
const styles = StyleSheet.create({
	underline: {
		height: 0.5,
		width: '90%',
		alignSelf: 'center',
		marginVertical: 20,
		backgroundColor: Colors.border,
	},
	tagContainer: {
		flexDirection: 'row',
	},
	tag: {
		minWidth: 80,
		marginRight: 8,
		marginBottom: 10,
		paddingHorizontal: 5,
		borderColor: Colors.card,
		backgroundColor: Colors.card,
	},
});

export default ProfileDetailsScreen;
