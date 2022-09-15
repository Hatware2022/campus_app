import * as Colors from '../config/colors';
import {View} from 'react-native';
import * as React from 'react';

const Gap = ({
  height,
  width,
  backgroundColor = Colors.background,
  customStyle,
}) => <View style={{height, width, backgroundColor, ...customStyle}} />;

export default Gap;
