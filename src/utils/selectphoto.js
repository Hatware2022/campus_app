import {launchImageLibrary} from 'react-native-image-picker';

const SelectPhoto = {};

const takephotofromLibrary = ({setImage = () => {}}) => {
  console.log('AA');
  const options = {
    mediaType: 'photo',
    quality: 0.3,
  };
  launchImageLibrary(options, response => {
    console.log('xkxx');
    if (response.didCancel) {
      // empty action
    } else if (response.errorCode) {
      // empty action
    } else {
      const source = {
        uri: response.assets?.[0].uri,
      };
      setImage(source);
      //   setShowModalCamera(false);
      //   setTargetUri(null);
      //   switch (targetUri) {
      //     case 'imageUri':
      //       setImageSender(source);
      //       setShowModalCamera(false);
      //       setTargetUri(null);
      //       break;

      //     default:
      //   }
    }
  });
};

SelectPhoto.takephotofromLibrary = takephotofromLibrary;

export default SelectPhoto;
