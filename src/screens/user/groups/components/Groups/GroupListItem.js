import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Touchable, Text, View} from '../../../../common';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<GroupListItem />
============================================================================= */
const GroupListItem = ({data}) => {
  const navigation = useNavigation();

  const _moveToDetails = () => {
    navigation.navigate('GroupDetails', {data});
  };

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <ImageBackground
        source={data.image}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
        <View style={styles.innerContainer}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </ImageBackground>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 134.1,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: 151.3,
    height: 134.1,
  },
  backgroundImageStyle: {
    borderRadius: 15,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  name: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.background,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default GroupListItem;
