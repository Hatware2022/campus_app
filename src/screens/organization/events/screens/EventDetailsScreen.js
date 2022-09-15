import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
	View,
	Card,
	Text,
	Container,
	StackHeader,
	Content,
	Avatar,
	Title,
	Tag,
	Button,
} from '../../../common';
import MemberList from '../components/EventDetails/MemberList';
import UserImage from '../../../assets/images/user.png';
import { useRoute } from '@react-navigation/native';
import userService from '../../../services/user';
import eventService from '../../../services/event';
import session from '../../../store/session';
import keys from '../../../store/keys';
import utils from '../../../utils/utils';
import moment from 'moment';

/* =============================================================================
<EventDetailsScreen />
============================================================================= */
const EventDetailsScreen = props => {
	const route = useRoute();
	const [record, setRecord] = useState(null);
	const [data, setData] = useState(route.params?.data || null);

	useEffect(() => {
		if (!data) return;
		userService.getById(session.get(keys.token), data.userId)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
		eventService.getById(session.get(keys.token), data._id)
			.then(result => {
				if (result.data && result.data.success === true) {
					setData(result.data.data);
				}
			});
	}

	const _handleJoinRsvp = () => {
		if (!data) return;

		const tokenData = utils.decodeJwt(session.get(keys.token));
		if (!tokenData) return;

		let arr = data.rsvp;
		let alreadyMember = arr.find(k => k.userId === tokenData._id);
		if (alreadyMember) return;

		arr.push({
			userId: tokenData._id,
			date: moment().format(),
			imageUrl: record.imageUrl
		});
		eventService.update(session.get(keys.token), data._id, {
			...data,
			rsvp: arr
		})
			.then(result => {
				reload();
			});
	}

	if (!data) return <></>

	return (
		<Container>
			<StackHeader type="secondary" title="Event" />

			<Content padding={20} bottomSafeArea>
				<View style={styles.userContainer}>
					{
						record &&
						<>
							<Avatar size={56} source={{ uri: record.imageUrl ? record.imageUrl : null }} />
							<Text style={styles.name}>{record.firstName} {record.lastName}</Text>
						</>
					}
				</View>

				<View marginVertical={10}>
					<Text>
						{data.title}{' '}
						{/* <Text fontFamily="Montserrat-SemiBold">{data.detail}</Text> */}
					</Text>
				</View>

				<Image source={{ uri: data.imageUrl ? data.imageUrl : null }} style={styles.image} />

				<View style={styles.tagContainer}>
					{data.tags.map(k => {
						return <Tag text={k} key={k} selected />
					})}
				</View>

				<View marginVertical={10}>
					<Title type="h4">About</Title>
					<Card>
						<Text>
							{data.detail}
						</Text>
					</Card>
				</View>

				<View marginVertical={10}>
					<Title type="h4">When</Title>
					<Card>
						<Text>{moment(data.date).format("MM/DD/YYYY")}</Text>
					</Card>
				</View>

				<View marginVertical={10}>
					<Title type="h4">Where</Title>
					<Card>
						<Text>{data.location}</Text>
					</Card>
				</View>

				<View marginVertical={10}>
					<Title type="h4">Attending</Title>

					<MemberList rsvp={data.rsvp} />
				</View>

				<Button style={styles.button} title="RSVP" onPress={_handleJoinRsvp} />
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: 249,
		borderRadius: 10,
		marginVertical: 10,
	},
	name: {
		fontSize: 15,
		marginLeft: 10,
	},
	tagContainer: {
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
		width: 90,
		height: 31,
		marginTop: 10,
		alignSelf: 'center',
	},
});

export default EventDetailsScreen;
