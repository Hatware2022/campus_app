import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Text from '../../../common/TextV2';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Ilustrasi01 from '../../../assets/images/ilustrasi-01.png';
import Ilustrasi02 from '../../../assets/images/ilustrasi-02.png';
import Ilustrasi03 from '../../../assets/images/ilustrasi-03.png';
import * as Colors from '../../../config/colors';
import FastImage from 'react-native-fast-image';

const Swiper = ({type}) => {
  const data = [
    {
      images: Ilustrasi01,
      title: 'Connect with Students',
      content:
        'Instantly find and connect with similar students based on interests, activities and more.',
    },
    {
      images: Ilustrasi02,
      title: 'View Events',
      content: 'See whats happening, where its happening and who is going.',
    },
    {
      images: Ilustrasi03,
      title: 'Join Groups',
      content:
        'Create and join in on interest based groups to discuss or set up activities.',
    },
  ];
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      //   paginationStyle={styles.pagination}
      paginationStyleItem={styles.paginationItem}
      paginationStyleItemActive={styles.paginationItemActive}
      paginationDefaultColor={Colors.black400}
      paginationActiveColor={Colors.primary}
      data={data}
      renderItem={({item}) => (
        <View style={styles.child}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={item.images}
          />
          <Text size="big" family="bold" customStyle={styles.textTitle}>
            {item.title}
          </Text>

          <Text
            color={Colors.black500}
            align="center"
            customStyle={styles.textContent}>
            {item.content}
          </Text>
        </View>
      )}
    />
  );
};

export default Swiper;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  child: {
    width: width,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 292,
    height: 197,
  },
  pagination: {
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  paginationItem: {
    width: 5,
    height: 5,
    marginLeft: 2.5,
    marginRight: 2.5,
    alignSelf: 'center',
  },
  paginationItemActive: {
    width: 15,
    height: 5,
    borderRadius: 3,
  },
  textTitle: {
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 24,
  },
  textContent: {
    textAlign: 'center',
    alignSelf: 'center',
    width: width - 95,
  },
});
