import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, TextInput, View} from '../../../common';
import Text from '../../../common/TextV2';

import ClubsFilter from '../components/Clubs/ClubsFilter';
import ClubListItem from '../components/Clubs/ClubListItem';

import SearchIcon from '../../../assets/icons/icon-search.svg';
import FilterIcon from '../../../assets/icons/icon-filter.svg';
import ArrowDownIcon from '../../../assets/icons/app-arrow-down.svg';

import * as Colors from '../../../config/colors';

import CLUBS from '../../../constants/clubs';
import ModalFilter from '../../../auth/components/Modal/modalfilter';

/* =============================================================================
<ClubsScreen />
============================================================================= */
const ClubsScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [viewFilter, setViewFilter] = useState(false);
  return (
    <Container backgroundColor={Colors.white200} style={{padding: 16}}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.container}>
        <FlatList
          data={CLUBS}
          style={styles.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <View horizontal>
                <TextInput
                  left={<SearchIcon />}
                  value={keyword}
                  onChange={setKeyword}
                  placeholder="Search clubs here"
                />
                <TouchableOpacity
                  onPress={() => setViewFilter(true)}
                  style={{
                    marginLeft: 8,
                    alignSelf: 'center',
                  }}>
                  <FilterIcon />
                </TouchableOpacity>
              </View>
              <Text size="big" family="semi" customStyle={styles.title}>
                Clubs
              </Text>
            </>
          }
        />
      </View>
      <ModalFilter
        isVisible={viewFilter}
        onCloseModal={() => setViewFilter(false)}
        onYes={() => setViewFilter(false)}
      />
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
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ClubsScreen;
