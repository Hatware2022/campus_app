import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Text, View, Touchable, Tag} from '../../../../common';

import FilterIcon from '../../../../assets/icons/app-filter.svg';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<Filter />
============================================================================= */
const Filter = () => {
  const [sortBy, setSortBy] = useState('Newest');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Sort by</Text>

        <Touchable style={styles.filterButton}>
          <FilterIcon />
        </Touchable>
      </View>

      <View style={styles.tagContainer}>
        <Tag text="Newest" value={sortBy} onPress={setSortBy} />
        <Tag
          text="New to Old"
          value={sortBy}
          onPress={setSortBy}
          style={styles.newToOldTag}
        />
        <Tag text="Latest" value={sortBy} onPress={setSortBy} />
      </View>

      <View style={styles.underline} />
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
  newToOldTag: {
    paddingHorizontal: 25,
  },
  underline: {
    height: 1,
    marginTop: 10,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
  },
});

export default Filter;
