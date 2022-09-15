import React from 'react';

import {View} from '../../../common';
import * as Colors from '../../../config/colors';

const Underline = ({marginHorizontal, marginVertical}) => {
  return (
    <View
      borderWidth={1}
      borderColor={Colors.white300}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
    />
  );
};

Underline.defaultProps = {
  marginHorizontal: -16,
  marginVertical: 24,
};

export default Underline;
