import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import View from './View';
import Text from './Text';
import TextInput from './TextInput';

import Modal from 'react-native-modal';

import SearchIcon from '../assets/icons/app-search.svg';
import ArrowDown from '../assets/icons/arrow-down.svg';

import * as Colors from '../config/colors';
import Button from './Button';
import Content from './Content';
import Select from './Select';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';

/* =============================================================================
<UserFilterModal />
============================================================================= */
const UserFilterModal = ({visible, onClose}) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [keyword, setKeyword] = useState('');
  const [major, setMajor] = useState('');
  const [gradeYear, setGradeYear] = useState('');
  const [gender, setGender] = useState('');
  const [from, setFrom] = useState('');
  const [interests, setInterests] = useState('');
  const [visibleLable, setVisibleLable] = useState('');

  const _safeArea = {
    paddingTop: insets.top,
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setKeyword('');
      setMajor('');
      setGradeYear('');
      setGender('');
      setFrom('');
      setInterests('');
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const _onClose = () => {
    onClose({
      keyword,
      major,
      gradeYear,
      gender,
      from,
      interests,
    });
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={_onClose}
      backdropOpacity={0.5}
      swipeDirection={'right'}
      useNativeDriver={true}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={styles.modal}>
      <View style={styles.container}>
        <MenuProvider>
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
              <TextInput
                left={<SearchIcon />}
                label="Major"
                labelStyle={styles.labelStyle}
                placeholder="Search Major..."
                value={major}
                onChange={setMajor}
              />
              <TouchableOpacity
                onPress={() => {
                  if (visibleLable === 'Grad Year') {
                    setVisibleLable('');
                  } else {
                    setVisibleLable('Grad Year');
                  }
                }}
                style={{
                  height: 46,
                  backgroundColor: Colors.card,
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text>Grad Year {gradeYear}</Text>
                <ArrowDown />
              </TouchableOpacity>
              {visibleLable === 'Grad Year' &&
                ['1 year', '2 years'].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setGradeYear(item);
                      setVisibleLable('');
                    }}
                    style={{
                      height: 46,
                      backgroundColor: Colors.card,
                      justifyContent: 'center',
                      borderRadius: 10,
                      paddingHorizontal: 14,
                      marginVertical: 6,
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}

              {/* <Select
                data={['1 year', '2 years']}
                label="Grad Year"
                value={gradeYear}
                onChange={setGradeYear}
              /> */}
              <Select
                data={['Business', 'Hiking', 'Reading']}
                label="Interests"
                value={interests}
                onChange={setInterests}
              />
              <Select
                data={['City 1', 'City 2']}
                label="From"
                value={from}
                onChange={setFrom}
              />
              <Select
                data={['Male', 'Female']}
                label="Gender"
                value={gender}
                onChange={setGender}
              />
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
        </MenuProvider>
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

export default UserFilterModal;
