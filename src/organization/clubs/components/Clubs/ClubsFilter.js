import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Text,
  View,
  Touchable,
  Tag,
  OrganizationFilterModal,
} from '../../../../common';

import FilterIcon from '../../../../assets/icons/app-filter.svg';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<ClubsFilter />
============================================================================= */
const ClubsFilter = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('A-Z');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Sort by</Text>

        <Touchable
          style={styles.filterButton}
          onPress={() => setFilterModal(true)}>
          <FilterIcon />
        </Touchable>
      </View>

      <View style={styles.tagContainer}>
        <Tag text="A-Z" selected={sortBy === 'A-Z'} onPress={setSortBy} />
        <Tag text="Z-A" selected={sortBy === 'Z-A'} onPress={setSortBy} />
        <Tag text="Newest" selected={sortBy === 'Newest'} onPress={setSortBy} />
      </View>

      <View style={styles.underline} />

      <OrganizationFilterModal
        visible={filterModal}
        onClose={() => setFilterModal(false)}
      />
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

export default ClubsFilter;
