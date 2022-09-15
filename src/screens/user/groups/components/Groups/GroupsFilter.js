import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Text, View, Touchable, Tag, UserFilterModal} from '../../../../common';

import FilterIcon from '../../../../assets/icons/app-filter.svg';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<GroupsFilter />
============================================================================= */
const GroupsFilter = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('Most Popular');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Sort by</Text>

        {/* <Touchable
          style={styles.filterButton}
          onPress={() => setFilterModal(true)}>
          <FilterIcon />
        </Touchable> */}
      </View>

      <View style={styles.tagContainer}>
        <Tag
          text="Most Popular"
          selected={sortBy === 'Most Popular'}
          onPress={setSortBy}
        />
        <Tag
          text="Newest First"
          selected={sortBy === 'Newest First'}
          onPress={setSortBy}
        />
        <Tag
          text="Oldest First"
          selected={sortBy === 'Oldest First'}
          onPress={setSortBy}
        />
      </View>

     <View style={styles.underline} />
      {/* 
      <UserFilterModal
        visible={filterModal}
        onClose={() => setFilterModal(false)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: 41,
    height: 41,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  tagContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  underline: {
    height: 1,
    marginTop: 10,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
  },
});

export default GroupsFilter;
