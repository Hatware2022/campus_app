import React, {useEffect, useState} from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Button, Container, TextInput, Title, View, StackHeader } from '../../../common';
import EventsFilter from '../components/Events/EventsFilter';
import EventListItem from '../components/Events/EventListItem';
import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../../config/colors';
import EVENTS from '../../../constants/events';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import eventService from '../../../services/event';
import userService from '../../../services/user';
import moment from 'moment';

/* =============================================================================
<EventsScreen />
============================================================================= */
const EventsScreen = () => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [records, setRecords] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [sortBy, setSortBy] = useState("A-Z");
	const [filters, setFilters] = useState(null);
	const [record, setRecord] = useState(null);

	const _moveToCreatePost = () => {
		navigation.navigate('EventCreate');
	};

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

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused, keyword, sortBy, filters]);

	const reload = () => {
		eventService.getAll(session.get(keys.token))
			.then(result => {
				let arr = result.data.data;
				if (keyword.length > 0 || (filters && filters.keyword && filters.keyword.length > 0)) {
					let f = filters && filters.keyword || keyword;
					arr = arr.filter(k => k.title.toLowerCase().includes(f.toLowerCase()));
				}

				if (sortBy === "Ending Soon") {
					arr = arr.sort((a, b) => moment(b.date).diff(moment(), 'days') - moment(a.date).diff(moment(), 'days'));
				}
				else if (sortBy === "Most Popular") {
					arr = arr.sort((a, b) => b.rsvp.length - a.rsvp.length);
				}
				else if (sortBy === "Newest") {
					arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
				}

				if (filters) {
					if (filters.tags.length > 0) {
						arr = arr.filter(k => k.tags.includes(filters.tags));
					}
				}

				setRecords(arr);
			});
	}

	const onRefresh = () => {
		setRefreshing(true);
		reload();
		setRefreshing(false);
	}

	const renderItem = ({ item }) => <EventListItem data={item} reload={reload} sessionUser={record} />;

	return (
		<Container>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			{/* <StackHeader
				backButton={false}
				title="Events"
				content={
					<View style={styles.headerContainer}>
						<TextInput
							left={<SearchIcon />}
							right={<ArrowDownIcon />}
							placeholder="Search events"
							value={keyword}
							onChange={setKeyword}
						/>
					</View>
				}
			/> */}
			
			<View style={styles.headerContainer}>
				<TextInput
					left={<SearchIcon />}
					right={<ArrowDownIcon />}
					placeholder="Search events"
					value={keyword}
					onChange={setKeyword}
				/>
			</View>
			
			<EventsFilter sortBy={sortBy} setSortBy={setSortBy} setFilters={setFilters} />

			<FlatList
				data={records}
				style={styles.list}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<View>
						<View style={styles.createEventButtonContainer}>
							<Button
								width={143}
								height={42}
								title="Create event"
								onPress={_moveToCreatePost}
							/>
						</View>
						<Title type="h4" marginHorizontal={20}>
							Results
						</Title>
					</View>
				}
				ListEmptyComponent={<Title type="h6" marginHorizontal={20} marginVertical={20}>No data found.</Title>}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
			/>
		</Container>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		paddingBottom: 5,
		paddingHorizontal: 20,
		borderBottomEndRadius: 15,
		borderBottomStartRadius: 15,
		backgroundColor: Colors.primary,
	},
	createEventButtonContainer: {
		marginVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
	},
	listContent: {
		paddingTop: 10,
		paddingBottom: 20,
	},
});

export default EventsScreen;
