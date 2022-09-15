import React, {useEffect, useState} from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Container, TextInput, Title, View, TextArea, Text } from '../../../common';

import ChatForm from '../components/Chats/ChatForm';
import ChatsFilter from '../components/Chats/ChatsFilter';
import ChatListItem from '../components/Chats/ChatListItem';
import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../../config/colors';
import CHATS from '../../../constants/chats';
import { useIsFocused } from "@react-navigation/native";
import postService from '../../../services/post';
import session from '../../../store/session';
import keys from '../../../store/keys';
import moment from 'moment';

/* =============================================================================
<ChatsScreen />
============================================================================= */
const ChatsScreen = () => {
	const isFocused = useIsFocused();
	const [records, setRecords] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [sortBy, setSortBy] = useState("Newest");
	const [filters, setFilters] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused, keyword, sortBy, filters]);

	const reload = () => {
		postService.getAll(session.get(keys.token))
			.then(result => {
				if (result.error) {
					setErrorMessage(result.error);
					return;
				}

				if(result.data && result.data.success === false) {
					setErrorMessage(result.data.message);
					return;
				}

				let arr = result.data.data;

				if (keyword.length > 0 || (filters && filters.keyword.length > 0)) {
					let f = filters.keyword || keyword;
					arr = arr.filter(k => k.detail.toLowerCase().includes(f.toLowerCase()));
				}

				if (sortBy === "Most Popular") {
					arr = arr.sort((a, b) => b.likes.length - a.likes.length);
				}
				else if (sortBy === "Newest") {
					arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
				}

				if (filters) {
					if (filters.interests.length > 0) {
						arr = arr.filter(k => k.downFor.includes(filters.interests));
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

	const renderItem = ({ item }) => <ChatListItem data={item} reload={reload} />;

	return (
		<Container>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			<View style={styles.headerContainer}>
				<TextInput
					left={<SearchIcon />}
					right={<ArrowDownIcon />}
					placeholder="Search chat"
					value={keyword}
					onChange={setKeyword}
				/>
			</View>

			<ChatsFilter sortBy={sortBy} setSortBy={setSortBy} setFilters={setFilters}  />

			<FlatList
				data={records}
				style={styles.list}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<View>
						<ChatForm reload={reload} />
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

export default ChatsScreen;
