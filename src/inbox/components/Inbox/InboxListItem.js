import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Touchable, View, Avatar} from '../../../common';
import Text from '../../../common/TextV2';
import * as Colors from '../../../config/colors';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import Gap from '../../../common/Gap';

/* =============================================================================
<InboxListItem />
============================================================================= */
const InboxListItem = ({data}) => {
  const navigation = useNavigation();
  const [record, setRecord] = useState(null);

  // useEffect(() => {
  // 	const tokenData = utils.decodeJwt(session.get(keys.token));
  // 	if(!tokenData) return;
  // 	let otherUser = data.members.find(k => k !== tokenData._id);
  // 	if(!otherUser) return;
  // 	userService.getById(session.get(keys.token), otherUser)
  // 		.then(result => {
  // 			if(result.data && result.data.success === true) {
  // 				let r = result.data.data;
  // 				setRecord(r);
  // 			}
  // 		});
  // }, []);

  const _moveToChat = () => {
    navigation.navigate('Chat', {data});
  };

  return (
    <Touchable onPress={_moveToChat} style={styles.container}>
      <Avatar size={48} source={{uri: data.user.avatar}} />
      <View style={styles.centerContainer}>
        <View horizontal alignItems="center" justifyContent="space-between">
          <Text size="big" family="semi">
            {data.user.name}
          </Text>
          <Text size="small" color={Colors.black400}>
            {data.time}
          </Text>
        </View>

        <Gap height={4} />
        <Text numberOfLines={1} color={Colors.black500}>
          {data.message}
        </Text>
      </View>
    </Touchable>
    // <Touchable onPress={_moveToChat} style={styles.container}>
    // 	{
    // 		record &&
    // 		<Avatar size={52} source={{ uri: record.imageUrl ? record.imageUrl : null }} />
    // 	}

    // 	<View style={styles.centerContainer}>
    // 	{
    // 		record &&
    // 		<Text style={styles.name}>{record.firstName} {record.lastName}</Text>
    // 	}
    // 		<Text style={styles.message} numberOfLines={1}>
    // 			{data.title}
    // 		</Text>
    // 	</View>

    // 	<View style={styles.rightContainer}>
    // 		<Text style={styles.time}>{moment(data.updated_at || data.created_at).fromNow()}</Text>
    // 	</View>
    // </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
  },
  message: {
    marginTop: 3,
    color: Colors.secondaryText,
  },
  rightContainer: {
    height: 20,
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText,
  },
});

export default InboxListItem;
