import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Avatar, Card} from '../../../../common';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<GroupPostCommentListItem />
============================================================================= */
const GroupPostCommentListItem = ({data}) => {
  return (
    <View style={styles.container}>
      <Avatar source={data?.user?.avatar} size={45} />

      <View style={styles.right}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{data.time}</Text>
        </View>
        <Card style={styles.commentCard}>
          <Text style={styles.comment}>{data.comment}</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: Colors.border,
  },
  right: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 11,
    color: Colors.secondaryText,
  },
  commentCard: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8,
  },
  comment: {
    fontSize: 11,
  },
});

export default GroupPostCommentListItem;
