import * as React from 'react';
import {Text} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<CustomText />
============================================================================= */
const CustomText = ({
  flex,
  style,
  align,
  color,
  italic,
  children,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  textTransform,
  numberOfLines,
  marginVertical,
  marginHorizontal,
  ...props
}) => {
  const _style = {
    flex,
    color,
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    textTransform,
    marginVertical,
    marginHorizontal,
    textAlign: align,
  };

  return (
    <Text numberOfLines={numberOfLines} style={[_style, style]} {...props}>
      {children}
    </Text>
  );
};

/* Default Props
============================================================================= */
CustomText.defaultProps = {
  fontSize: 16,
  fontFamily: 'Montserrat-Regular',
  italic: false,
  align: 'left',
  lineHeight: null,
  color: Colors.text,
  marginVertical: 0,
  marginHorizontal: 0,
  numberOfLines: null,
  fontWeight: undefined,
};

/* Export
============================================================================= */
export default CustomText;
