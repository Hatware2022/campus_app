import React, {useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Touchable, Text, View, Avatar, Tag, Button} from '../../../../common';
import * as Colors from '../../../../config/colors';
import UserImage from '../../../../assets/images/user.png';
import {useNavigation} from '@react-navigation/native';
import MemberList from './MemberList';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import userService from '../../../../services/user';
import eventService from '../../../../services/event';
import utils from '../../../../utils/utils';
import moment from 'moment';
import Gap from '../../../../common/Gap';

/* =============================================================================
<EventListItem />
============================================================================= */
const EventListItem = props => {
  const data = props.data;
  const navigation = useNavigation();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    userService.getById(session.get(keys.token), data.userId).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  }, []);

  const _moveToDetails = () => {
    navigation.navigate('EventDetails', {data});
  };

  const _handleJoinRsvp = () => {
    if (!data) return;

    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;

    let arr = data.rsvp;
    let alreadyMember = arr.find(k => k.userId === tokenData._id);
    if (alreadyMember) return;

    arr.push({
      userId: tokenData._id,
      date: moment().format(),
      imageUrl: props.sessionUser.imageUrl,
    });
    eventService
      .update(session.get(keys.token), data._id, {
        ...data,
        rsvp: arr,
      })
      .then(result => {
        if (result.data && result.data.success === true) {
          props.reload();
        }
      });
  };

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userContainer}>
          {record && (
            <>
              <Avatar
                size={56}
                source={{uri: record.imageUrl ? record.imageUrl : null}}
              />
              <Text style={styles.name}>
                {record.firstName} {record.lastName}
              </Text>
            </>
          )}
        </View>
        <Text style={styles.time}>
          {moment(data.date).format('MM/DD/YYYY')}
        </Text>
      </View>

      <View marginTop={16} marginBottom={8}>
        {/* <Text fontSize={15}>
          {data.title}{' '}
          <Text fontFamily="Montserrat-SemiBold">{data.detail}</Text>
        </Text> */}
        <Text size="big">{data.title}</Text>
      </View>

      <Image
        source={{uri: data.imageUrl ? data.imageUrl : null}}
        style={styles.image}
      />

      {/* <View style={styles.bottomContainer}> */}
      <Gap height={16} />
      <View style={styles.tagContainer}>
        {data.tags.map(k => {
          return <Tag text={k} key={k} redBorder />;
        })}
      </View>
      <Gap height={16} />
      <View horizontal justifyContent="space-between">
        <MemberList rsvp={data.rsvp} />
        <Button style={styles.button} title="RSVP" onPress={_handleJoinRsvp} />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    paddingHorizontal: 10,
    // marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: Colors.border,
    backgroundColor: Colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText,
  },
  image: {
    width: '100%',
    height: 232,
    borderRadius: 8,
  },
  bottomContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default EventListItem;
