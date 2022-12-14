import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Avatar, Touchable} from '../../../../common';
import Text from '../../../../common/TextV2';

import * as Colors from '../../../../config/colors';
import DotIcon from '../../../../assets/icons/icon-dot.svg';

/* =============================================================================
<GroupPostCommentListItem />
============================================================================= */
const GroupPostCommentListItem = ({data}) => {
  return (
    <View style={styles.container}>
      <Avatar source={data?.user?.avatar} size={34} />

      <View marginLeft={12} flex={1}>
        <View horizontal justifyContent={'space-between'}>
          <Text size="small" family="semi">
            Hardcode Name
          </Text>
          <Text size="small" color={Colors.black400}>
            {data.time}
          </Text>
        </View>

        <Text customStyle={styles.comment}>{data.comment}</Text>

        <View horizontal marginBottom={20}>
          <Touchable
            flex={1}
            onPress={() => console.log('create function reply')}>
            <Text family="semi" color={Colors.black500}>
              Reply
            </Text>
          </Touchable>
          <DotIcon />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  commentCard: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8,
  },
  comment: {
    marginTop: 4,
    marginBottom: 8,
  },
});

export default GroupPostCommentListItem;
