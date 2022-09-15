import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Avatar } from '../../../common';

import * as Colors from '../../../config/colors';

import DemoImage from '../../../assets/images/empty-image.png';
import moment from 'moment';
import userService from '../../../services/user';
import keys from '../../../store/keys';
import session from '../../../store/session';
import utils from '../../../utils/utils';

/* =============================================================================
<NotificationListItem />
============================================================================= */
const NotificationListItem = ({ data }) => {

	const [record, setRecord] = useState(null);

	useEffect(() => {
		if (!data) return;
		const _id = data.userId;
		userService.getById(session.get(keys.token), _id)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

	return (
		<View style={styles.container}>
			{
				record &&
				<Avatar size={52} source={record.imageUrl} />
			}

			<View style={styles.centerContainer}>
				{
					record &&
					<Text style={styles.name}>{record.firstName} {record.lastName}</Text>
				}
				<Text style={styles.message} numberOfLines={1}>
					{data.detail}
				</Text>
			</View>

			<View style={styles.rightContainer}>
				<Text style={styles.time}>{moment(data.created_at).fromNow()}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	centerContainer: {
		flex: 1,
		marginLeft: 10,
	},
	name: {
		fontSize: 18,
	},
	message: {
		marginTop: 3,
		color: Colors.secondaryText,
	},
	rightContainer: {
		height: 20,
	},
	time: {
		fontSize: 13,
		color: Colors.secondaryText,
	},
});

export default NotificationListItem;
