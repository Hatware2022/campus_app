import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Container, StackHeader, TextInput, View, Title } from '../../common';
import InboxListItem from '../components/Inbox/NotificationListItem';
import SearchIcon from '../../assets/icons/app-search.svg';
import * as Colors from '../../config/colors';
import { useIsFocused } from "@react-navigation/native";
import notificationService from '../../services/notification';
import session from '../../store/session';
import keys from '../../store/keys';

/* =============================================================================
<NotificationsScreen />
============================================================================= */
const NotificationsScreen = () => {
	const isFocused = useIsFocused();
	const [records, setRecords] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused, keyword]);

	const reload = () => {
		notificationService.getAll(session.get(keys.token))
			.then(result => {
				let arr = result.data.data;
				if (keyword.length > 0) {
					arr = arr.filter(k => k.bio.includes(keyword));
				}
				
				setRecords(arr);
			});
	}

	const onRefresh = () => {
		setRefreshing(true);
		reload();
		setRefreshing(false);
	}

	return (
		<Container>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			<StackHeader
				backButton={false}
				title="Notifications"
				content={
					<View style={styles.headerContainer}>
						<TextInput left={<SearchIcon />} placeholder="Search"
							value={keyword} onChange={setKeyword} />
					</View>
				}
			/>

			<FlatList
				data={records}
				style={styles.list}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={<Title type="h6" marginHorizontal={20} marginVertical={20}>No data found.</Title>}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
			/>
		</Container>
	);
};

const renderItem = ({ item }) => <InboxListItem data={item} />;

const styles = StyleSheet.create({
	headerContainer: {
		paddingHorizontal: 20,
	},
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
	},
	listContent: {
		paddingBottom: 20,
	},
});

export default NotificationsScreen;
