import React from 'react';
import {StyleSheet} from 'react-native';

import {TextInput, View} from '../../../../common';

import SearchIcon from '../../../../assets/icons/app-search.svg';
import ArrowDownIcon from '../../../../assets/icons/app-arrow-down.svg';

/* =============================================================================
<SearchInput />
============================================================================= */
const SearchInput = () => {
  return (
    <View style={styles.container}>
      <TextInput
        left={<SearchIcon />}
        right={<ArrowDownIcon />}
        placeholder="Search announcements"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default SearchInput;
