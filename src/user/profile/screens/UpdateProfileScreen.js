import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform, TextInput} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
  TextArea,
  SimpleRadioButton,
  TagInput,
  Button,
  Select,
  Touchable,
  Card,
  Tag,
} from '../../../common';
import Text from '../../../common/TextV2';

import UserImage from '../../../assets/images/user.png';
import PlusIcon from '../../../assets/icons/icon-plus-red.svg';
import PictureIcon from '../../../assets/icons/icon-picture.svg';
import ArrowRightIcon from '../../../assets/icons/icon-arrow.svg';
import LocationIcon from '../../../assets/icons/icon-location-gray.svg';
import InstagramIcon from '../../../assets/icons/icon-instagram.svg';
import TiktokIcon from '../../../assets/icons/icon-tiktok.svg';
import LinkedinIcon from '../../../assets/icons/icon-linkedin.svg';
import TrashIcon from '../../../assets/icons/icon-trash-red.svg';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import globalStyles from '../../../styles/styles';
import ImagePicker from 'react-native-image-crop-picker';
import imageService from '../../../services/image';
import Header from '../../component/Header';
import Gap from '../../../common/Gap';
import Underline from '../../component/Underline';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../../config/fonts';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

/* =============================================================================
<UpdateProfileScreen/>
============================================================================= */
const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [record, setRecord] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [gradeYear, setGradeYear] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [insta, setInsta] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [interests, setInterests] = useState([]);
  const [activities, setActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [gradYear, setGradYead] = useState('');
  const [diplayGender, setDisplayGender] = useState(false);
  const [location, setLocation] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);

  const insets = useSafeAreaInsets();

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const _update = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;
    userService
      .update(session.get(keys.token), tokenData._id, {
        firstName,
        lastName,
        major,
        gradYear: gradeYear,
        gender,
        bio,
        insta,
        tiktok,
        linkedin,
        interest: activities,
        downFor: interests,
      })
      .then(result => {
        if (result.error) {
          setErrorMessage(result.error);
          return;
        }

        if (result.data && result.data.success === false) {
          setErrorMessage(result.data.message);
          return;
        }

        if (result.data && result.data.success === true) {
          setSuccessMessage(result.data.message);
          reload();
          return;
        }
      });
  };

  const _handleChooseFile = () => {
    try {
      const tokenData = utils.decodeJwt(session.get(keys.token));
      if (!tokenData) return;

      ImagePicker.openPicker({
        cropping: false,
        multiple: false,
      })
        .then(k => {
          const file = {
            name: k.path.split('/').pop(),
            type: k.mime,
            uri: Platform.OS === 'ios' ? k.path.replace('file://', '') : k.path,
          };

          imageService.create(file).then(result => {
            if (result.data && result.data.success === true) {
              userService
                .update(session.get(keys.token), tokenData._id, {
                  imageUrl: result.data.url,
                })
                .then(result1 => {
                  setImageUrl(result.data.url);
                });
            }
          });
        })
        .catch(err => {});
    } catch (err) {}
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

  return (
    <Container>
      <Header title={'Edit Profile'} />

      <Content padding={16}>
        <Text family="semi">Add Image</Text>

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

        <Underline marginHorizontal={0} />

        <View>
          <Text family="semi" size="big">
            Bio
          </Text>
          <Gap height={16} />
          <Text family="medium">Description</Text>

          <View style={styles.containerInput}>
            <TextInput
              multiline
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="Enter your email here"
              value={bio}
              onChangeText={value => {
                setBio(value);
              }}
            />
          </View>

          <Text family="semi" color={Colors.black500}>
            Major
          </Text>
          <Gap height={8} />
          <View style={styles.containerMajor}>
            <TextInput
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="Type your major here"
              value={major}
              onChangeText={value => {
                setMajor(value);
              }}
            />
            <ArrowRightIcon />
          </View>

          {/* Grad Year */}
          <Text family="semi">Grad Year</Text>
          <Gap height={12} />
          <View horizontal>
            <Tag
              text="2022"
              selected={gradYear === '2022'}
              onPress={setGradYead}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
            <Tag
              text="2023"
              selected={gradYear === '2023'}
              onPress={setGradYead}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
            <Tag
              text="2024"
              selected={gradYear === '2024'}
              onPress={setGradYead}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
            <Tag
              text="2025"
              selected={gradYear === '2025'}
              onPress={setGradYead}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
          </View>

          {/* Gender */}
          <Gap height={16} />
          <Text family="semi">Gender</Text>
          <Gap height={8} />
          <View horizontal>
            <Tag
              text="Male"
              selected={gender === 'Male'}
              onPress={setGender}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
            <Tag
              text="Female"
              selected={gender === 'Female'}
              onPress={setGender}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
            <Tag
              text="Non-binary"
              selected={gender === 'Non-binary'}
              onPress={setGender}
              style={{paddingHorizontal: 10, paddingVertical: 6}}
            />
          </View>
          {/* Display gender  */}
          <Gap height={16} />
          <SimpleRadioButton
            label="Display gender on profile"
            selected={diplayGender}
            onChange={() => setDisplayGender(!diplayGender)}
          />
          <Gap height={16} />

          {/* location  */}
          <Text family="semi" color={Colors.black500}>
            From
          </Text>
          <Gap height={8} />
          <View style={[styles.containerMajor, {marginBottom: 0}]}>
            <TextInput
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="Choose where from here"
              value={location}
              onChangeText={value => {
                setLocation(value);
              }}
            />
            <LocationIcon />
          </View>

          <Underline marginHorizontal={0} />

          <Text family="semi" size="big">
            Social Media
          </Text>
          <Gap height={16} />

          {/* social media  */}
          <Text family="semi" color={Colors.black500}>
            Instagram
          </Text>
          <Gap height={8} />
          <View style={[styles.containerMajor]}>
            <TextInput
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="paste your social media link here"
              value={location}
              onChangeText={value => {
                setLocation(value);
              }}
            />
            <InstagramIcon />
          </View>

          {/* social media  */}
          <Text family="semi" color={Colors.black500}>
            Tiktok
          </Text>
          <Gap height={8} />
          <View style={[styles.containerMajor]}>
            <TextInput
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="paste your social media link here"
              value={location}
              onChangeText={value => {
                setLocation(value);
              }}
            />
            <TiktokIcon />
          </View>

          {/* social media  */}
          <Text family="semi" color={Colors.black500}>
            Linkedin
          </Text>
          <Gap height={8} />
          <View style={[styles.containerMajor]}>
            <TextInput
              placeholderTextColor={Colors.black400}
              style={styles.input}
              placeholder="paste your social media link here"
              value={location}
              onChangeText={value => {
                setLocation(value);
              }}
            />
            <LinkedinIcon />
          </View>

          <Underline marginHorizontal={0} />

          <View horizontal justifyContent="space-between" alignItems="center">
            <Text family="medium">Interest</Text>
            <Touchable style={styles.chooseButton}>
              <Text family="medium" color={Colors.primary}>
                Choose Interest
              </Text>
            </Touchable>
          </View>

          <Underline marginHorizontal={0} />

          <View horizontal justifyContent="space-between" alignItems="center">
            <Text family="medium">Down For</Text>
            <Touchable style={styles.chooseButton}>
              <Text family="medium" color={Colors.primary}>
                Choose Down For
              </Text>
            </Touchable>
          </View>
        </View>
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Confirm Change"
          onPress={() => console.log('a')}
        />
      </View>
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
    marginHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
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
});

export default UpdateProfileScreen;
