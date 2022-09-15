import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  Container,
  Content,
  View,
  Button,
  Touchable,
  Tag,
} from '../../../common';
import Text from '../../../common/TextV2';
import moment from 'moment';
import PlusIcon from '../../../assets/icons/icon-plus-red.svg';
import PictureIcon from '../../../assets/icons/icon-picture.svg';
import CalendarIcon from '../../../assets/icons/icon-calendar-gray.svg';
import LocationIcon from '../../../assets/icons/icon-location-gray.svg';
import ArrowDownIcon from '../../../assets/icons/icon-arrow-down-red.svg';
import ClockIcon from '../../../assets/icons/icon-clock.svg';
import TrashIcon from '../../../assets/icons/icon-trash-red.svg';
import * as Colors from '../../../config/colors';
import Gap from '../../../common/Gap';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../../config/fonts';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Header from '../../../user/component/Header';
import ModalCalendar from '../../../auth/components/Modal/modalcalendar';

/* =============================================================================
<EventHostScreen/>
============================================================================= */
const EventHostScreen = () => {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');

  const [selectedTag, setSelectedTag] = useState('');

  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [titleEvent, setTitleEvent] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [temporaryDate, setTemporaryDate] = useState(new Date());
  const [eventDate, setEventDate] = useState(null);
  const [dataTags] = useState([
    'Sports',
    'Outdoors',
    'Social',
    'Academic',
    'Greek Life',
    'Entertainment',
  ]);

  const insets = useSafeAreaInsets();

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  const takephotofromLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.3,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // empty action
      } else if (response.errorCode) {
        // empty action
      } else {
        const source = {
          uri: response.assets?.[0].uri,
        };
        setGalleryImage(source);
      }
    });
  };

  const _onConfirmDate = () => {
    setShowCalendar(false);
    setEventDate(temporaryDate);
  };

  return (
    <Container>
      <Header title={'Host an Event'} />

      <Content padding={16}>
        <Text family="medium">Event Title</Text>

        <View style={styles.containerInput}>
          <TextInput
            multiline
            placeholderTextColor={Colors.black500}
            style={styles.input}
            placeholder="Write your post here"
            value={titleEvent}
            onChangeText={value => {
              setTitleEvent(value);
            }}
          />
        </View>
        <Text family="medium">Event Picture</Text>

        {galleryImage ? (
          <View style={styles.containerImage}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image}
              source={galleryImage}>
              <Touchable
                onPress={() => setGalleryImage(null)}
                style={styles.containerTrash}>
                <TrashIcon />
              </Touchable>
            </FastImage>
          </View>
        ) : (
          <Touchable
            style={styles.containerAddImage}
            onPress={takephotofromLibrary}>
            <PictureIcon />
            <Text color={Colors.black500} customStyle={styles.textAddImage}>
              Click to add image
            </Text>
            <PlusIcon />
          </Touchable>
        )}

        <Gap height={16} />

        {/* location  */}
        <Text family="medium">Event Location</Text>
        <Gap height={8} />
        <View style={styles.containerMajor}>
          <TextInput
            placeholderTextColor={Colors.black500}
            style={styles.input}
            placeholder="Enter the event location here"
            value={location}
            onChangeText={value => {
              setLocation(value);
            }}
          />
          <LocationIcon />
        </View>

        <Text family="medium">Event Date</Text>
        <Touchable
          style={styles.containerEventDate}
          onPress={() => setShowCalendar(true)}>
          <Text color={Colors.black500}>
            {eventDate !== null
              ? moment(eventDate).format('MMM DD YYYY')
              : 'Select the date here'}
          </Text>
          <CalendarIcon />
        </Touchable>

        <Text family="medium">Event Time</Text>
        <Gap height={8} />
        <View style={styles.containerEventTime}>
          <Touchable style={styles.timeSelect}>
            <Text color={Colors.primary} customStyle={styles.textTimeSelect}>
              AM
            </Text>
            <ArrowDownIcon />
          </Touchable>

          <View style={styles.borderHeight} />
          <TextInput
            placeholderTextColor={Colors.black500}
            style={styles.inputTime}
            placeholder="Input the Start time here"
            value={startTime}
            onChangeText={value => {
              setStartTime(value);
            }}
          />
          <ClockIcon />
        </View>

        <View style={styles.containerEventTime}>
          <Touchable style={styles.timeSelect}>
            <Text color={Colors.primary} customStyle={styles.textTimeSelect}>
              AM
            </Text>
            <ArrowDownIcon />
          </Touchable>

          <View style={styles.borderHeight} />
          <TextInput
            placeholderTextColor={Colors.black500}
            style={styles.inputTime}
            placeholder="Input the End time here"
            value={endTime}
            onChangeText={value => {
              setEndTime(value);
            }}
          />
          <ClockIcon />
        </View>
        <Text family="medium">Events Descriptions</Text>

        <View style={styles.containerInput}>
          <TextInput
            multiline
            placeholderTextColor={Colors.black400}
            style={[styles.input, {height: 94}]}
            placeholder="Type the event descriptions here"
            value={description}
            onChangeText={value => {
              setDescription(value);
            }}
          />
        </View>

        {/* Add Tag */}
        <Text family="semi">Add Tag</Text>
        <Gap height={12} />
        <View horizontal flex={1} style={{flexWrap: 'wrap'}}>
          {dataTags.map((item, index) => {
            return (
              <Tag
                key={index}
                text={item}
                selected={selectedTag === item}
                onPress={() => setSelectedTag(item)}
                style={styles.tag}
              />
            );
          })}
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Submit"
          onPress={() => console.log('please create function submit')}
        />
      </View>

      <ModalCalendar
        title="Event Date"
        visibleValue={showCalendar}
        onBackdropPress={() => setShowCalendar(false)}
        onBackButtonPress={() => setShowCalendar(false)}
        temporaryDate={temporaryDate}
        onDateChange={date => setTemporaryDate(date)}
        onConfirm={_onConfirmDate}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Colors.border,
  },
  smallLabel: {
    fontSize: 15,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
  containerAddImage: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white200,
  },
  textAddImage: {
    flex: 1,
    marginHorizontal: 10,
  },
  containerInput: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.white200,
  },
  input: {
    marginRight: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
  },
  inputTime: {
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
    flex: 1,
  },
  containerChooseBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white300,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 12,
  },
  containerMajor: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.white200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chooseButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.white200,
  },
  image: {
    width: '100%',
    height: 220,
    alignItems: 'flex-end',
  },
  containerImage: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.black400,
  },
  containerTrash: {
    height: 32,
    width: 32,
    margin: 16,
    borderRadius: 32,
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEventDate: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white200,
  },
  timeSelect: {
    flexDirection: 'row',
  },
  containerEventTime: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.white200,
    alignItems: 'center',
  },
  textTimeSelect: {
    marginRight: 4,
  },
  borderHeight: {
    borderWidth: 1,
    borderColor: Colors.white300,
    height: 24,
    marginHorizontal: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 12,
  },
});

export default EventHostScreen;
