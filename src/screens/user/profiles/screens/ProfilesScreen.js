import React, {useEffect, useState} from 'react';
import { FlatList, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { Container, Text, TextInput, View, Title } from '../../../common';
import ProfilesFilter from '../components/Profiles/ProfilesFilter';
import ProfileListItem from '../components/Profiles/ProfileListItem';
import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';
import { useIsFocused, useRoute } from "@react-navigation/native";
import * as Colors from '../../../config/colors';
import userService from '../../../services/user';
import session from '../../../store/session';
import keys from '../../../store/keys';
import moment from 'moment';

/* =============================================================================
<ProfilesScreen />
============================================================================= */
const ProfilesScreen = () => {

	const route = useRoute();
    const isFocused = useIsFocused();
	const [records, setRecords] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [keyword, setKeyword] = useState("");
	const [sortBy, setSortBy] = useState("A-Z");
	const [filters, setFilters] = useState(null);


	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			reload();
		}

		return () => { isMounted = false };
	}, [isFocused, keyword, sortBy, filters]);

	useEffect(() => {
		const keywordFromOtherScreen = route.params ? route.params.keyword : null;
		if(keywordFromOtherScreen) {
			setKeyword(keywordFromOtherScreen);
		}
	}, [route.params]);

	const reload = () => {
		userService.getAll(session.get(keys.token))
			.then(result => {
				let arr = result.data.data;
				if(keyword.length > 0 || (filters && filters.keyword && filters.keyword.length > 0)) {
					let f = filters && filters.keyword || keyword;
					arr = arr.filter(k => k.bio.toLowerCase().includes(f.toLowerCase()));
				}

				if(sortBy === "A-Z") {
					arr = arr.sort((a, b) => a.name.localeCompare(b.name));
				}
				else if(sortBy === "Z-A") {
					arr = arr.sort((a, b) => b.name.localeCompare(a.name));
				}
				else if(sortBy === "Newest") {
					arr = arr.sort((a, b) => moment(b.created_at) - moment(a.created_at));
				}

				if(filters) {
					if(filters.major.length > 0) {
						arr = arr.filter(k => k.major.toLowerCase().includes(filters.major.toLowerCase()));
					}
					if(filters.gradeYear.length > 0) {
						arr = arr.filter(k => k.gradYear.toLowerCase() === filters.gradeYear.toLowerCase());
					}
					if(filters.interests.length > 0) {
						arr = arr.filter(k => k.downFor.includes(filters.interests));
					}
					if(filters.from.length > 0) {
						arr = arr.filter(k => k.city.toLowerCase() === filters.from.toLowerCase());
					}
					if(filters.gender.length > 0) {
						arr = arr.filter(k => k.gender.toLowerCase() === filters.gender.toLowerCase());
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

	return (
		<Container>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

			<View style={styles.headerContainer}>
				<TextInput
					left={<SearchIcon />}
					right={<ArrowDownIcon />}
					value={keyword}
					onChange={setKeyword}
					placeholder="Type a keyword to search bios"
				/>
			</View>

			<View style={styles.container}>
				<ProfilesFilter sortBy={sortBy} setSortBy={setSortBy} setFilters={setFilters} />
				<FlatList
					data={records}
					style={styles.list}
					renderItem={renderItem}
					keyExtractor={item => item._id}
					contentContainerStyle={styles.listContent}
					ListHeaderComponent={<Text style={styles.title}>Results</Text>}
					ListEmptyComponent={<Title type="h6" marginHorizontal={20} marginVertical={20}>No data found.</Title>}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
				/>
			</View>
		</Container>
	);
};

const renderItem = ({ item }) => <ProfileListItem data={item} />;

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

export default ProfilesScreen;
