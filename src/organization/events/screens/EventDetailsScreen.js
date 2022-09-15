import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  View,
  Card,
  Container,
  Content,
  Avatar,
  Title,
  Tag,
  Button,
} from '../../../common';
import Text from '../../../common/TextV2';
import MemberList from '../components/EventDetails/MemberList';
import UserImage from '../../../assets/images/user.png';
import {useRoute} from '@react-navigation/native';
import userService from '../../../services/user';
import eventService from '../../../services/event';
import * as Colors from '../../../config/colors';
import session from '../../../store/session';
import keys from '../../../store/keys';
import utils from '../../../utils/utils';
import moment from 'moment';
import Header from '../../../user/component/Header';
import Underline from '../../../user/component/Underline';
import Gap from '../../../common/Gap';
import LocationIcon from '../../../assets/icons/icon-location.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<EventDetailsScreen />
============================================================================= */
const EventDetailsScreen = props => {
  const route = useRoute();
  const [record, setRecord] = useState(null);
  const [data, setData] = useState(route.params?.data || null);
  const insets = useSafeAreaInsets();

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  useEffect(() => {
    if (!data) return;
    userService.getById(session.get(keys.token), data.userId).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  }, []);

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    eventService.getById(session.get(keys.token), data._id).then(result => {
      if (result.data && result.data.success === true) {
        setData(result.data.data);
      }
    });
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
      imageUrl: record.imageUrl,
    });
    eventService
      .update(session.get(keys.token), data._id, {
        ...data,
        rsvp: arr,
      })
      .then(result => {
        reload();
      });
  };

  if (!data) return <></>;

  return (
    <Container>
      <Header title={'Event Details'} />

      <Content padding={16} bottomSafeArea>
        <View style={styles.userContainer}>
          {record && (
            <>
              <Avatar
                size={48}
                source={{uri: record.imageUrl ? record.imageUrl : null}}
              />
              <Text family="semi" size="big" customStyle={styles.name}>
                {record.firstName} {record.lastName}
              </Text>
            </>
          )}
        </View>

        <Image
          source={{uri: data.imageUrl ? data.imageUrl : null}}
          style={styles.image}
        />

        <Text size="big">{data.title} </Text>

        <View style={styles.tagContainer}>
          {data.tags.map(k => {
            return <Tag text={k} key={k} redBorder />;
          })}
        </View>

        <MemberList rsvp={data.rsvp} />

        <Underline marginHorizontal={0} marginVertical={16} />

        <Text family="semi" size="big">
          When
        </Text>
        <View horizontal marginTop={12}>
          <View style={styles.boxDate}>
            <Text family="semi" color={Colors.primary}>
              {moment(data.date).format('D MMMM YYYY')}
            </Text>
          </View>
          <Gap width={16} />
          <View style={styles.boxDate}>
            <Text family="semi" color={Colors.primary}>
              {moment(data.date).format('h:mm a')}
            </Text>
          </View>
        </View>

        <Gap height={16} />

        <Text family="semi" size="big">
          Where
        </Text>

        <View style={styles.boxLocation}>
          <Text>{data.location}</Text>
          <LocationIcon />
        </View>

        <Gap height={16} />

        <Text family="semi" size="big">
          Description
        </Text>
        <View style={styles.boxDescription}>
          <Text>{data.detail}</Text>
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="RSVP"
          onPress={_handleJoinRsvp}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 266,
    borderRadius: 8,
    marginVertical: 16,
  },
  name: {
    marginLeft: 16,
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    marginVertical: 16,
  },
  boxDate: {
    paddingVertical: 12,
    flex: 1,
    backgroundColor: Colors.white200,
    alignItems: 'center',
    borderRadius: 8,
  },
  boxLocation: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white200,
    marginTop: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
  },
  boxDescription: {
    padding: 16,
    backgroundColor: Colors.white200,
    borderRadius: 8,
    marginTop: 12,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
});

export default EventDetailsScreen;
