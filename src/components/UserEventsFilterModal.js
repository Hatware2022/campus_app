import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Button from './Button';
import Select from './Select';
import Content from './Content';
import TextInput from './TextInput';

import Modal from 'react-native-modal';

import SearchIcon from '../assets/icons/app-search.svg';

import * as Colors from '../config/colors';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<OrganizationFilterModal />
============================================================================= */
const UserEventsFilterModal = ({visible, onClose}) => {
  const insets = useSafeAreaInsets();
  const [tags, setTags] = useState("");
  const [keyword, setKeyword] = useState('');
  
  const _safeArea = {
    paddingTop: insets.top,
  };

  const _onClose = () => {
    onClose({
      keyword,
      tags
    });
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      swipeDirection={'right'}
      useNativeDriver={true}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={styles.modal}>
      <View style={styles.container}>
        <View style={[styles.header, _safeArea]}>
          <Text style={styles.headerTitle}>Filter By</Text>

          <TextInput
            left={<SearchIcon />}
            label="Start your search"
            labelStyle={styles.labelStyle}
            placeholder="Type Keywords"
            value={keyword}
            onChange={setKeyword}
          />
        </View>

        <Content style={styles.content}>
          <View marginVertical={20}>
            <Select data={['Business', 'Hiking', 'Reading']} label="By tags" value={tags} onChange={setTags} />
          </View>
          <Text color={Colors.primary} fontSize={12}>
            *Click apply filter to apply latest changes
          </Text>
          <Button
            style={styles.applyButton}
            title="Apply Filters"
            onPress={_onClose}
          />
        </Content>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    width: '75%',
    backgroundColor: Colors.background,
  },
  header: {
    padding: 10,
    paddingTop: 20,
    paddingLeft: 40,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    marginVertical: 10,
    color: Colors.background,
  },
  labelStyle: {
    fontSize: 15,
    marginBottom: 10,
    color: Colors.background,
  },
  content: {
    padding: 10,
    paddingLeft: 40,
  },
  applyButton: {
    marginVertical: 40,
  },
});

export default UserEventsFilterModal;
