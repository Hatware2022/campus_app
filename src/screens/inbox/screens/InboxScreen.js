import React, {useState, useEffect} from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Container, StackHeader, TextInput, View, Title } from '../../common';
import InboxListItem from '../components/Inbox/InboxListItem';
import SearchIcon from '../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../assets/icons/app-arrow-down.svg';
import * as Colors from '../../config/colors';
import { useIsFocused } from "@react-navigation/native";
import conversationService from '../../services/conversation';
import keys from '../../store/keys';
import session from '../../store/session';
import utils from '../../utils/utils';
import moment from 'moment';
import INBOXES from '../../constants/inboxes';

/* =============================================================================
<InboxScreen />
============================================================================= */
const InboxScreen = () => {

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
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;
		conversationService.getAll(session.get(keys.token), tokenData._id)
			.then(result => {
				let arr = result.data.data;
				if (keyword.length > 0) {
					arr = arr.filter(k => k.title.toLowerCase().includes(keyword.toLowerCase()));
				}
				arr = arr.sort((a, b) => moment(a.updated_at) - moment(b.updated_at));
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
				title="Your Inbox"
				content={
					<View style={styles.headerContainer}>
						<TextInput
							left={<SearchIcon />}
							right={<ArrowDownIcon />}
							placeholder="Search"
							value={keyword}
							onChange={setKeyword}
						/>
					</View>
				}
			/>

			<FlatList
				data={INBOXES}
				// data={records}
				style={styles.list}
				renderItem={renderItem}
				// keyExtractor={item => item._id}
				keyExtractor={item => item.id}
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

export default InboxScreen;
