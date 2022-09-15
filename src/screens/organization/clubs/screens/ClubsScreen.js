import React from 'react';
import {FlatList, StatusBar, StyleSheet} from 'react-native';
import {Container, Text, TextInput, View} from '../../../common';

import ClubsFilter from '../components/Clubs/ClubsFilter';
import ClubListItem from '../components/Clubs/ClubListItem';

import SearchIcon from '../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';

import * as Colors from '../../../config/colors';

import CLUBS from '../../../constants/clubs';

/* =============================================================================
<ClubsScreen />
============================================================================= */
const ClubsScreen = () => {
  return (
    <Container>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.headerContainer}>
        <TextInput
          left={<SearchIcon />}
          right={<ArrowDownIcon />}
          placeholder="Search club"
        />
      </View>

      <View style={styles.container}>
        <ClubsFilter />
        <FlatList
          data={CLUBS}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={<Text style={styles.title}>Results</Text>}
        />
      </View>
    </Container>
  );
};

const renderItem = ({item}) => <ClubListItem data={item} />;

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

export default ClubsScreen;
