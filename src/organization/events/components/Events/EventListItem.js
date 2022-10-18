import * as Colors from '../../../../config/colors'

import {Avatar, Button, Tag, Text, Touchable, View} from '../../../../common'
import {Image, StyleSheet} from 'react-native'
import React, {useState} from 'react'

import Gap from '../../../../common/Gap'
import MemberList from './MemberList'
import ModalConfirm from '../../../../auth/components/Modal/modalconfirm'
import a11y from '../../../../utils/accessibility'
import eventService from '../../../../services/event'
import keys from '../../../../store/keys'
import moment from 'moment'
import reactotron from 'reactotron-react-native'
import session from '../../../../store/session'
import utils from '../../../../utils/utils'

/* =============================================================================
<EventListItem />
============================================================================= */
const EventListItem = props => {
  const data = props?.data
  const [viewModal, setViewModal] = useState(false)

  const tokenData = utils.decodeJwt(session.get(keys.token))

  const _handleJoinRsvp = () => {
    if (!data) {
      return
    }
    if (!tokenData) {
      return
    }

    let arr = data.membersinfo
    let alreadyMember = arr.find(k => k?.id === tokenData?.id)
    if (alreadyMember) {
      setViewModal(true)
      return
    } else {
      arr?.push({
        userId: tokenData?.id,
        date: moment()?.format(),
        imageUrl: props?.sessionUser?.imageUrl || null
      })
      eventService.joinRSVP(session.get(keys.token), data.id).then(result => {
        if (result?.data && result?.data?.success === true) {
          props.reload()
        }
      })
    }
  }

  const _cancelRsvp = () => {
    eventService.cancel(session.get(keys.token), data.id).then(result => {
      const res = data?.membersinfo.filter(k => k.id !== tokenData.id)
      reactotron.log('natitia :!! :', res)
      setViewModal(false)
      props.reload()
    })
  }

  const checkIfUserIncludes = () => {
    const result = data?.membersinfo.find(item => item?.id === tokenData?.id)
    return result
  }

  const maxFontSizeMultiplier = 1.5
  return (
    <>
      <Touchable onPress={() => props.onPress(data)} style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <>
              <Avatar
                size={56}
                source={
                  data?.userinfo?.imageUrl
                    ? {uri: data?.userinfo?.imageUrl}
                    : null
                }
              />
              <Text
                style={styles.name}
                {...a11y(`event created by ${data?.userinfo?.name}`)}
              >
                {data?.userinfo?.name}
              </Text>
            </>
          </View>
          <Text
            style={styles.time}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            {moment(data?.createdAt).fromNow()}
          </Text>
        </View>

        <View marginTop={16} marginBottom={8}>
          {/* <Text fontSize={15}>
          {data.title}{' '}
          <Text fontFamily="Montserrat-SemiBold">{data.detail}</Text>
        </Text> */}
          <Text size="big">{data?.title}</Text>
        </View>
        {data?.imageUrl && (
          <Image source={{uri: data?.imageUrl}} style={styles.image} />
        )}

        {/* <View style={styles.bottomContainer}> */}
        <Gap height={16} />
        <View style={styles.tagContainer} {...a11y('list of event tags')}>
          {data && data?.tags.length > 0 && data?.tags?.map(k => {
            return <Tag text={k} key={k} redBorder />
          })}
        </View>
        <Gap height={16} />
        <View horizontal justifyContent="space-between">
          <MemberList data={data?.membersinfo} />
          {tokenData.id !== data?.userinfo?.id && (
            <Button
              style={styles.button}
              type={checkIfUserIncludes() ? 'outline' : 'primary'}
              title={'RSVP'}
              onPress={_handleJoinRsvp}
            />
          )}
        </View>
      </Touchable>
      <ModalConfirm
        titlemessage={'Are you sure want to cancel this RVSP?'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onYes={_cancelRsvp}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 16,
    marginBottom: 10,
    padding: 22,
    paddingHorizontal: 16,
    // marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: Colors.border,
    backgroundColor: Colors.background,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 15,
    marginLeft: 10
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText
  },
  image: {
    width: '100%',
    height: 232,
    borderRadius: 8
  },
  bottomContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})

export default EventListItem
