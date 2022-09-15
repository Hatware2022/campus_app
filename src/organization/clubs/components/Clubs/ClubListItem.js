import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar, Tag} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';

import DemoImage from '../../../../assets/images/empty-image.png';

import {useNavigation} from '@react-navigation/native';
import ClubMember from './ClubMember';
import Gap from '../../../../common/Gap';

/* =============================================================================
<ClubListItem />
============================================================================= */
const ClubListItem = ({data}) => {
  const navigation = useNavigation();
  const [joinClub, setJoinClub] = useState(false);

  const _moveToDetails = () => {
    navigation.navigate('ClubDetails', {data});
  };

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View center>
        <Avatar size={81} source={DemoImage} />
        <Text size="big" family="semi" customStyle={styles.name}>
          {data.name}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data.description}</Text>
      </View>

      <Text customStyle={styles.tagTitle} size="small" family="semi">
        Down for
      </Text>

      <View style={styles.tagContainer}>
        {data.tags.map((item, index) => (
          <Tag key={index} text={item} redBorder />
        ))}
      </View>
      <Gap height={16} />
      <ClubMember
        joinClub={joinClub}
        onPress={() => setJoinClub(!joinClub)}
        onPressGroup={() => console.log('create club screen')}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.border,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  name: {
    marginTop: 8,
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginVertical: 16,
  },
  tagTitle: {
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tag: {
    height: 31,
    minWidth: 91,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
  },
});

export default ClubListItem;
