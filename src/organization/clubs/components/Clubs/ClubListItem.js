import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Touchable, View, Avatar, Tag} from '../../../../common'
import Text from '../../../../common/TextV2'

import * as Colors from '../../../../config/colors'

import {useNavigation} from '@react-navigation/native'
import ClubMember from './ClubMember'
import Gap from '../../../../common/Gap'
import clubService from '../../../../services/club'
import session from '../../../../store/session'
import keys from '../../../../store/keys'

/* =============================================================================
<ClubListItem />
============================================================================= */
const ClubListItem = ({data, reload}) => {
  const navigation = useNavigation()
  const [joinClub, setJoinClub] = useState(false)
  const previousData = data

  const _moveToDetails = () => {
    navigation.navigate('ClubDetails', {item: previousData})
  }

  const handleJoinClub = id => {
    try {
      clubService
        .join(session.get(keys.token), data.id)
        .then(res => {
          if (res?.data?.success) {
            setJoinClub(true)
            alert('You are now a member the club.')
            reload()
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    } catch (_err) {
      console.log(_err)
    }
  }

  const handleLeaveClub = id => {
    try {
      clubService
        .leave(session.get(keys.token), data.id)
        .then(res => {
          if (res?.data?.success) {
            setJoinClub(false)
            alert('You have left the club.')
            reload()
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    } catch (_err) {
      console.log(_err)
    }
  }

  return (
    <Touchable onPress={_moveToDetails} style={styles.container}>
      <View center>
        <Avatar size={81} source={data?.imageUrl} />
        <Text size="big" family="semi" customStyle={styles.name}>
          {data?.title}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{data?.bio}</Text>
      </View>

      <Text customStyle={styles.tagTitle} size="small" family="semi">
        Down for
        {/* Tags */}
      </Text>

      <View style={styles.tagContainer}>
        {data?.tags.map((item, index) => (
          <Tag key={item.id} text={item.tag} redBorder />
        ))}
      </View>
      <Gap height={16} />
      <ClubMember
        data={data}
        joinClub={joinClub}
        onPress={() =>
          joinClub ? handleLeaveClub(data.id) : handleJoinClub(data.id)
        }
        onPressGroup={() => {}}
      />
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.border,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  name: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white200,
    marginVertical: 16
  },
  tagTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tag: {
    height: 31,
    minWidth: 91,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary
  }
})

export default ClubListItem
