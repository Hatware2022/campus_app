import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Touchable, View, Avatar} from '../../../../common';
import Gap from '../../../../common/Gap';
import Text from '../../../../common/TextV2';
import PeopleIcon from '../../../../assets/icons/icon-people-plus.svg';

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
      <Avatar size={48} source={data.image} />
      <View flex={1} justifyContent="center" marginHorizontal={12}>
        <Text family="semi">{data.name}</Text>
        <Gap height={4} />
        <Text size="small" numberOfLines={1}>
          {data.desc}
        </Text>
      </View>
      <View horizontal alignItems="center">
        <Text>{data.people}</Text>
        <PeopleIcon />
      </View>

      {/* <ImageBackground
        source={data.image}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
        <View style={styles.innerContainer}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </ImageBackground> */}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    paddingVertical: 8,
    // flex: 1,
    // height: 134.1,
    // borderRadius: 5,
    // marginVertical: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
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
