import {launchImageLibrary} from 'react-native-image-picker';

const SelectPhoto = {};

const takephotofromLibrary = ({setImage = () => {}}) => {
  const options = {
    mediaType: 'photo',
    quality: 0.2,
    maxWidth: 500,
    maxHeight: 500,    
  }
  launchImageLibrary(options, response => {
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
