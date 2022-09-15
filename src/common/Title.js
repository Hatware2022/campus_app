import * as React from 'react';
import {StyleSheet} from 'react-native';
import Text from '../common/TextV2';

import * as Colors from '../config/colors';

/* =============================================================================
<Title />
============================================================================= */
const Title = ({
  type,
  style,
  color,
  fontWeight,
  fontFamily,
  marginVertical,
  marginHorizontal,
  children,
  ...props
}) => {
  const _style = {
    color,
    fontWeight,
    fontFamily,
    marginVertical,
    marginHorizontal,
  };

  return (
    <Text
      customStyle={[
        type === 'h1' && styles.h1,
        type === 'h2' && styles.h2,
        type === 'h3' && styles.h3,
        type === 'h4' && styles.h4,
        type === 'h5' && styles.h5,
        type === 'h6' && styles.h6,
        _style,
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};
Title.defaultProps = {
  color: Colors.text,
  fontFamily: 'Rubik-Regular',
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 40,
  },
  h2: {
    fontSize: 32,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 20,
  },
  h5: {
    fontSize: 16,
  },
  h6: {
    fontSize: 14,
  },
});

export default Title;
