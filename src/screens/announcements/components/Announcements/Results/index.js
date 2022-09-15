import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {View, Text} from '../../../../common';

import Filter from './Filter';
import ProfileListItem from './AnnouncementListItem';

import ANNOUNCEMENTS from '../../../../constants/announcements';

/* =============================================================================
<Results />
============================================================================= */
const Results = () => {
  return (
    <View style={styles.container}>
      <Filter />
      <FlatList
        data={ANNOUNCEMENTS}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.title}>Results</Text>}
      />
    </View>
  );
};

const renderItem = ({item}) => <ProfileListItem data={item} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Medium',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Results;
