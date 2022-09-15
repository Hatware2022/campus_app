import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import DropDownIcon from '../assets/icons/app-carret.svg';

import * as Colors from '../config/colors';

/* =============================================================================
<Select />
============================================================================= */
const Select = ({label, data, value, onChange}) => {
  const _handleChange = inputValue => {
    if (onChange) {
      onChange(inputValue);
    }
  };

  return (
    <Menu onSelect={_handleChange}>
      <MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity}}>
        <View
          style={[styles.container, value ? styles.active : styles.inactive]}>
          {<Text style={styles.label}>{label} </Text>}

          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.value}>
              {value}
            </Text>

            <DropDownIcon />
          </View>
        </View>
      </MenuTrigger>

      <MenuOptions optionsContainerStyle={styles.menuOptionsContainer}>
        {data.map(item => (
          <MenuOption key={item} value={item}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemTxt}>{item}</Text>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
  },
  active: {},
  inactive: {},
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: Colors.label,
    fontFamily: 'Montserrat-Regular',
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: '#24272C',
    fontFamily: 'Montserrat-Regular',
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: 'rgba(36,39,44,0.3)',
    fontFamily: 'Montserrat-Regular',
  },
  dropdownIcon: {
    width: 8.36,
    height: 4.18,
  },
  menuOptionsContainer: {
    width: '85%'
  },
  menuItem: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  menuItemTxt: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Select;
