import React, {useState, useEffect} from 'react'
import {Image, StyleSheet} from 'react-native'
import {
  View,
  Card,
  Container,
  Content,
  Avatar,
  Title,
  Tag,
  Button
} from '../../../common'
import Text from '../../../common/TextV2'
import MemberList from '../components/Events/MemberList'
import UserImage from '../../../assets/images/user.png'
import {useIsFocused, useRoute} from '@react-navigation/native'
import userService from '../../../services/user'
import eventService from '../../../services/event'
import * as Colors from '../../../config/colors'
import session from '../../../store/session'
import keys from '../../../store/keys'
import utils from '../../../utils/utils'
import moment from 'moment'
import Header from '../../../user/component/Header'
import Underline from '../../../user/component/Underline'
import Gap from '../../../common/Gap'
import LocationIcon from '../../../assets/icons/icon-location.svg'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import reactotron from 'reactotron-react-native'
import ModalConfirm from '../../../auth/components/Modal/modalconfirm'

/* =============================================================================
<EventDetailsScreen />
============================================================================= */
const EventDetailsScreen = props => {
  const route = useRoute()
  const [record, setRecord] = useState(null)
  const [data, setData] = useState(route.params?.data || null)
  const [viewModal, setViewModal] = useState(false)
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const tokenData = utils.decodeJwt(session.get(keys.token))

  reactotron.log('EVENTS DETAILS! : ', data)
  const _safeArea = {
    marginBottom: 16 + insets.bottom
  }

  useEffect(() => {
    if (!data) return
    userService.getById(session.get(keys.token), tokenData?.id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data
        setRecord(r)
      }
    })
  }, [])

  const _handleJoinRsvp = () => {
    if (!data) return

    if (!tokenData) return

    let arr = data?.membersinfo
    let alreadyMember = arr.find(k => k.id === tokenData.id)
    if (alreadyMember) {
      setViewModal(true)
      return
    }

    arr.push({
      userId: tokenData.id,
      date: moment().format(),
      imageUrl: record.imageUrl
    })
    eventService.joinRSVP(session.get(keys.token), data.id).then(result => {
      //Noted: !!! :Temporary need BE adjustments
      setData({...data, membersinfo: arr})
    })
  }
  const checkIfUserIncludes = () => {
    const result = data?.membersinfo.find(item => item?.id === tokenData?.id)
    return result
  }

  const _cancelRsvp = () => {
    eventService.cancel(session.get(keys.token), data.id).then(result => {
      const res = data?.membersinfo.filter(k => k.id !== tokenData.id)
      reactotron.log('natitia :!! :', res)
      setViewModal(false)
      //Noted: !!! :Temporary need BE adjustments
      setData({...data, membersinfo: res})
    })
  }

  if (!data) return <></>

  return (
    <Container>
      <Header title={'Event Details'} />

      <Content padding={16} bottomSafeArea>
        <View style={styles.userContainer}>
          {data && (
            <>
              <Avatar
                size={48}
                source={
                  data?.userinfo?.imageUrl
                    ? {uri: data?.userinfo?.imageUrl}
                    : null
                }
              />
              <Text family="semi" size="big" customStyle={styles.name}>
                {data?.userinfo?.name}
              </Text>
            </>
          )}
        </View>
        {data?.imageUrl && (
          <Image source={{uri: data.imageUrl}} style={styles.image} />
        )}

        <Text size="big" customStyle={{marginTop: 20}}>
          {data.title}
        </Text>

        <View style={styles.tagContainer}>
          {data?.tags?.map(k => {
            return <Tag text={k} key={k} redBorder />
          })}
        </View>
        <View style={{paddingVertical: 15}}>
          <MemberList data={data?.membersinfo} />
        </View>
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
          <Text>{data?.location || 'Not available'}</Text>
          <LocationIcon />
        </View>

        <Gap height={16} />

        <Text family="semi" size="big">
          Description
        </Text>
        <View style={styles.boxDescription}>
          <Text>{data?.description || 'Not available'}</Text>
        </View>
      </Content>
      {data?.userinfo?.id !== tokenData.id && (
        <View style={styles.containerButton}>
          <Button
            style={[styles.button, _safeArea]}
            type={checkIfUserIncludes() ? 'outline' : 'primary'}
            title={checkIfUserIncludes() ? 'CANCEL RSVP' : 'RSVP'}
            onPress={_handleJoinRsvp}
          />
        </View>
      )}
      <ModalConfirm
        titlemessage={'Are you sure want to cancel this RVSP?'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onYes={_cancelRsvp}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 266,
    borderRadius: 8,
    marginVertical: 16
  },
  name: {
    marginLeft: 16
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    marginVertical: 16
  },
  boxDate: {
    paddingVertical: 12,
    flex: 1,
    backgroundColor: Colors.white200,
    alignItems: 'center',
    borderRadius: 8
  },
  boxLocation: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white200,
    marginTop: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8
  },
  boxDescription: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white200,
    borderRadius: 8,
    marginTop: 12
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300
  },
  button: {
    margin: 16
  }
})

export default EventDetailsScreen
