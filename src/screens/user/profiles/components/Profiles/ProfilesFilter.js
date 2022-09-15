import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Text, View, Touchable, Tag, UserFilterModal} from '../../../../common';

import FilterIcon from '../../../../assets/icons/app-filter.svg';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<ProfilesFilter />
============================================================================= */
const ProfilesFilter = (props) => {
  const [filterModal, setFilterModal] = useState(false);

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
        <Tag text="A-Z" selected={props.sortBy === 'A-Z'} onPress={props.setSortBy} />
        <Tag text="Z-A" selected={props.sortBy === 'Z-A'} onPress={props.setSortBy} />
        <Tag text="Newest" selected={props.sortBy === 'Newest'} onPress={props.setSortBy} />
      </View>

      <View style={styles.underline} />

      <UserFilterModal
        visible={filterModal}
        onClose={obj => {props.setFilters(obj); setFilterModal(false)}}
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

export default ProfilesFilter;
