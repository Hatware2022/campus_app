import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Avatar, Touchable} from '../../../../common';
import moment from 'moment';
import Text from '../../../../common/TextV2';
import * as Colors from '../../../../config/colors';
import utils from '../../../../utils/utils';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import userService from '../../../../services/user';
import DotIcon from '../../../../assets/icons/icon-dot.svg';

/* =============================================================================
<ChatPostCommentListItem />
============================================================================= */
const ChatPostCommentListItem = ({data}) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (!data) return;
    userService.getById(session.get(keys.token), data.userId).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {record && (
        <Avatar
          source={{uri: record.imageUrl ? record.imageUrl : null}}
          size={34}
        />
      )}

      <View marginLeft={12} flex={1}>
        <View horizontal justifyContent={'space-between'}>
          <Text size="small" family="semi">
            Hardcode Name
          </Text>
          <Text size="small" color={Colors.black400}>
            {moment(data.date).fromNow()}
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

export default ChatPostCommentListItem;
