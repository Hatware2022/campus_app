import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  StackHeader,
  View,
  //   Text,
  TextArea,
  TextInput,
  SocialButtons,
  TagInput,
  Button,
  Select,
  Touchable,
  Card,
} from '../../../common';
import Text from '../../../common/TextV2';

import UserImage from '../../../assets/images/user.png';
import LinkedInIcon from '../../../assets/icons/app-linkedin.svg';
import TiktokIcon from '../../../assets/icons/app-tiktok.svg';
import InstagramIcon from '../../../assets/icons/app-instagram.svg';
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
import {useNavigation,useIsFocused} from '@react-navigation/native';
import postService from '../../../services/post';

/* =============================================================================
<EditUserProfileScreen/>
============================================================================= */
const EditUserProfileScreen = () => {
  const isFocused = useIsFocused();
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
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [file, setFile] = useState(null);

  const insets = useSafeAreaInsets();

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  useEffect(() => {
    
    reload();
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused,navigation]);


  const reload = () => {
    const tokenData = utils.decodeJwt(session.get(keys.token));
    if (!tokenData) return;
    userService.getById(session.get(keys.token), tokenData.id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);

        setFirstName(r.firstName);
        setLastName(r.lastName);
        setAddress(r.address)
        setImageUrl(r.imageUrl);
        setMajor(r.major);
        setGradeYear(r.gradYear);
        setGender(r.gender);
        setBio(r.bio);
        setInsta(r.insta);
        setTiktok(r.tiktok);
        setLinkedin(r.linkedin);
        setInterests(r.downFor);
        setActivities(r.interest);
      }
    });
  };

  

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

          const formdatas = new FormData();
          let img = {
            type: k.mime,
            name: 'ddsd',
            uri: k.path
          }
          formdatas.append("image", img);
          postService
          .uploadPostImage(session.get(keys.token), formdatas)
          .then(result => {
            
            if (result.data && result.data.success === true) {
              setImageUrl(result.data.url);
              // postApi(result.data.url)
              // navigation.goBack()
              // props.reload();
            }
          });

          // imageService.create(file).then(result => {
          //   if (result.data && result.data.success === true) {
          //     userService
          //       .update(session.get(keys.token), tokenData._id, {
          //         imageUrl: result.data.url,
          //       })
          //       .then(result1 => {
          //         setImageUrl(result.data.url);
          //       });
          //   }
          // });
        })
        .catch(err => {});
    } catch (err) {}
  };
  console.log('your profile  : ',record)
  // if (!record) return <></>;
  return (
    <Container>
      <Header title={'Your Profile'} />

      <Content bottomSafeArea paddingHorizontal={20} paddingVertical={30}>
        <View center>
          <Avatar
            source={{uri: record?.imageUrl ? record?.imageUrl : null}}
            size={80}
            onPress={_handleChooseFile}
            editProfile={true}
          />
          <Gap height={12} />
          <Text size="big" family="semi">
            {`${record?.name}`}
          </Text>
          <Gap height={16} />
          <SocialButtons data={record} />
        </View>
        <Underline />

        <View>
          <Text family="semi" size="big">
            Bio
          </Text>
          <Gap height={12} />
          <Card>
            <Text customStyle={{minHeight:30,paddingLeft:5}}>{bio}</Text>
          </Card>
        </View>

        <View>
          <Card subCard leftTitle={'Major'} subContent={major} />
          <Card subCard leftTitle={'Year'} subContent={gradeYear} />
          <Card subCard leftTitle={'Gender'} subContent={gender} />
          <Card
            subCard
            leftTitle={'From'}
            subContent={address}
          />

          <View
            borderWidth={1}
            borderColor={Colors.white300}
            marginVertical={24}
          />
        </View>

        <Text family="semi" size="big">
          Interest
        </Text>
        {record?.interest && record?.interest.length > 0 ?
        <TagInput label="Interests" tags={record?.interest} />
        :null}
        <Gap height={12} />

        <Underline marginHorizontal={0} />

        <Text family="semi" size="big">
          Down For
        </Text>
        {record?.downFor && record?.downFor.length > 0 ?
         <TagInput label="Interests" tags={record?.downFor}  />
        :null}
        
      </Content>
      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Edit Profile"
          onPress={() => navigation.navigate('UpdateProfile',{data: record})}
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
});

export default EditUserProfileScreen;
