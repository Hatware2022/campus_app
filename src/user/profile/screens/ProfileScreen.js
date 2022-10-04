import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Avatar, Content, Container, Button} from '../../../common';
import Text from '../../../common/TextV2';

import UserImage from '../../../assets/images/user.png';
import SettingListItem from '../components/Profile/SettingListItem';

import * as Colors from '../../../config/colors';

import session from '../../../store/session';
import keys from '../../../store/keys';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import userService from '../../../services/user';
import utils from '../../../utils/utils';
import {useIsFocused} from '@react-navigation/native';
import PeopleIcon from '../../../assets/icons/icon-people.svg';
import CalendarIcon from '../../../assets/icons/icon-calendar.svg';
import GroupIcon from '../../../assets/icons/icon-group.svg';
import NotificationIcon from '../../../assets/icons/icon-notification.svg';
import StarIcon from '../../../assets/icons/icon-star.svg';
import BlockIcon from '../../../assets/icons/icon-block.svg';
import Gap from '../../../common/Gap';
import ModalConfirm from '../../../auth/components/Modal/modalconfirm';
import DemoImage from '../../../assets/images/empty-image.png';

/* =============================================================================
<ProfileScreen />
============================================================================= */
const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [record, setRecord] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const tokenData = utils.decodeJwt(session.get(keys.token)) || null;

  const _safeArea = {
    paddingTop: 16 + insets.top,
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const reload = () => {
    if (!tokenData) return;
    userService.getById(session.get(keys.token), tokenData.id).then(result => {     
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  };

  const _handleLogout = () => {
    session.logout();
    navigation.navigate('Login');
  };

  // if (!record) return <></>;

  return (
    <Container backgroundColor={Colors.background}>
      <View style={[styles.userContainer, _safeArea]}>
        <Text color={Colors.whiteText} family="bold" size="big">
          My Profile
        </Text>
        <View horizontal marginTop={12} alignItem="center">
          <Avatar
            size={48}
            source={record?.imageUrl ?{uri: record?.imageUrl ? record?.imageUrl : DemoImage} :DemoImage}
          />
          <View paddingHorizontal={16} justifyContent="center">
            <Text color={Colors.whiteText} family="semi" size="big">
              {record?.name}
            </Text>
            <Text color={Colors.whiteText}>{tokenData && tokenData?.email ? tokenData?.email : ''}</Text>
          </View>
        </View>
      </View>

      <Content padding={16}>
        <Gap height={8} />
        <Text size="big" family="semi">
          Account
        </Text>
        <SettingListItem
          name="Edit Profiles"
          onPress={() => navigation.navigate('EditUserProfile')}
          icon={<PeopleIcon />}
        />
        <SettingListItem
          name="Your Events"
          onPress={() => navigation.navigate('YourEvent')}
          icon={<CalendarIcon />}
        />
        <SettingListItem
          name="Saved Groups"
          onPress={() => navigation.navigate('SavedGroup')}
          icon={<GroupIcon />}
        />
        <SettingListItem
          name="Saved Clubs"
          onPress={() => navigation.navigate('SavedClub')}
          icon={<StarIcon />}
        />
        <SettingListItem
          name="Edit Notification Setting"
          onPress={() => navigation.navigate('UserNotificationSettings')}
          icon={<NotificationIcon />}
        />
        <SettingListItem
          name="Block List"
          onPress={() => navigation.navigate('BlockList')}
          icon={<BlockIcon />}
        />
        <Gap height={24} />
        <Text size="big" family="semi">
          Other
        </Text>
        <SettingListItem
          name="Term & Condition"
          onPress={() => navigation.navigate('TermCondition')}
        />
        <SettingListItem
          name="Cookies"
          onPress={() => navigation.navigate('Cookies')}
        />
        <Gap height={16} />

        <Button
          title="Log Out"
          type="outline"
          onPress={() => setViewModal(true)}
        />
      </Content>
      <ModalConfirm
        titlemessage={'Are you sure want to log out?'}
        isVisible={viewModal}
        onCloseModal={() => setViewModal(false)}
        onYes={_handleLogout}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  name: {
    fontSize: 20,
    color: Colors.background,
    fontFamily: 'Montserrat-Bold',
  },
  vieProfile: {
    color: Colors.background,
  },
  userTextContainer: {
    paddingHorizontal: 16,
  },
  detailName: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Rubik-Bold',
  },
});

export default ProfileScreen;
