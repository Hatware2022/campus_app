import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Tag from './Tag';

import * as Colors from '../config/colors';

/* =============================================================================
<TagInput />
============================================================================= */
const TagInput = ({
  label,
  values = [],
  labelStyle,
  containerStyle,
  contentContainerStyle,
  onChange,
  tags,
}) => {
  const _handleChange = inputValue => {
    const alreadyExist = values.includes(inputValue);
    if (onChange) {
      if (alreadyExist) {
        onChange(values.filter(item => item !== inputValue));
      } else {
        onChange([...values, inputValue]);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>} */}
      <View style={[styles.contentContainerStyle, contentContainerStyle]}>
        {tags && tags.length > 0 && tags.map(item => (
          <Tag
            key={item}
            text={item}
            onPress={_handleChange}
            backgroundColor={Colors.card}
            selected={values.includes(item)}
            borderColor={values.includes(item) ? Colors.primary : Colors.card}
            style={styles.tag}
          />
        ))}
      </View>
    </View>
  );
};

TagInput.defaultProps = {
  label: undefined,
  labelStyle: {},
  containerStyle: {},
  contentContainerStyle: {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: Colors.label,
    fontFamily: 'Montserrat-Regular',
  },
  contentContainerStyle: {
    width: '100%',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    marginTop: 5,
  },
});

export default TagInput;
