import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Avatar, Card} from '../../../../common';
import moment from 'moment';
import * as Colors from '../../../../config/colors';
import utils from '../../../../utils/utils';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import userService from '../../../../services/user';

/* =============================================================================
<ChatPostCommentListItem />
============================================================================= */
const ChatPostCommentListItem = ({data}) => {

  const [record, setRecord] = useState(null);

	useEffect(() => {
		if(!data) return;
		userService.getById(session.get(keys.token), data.userId)
			.then(result => {
				if(result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

  return (
    <View style={styles.container}>
      { record && 
        <Avatar source={{uri: record.imageUrl ? record.imageUrl : null}} size={45} />
      }
      <View style={styles.right}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{moment(data.date).fromNow()}</Text>
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

export default ChatPostCommentListItem;
