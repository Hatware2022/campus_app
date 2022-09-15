import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
  Card,
  Title,
  Tag,
  Touchable,
  TagInput,
  Button,
} from '../../../common';
import Text from '../../../common/TextV2';
import UserImage from '../../../assets/images/user.png';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import {useRoute} from '@react-navigation/native';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import BackIcon from '../../../assets/icons/icon-back.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../../../common/Gap';
import Header from '../../component/Header';
import SavedList from '../component/SaveList';

/* =============================================================================
<Cookies />
============================================================================= */
const Cookies = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header title={'Cookies'} />

      <Content padding={16} style={{marginBottom: insets.bottom}}>
        <Gap height={4} />
        <Text size="small" color={Colors.black500}>
          <Text family="semi" size="small">
            HTTP cookies
          </Text>{' '}
          (also called web cookies, Internet cookies, browser cookies, or simply
          cookies) are small blocks of data created by a web server while a user
          is browsing a website and placed on the user's computer or other
          device by the user's web browser. Cookies are placed on the device
          used to access a website, and more than one cookie may be placed on a
          user's device during a session.
        </Text>

        <Gap height={16} />
        <Text size="small" color={Colors.black500}>
          Cookies serve useful and sometimes essential functions on the web.
          They enable web servers to store stateful information (such as items
          added in the shopping cart in an online store) on the user's device or
          to track the user's browsing activity (including clicking particular
          buttons, logging in, or recording which pages were visited in the
          past).[1] They can also be used to save for subsequent use information
          that the user previously entered into form fields, such as names,
          addresses, passwords, and payment card numbers.
        </Text>

        <Gap height={16} />
        <Text size="small" color={Colors.black500}>
          Authentication cookies are commonly used by web servers to
          authenticate that a user is logged in, and with which account they are
          logged in. Without the cookie, users would need to authenticate
          themselves by logging in on each page containing sensitive information
          that they wish to access. The security of an authentication cookie
          generally depends on the security of the issuing website and the
          user's web browser, and on whether the cookie data is encrypted.
          Security vulnerabilities may allow a cookie's data to be read by an
          attacker, used to gain access to user data, or used to gain access
          (with the user's credentials) to the website to which the cookie
          belongs (see cross-site scripting and cross-site request forgery for
          examples).
        </Text>

        <Gap height={16} />
        <Text size="small" color={Colors.black500}>
          Tracking cookies, and especially third-party tracking cookies, are
          commonly used as ways to compile long-term records of individuals'
          browsing histories — a potential privacy concern that prompted
          European and U.S. lawmakers to take action in 2011. European law
          requires that all websites targeting European Union member states gain
          "informed consent" from users before storing non-essential cookies on
          their device.
        </Text>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    flex: 1,
  },
});

export default Cookies;
