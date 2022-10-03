import React, {useEffect, useState} from 'react';
import {StyleSheet, Linking} from 'react-native';
import {View, Touchable} from '../../../../common';
import TiktokIcon from '../../../../assets/icons/app-tiktok.svg';
import LinkedInIcon from '../../../../assets/icons/app-linkedin.svg';
import InstagramIcon from '../../../../assets/icons/app-instagram.svg';
import * as Colors from '../../../../config/colors';

/* =============================================================================
<SocialButtons />
============================================================================= */
const SocialButtons = ({data}) => {
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);

  useEffect(() => {
    if (!data) return;
    // if (data?.insta || data?.insta.length > 0) setBtn1(true);
    // if (data?.tiktok || data?.tiktok.length > 0) setBtn2(true);
    // if (data?.linkedin || data?.linkedin.length > 0) setBtn3(true);
  }, []);

  // const _openIGLink = () => {
  //   if (!data) return;
  //   if (data?.insta || data?.insta.length > 0){
  //     Linking.openURL(data?.insta);
  //   }else{
  //     return
  //   }
  // };
  // const _openTiktokLink = () => {
  //   if (!data) return;
  //   if (!data?.tiktok || data?.tiktok.length === 0) return;
  //   Linking.openURL(data?.tiktok);
  // };
  // const _openLinkedInLink = () => {
  //   if (!data) return;
  //   if (!data?.linkedin || data?.linkedin.length === 0) return;
  //   Linking.openURL(data?.linkedin);
  // };

  return (
    <View style={styles.container}>
        <Touchable style={styles.button}>
          <InstagramIcon />
        </Touchable>

      {btn2 && (
        <Touchable onPress={_openTiktokLink} style={styles.button}>
          <TiktokIcon />
        </Touchable>
      )}

      {btn3 && (
        <Touchable onPress={_openLinkedInLink} style={styles.button}>
          <LinkedInIcon />
        </Touchable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: Colors.white200,
  },
  button: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialButtons;
