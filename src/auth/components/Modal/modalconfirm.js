import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {View, Button} from '../../../common';
import Gap from '../../../common/Gap';
import Text from '../../../common/TextV2';
import * as Colors from '../../../config/colors';
import LogoutImg from '../../../assets/images/check-logout.png';

const ModalConfirm = ({onYes, onCloseModal, isVisible, titlemessage}) => {
  return (
    <Modal
      style={styles.modalContainerStyle}
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      hideModalContentWhileAnimating>
      <View style={styles.defaultContentContainerStyle}>
        <Gap height={36} />
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
          source={LogoutImg}
        />
        <Gap height={12} />
        <Text
          size="big"
          family="semi"
          customStyle={{maxWidth: 187, textAlign: 'center'}}>
          {titlemessage}
        </Text>
        <Gap height={24} />
        <View borderWidth={1} borderColor={Colors.white300} width={'125%'} />
        <Gap height={24} />
        <View horizontal>
          <Button title="Yes" onPress={onYes} containerStyle={{flex: 1}} />
        </View>
        <Gap height={16} />
        <View horizontal>
          <Button
            title="Cancel"
            onPress={onCloseModal}
            type="outline"
            containerStyle={{flex: 1}}
          />
        </View>
        <Gap height={24} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: {
    marginHorizontal: 61,
  },
  defaultContentContainerStyle: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIcon: {
    paddingTop: 50,
    paddingBottom: 38,
    alignSelf: 'center',
  },
  title: {
    marginBottom: 8,
    alignSelf: 'center',
  },
  description: {
    marginBottom: 28,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  containerButton: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  image: {
    height: 80,
    width: 80,
  },
});

export default ModalConfirm;
