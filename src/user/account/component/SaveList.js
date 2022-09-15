import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, View, Button} from '../../../common';
import Text from '../../../common/TextV2';
import UserImage from '../../../assets/images/user.png';

/* =============================================================================
<SavedList />
============================================================================= */
const SavedList = ({title, avatar, buttonTitle, onPress}) => {
  return (
    <View horizontal alignItems={'center'} marginVertical={12}>
      <Avatar size={38} source={{uri: avatar}} />
      <Text family="bold" customStyle={styles.text}>
        {title}
      </Text>
      <Button
        type={'outline'}
        onPress={onPress}
        title={buttonTitle}
        style={{paddingHorizontal: 8, paddingVertical: 4}}
      />
    </View>
  );
};

SavedList.defaultProps = {
  avatar: null,
};

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    flex: 1,
  },
});

export default SavedList;
