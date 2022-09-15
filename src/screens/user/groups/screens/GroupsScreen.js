import React, {useState, useEffect} from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Container, Text, TextInput, View, Title } from '../../../common';
import GroupsFilter from '../components/Groups/GroupsFilter';
import GroupListItem from '../components/Groups/GroupListItem';
import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../../config/colors';
import GROUPS from '../../../constants/groups';
import { useIsFocused } from "@react-navigation/native";
import groupService from '../../../services/group';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';

/* =============================================================================
<GroupsScreen />
============================================================================= */
const GroupsScreen = () => {
	const isFocused = useIsFocused();
	const [records, setRecords] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [sortBy, setSortBy] = useState("Newest");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused, keyword, sortBy]);

	const reload = () => {
		groupService.getAll(session.get(keys.token))
			.then(result => {
				if (result.error) {
					setErrorMessage(result.error);
					return;
				}

				if (result.data && result.data.success === false) {
					setErrorMessage(result.data.message);
					return;
				}

				let arr = result.data.data;

				if (keyword.length > 0) {
					let f = filters.keyword || keyword;
					arr = arr.filter(k => k.detail.toLowerCase().includes(f.toLowerCase()));
				}

				if (sortBy === "Most Popular") {
					arr = arr.sort((a, b) => b.likes.length - a.likes.length);
				}
				else if (sortBy === "Oldest First") {
					arr = arr.sort((a, b) => moment(a.created_at) - moment(b.created_at));
				}
				else if (sortBy === "Newest First") {
					arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
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

			<View style={styles.headerContainer}>
				<TextInput
					left={<SearchIcon />}
					right={<ArrowDownIcon />}
					placeholder="Search group"
					value={keyword}
					onChange={setKeyword}
				/>
			</View>

			<View style={styles.container}>
				<GroupsFilter />
				<FlatList
					data={records}
					numColumns={2}
					style={styles.list}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					contentContainerStyle={styles.listContent}
					ListHeaderComponent={<Text style={styles.title}>Results</Text>}
					ListEmptyComponent={<Title type="h6" marginHorizontal={20} marginVertical={20}>No data found.</Title>}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
				/>
			</View>
		</Container>
	);
};

const renderItem = ({ item }) => <GroupListItem data={item} />;

const styles = StyleSheet.create({
	headerContainer: {
		paddingBottom: 5,
		paddingHorizontal: 20,
		borderBottomEndRadius: 15,
		borderBottomStartRadius: 15,
		backgroundColor: Colors.primary,
	},
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		paddingHorizontal: 20,
		fontFamily: 'Montserrat-Medium',
	},
	listContent: {
		paddingBottom: 20,
	},
});

export default GroupsScreen;
