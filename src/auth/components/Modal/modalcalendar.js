import Text from '../../../common/TextV2';
import {Container, View, Button} from '../../../common';
import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Gap from '../../../common/Gap';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import * as Colors from '../../../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ModalCalendar = ({
  visibleValue,
  accessibilityLabel,
  onBackdropPress,
  onBackButtonPress,
  temporaryDate,
  onDateChange,
  onConfirm,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const _safeAreaStyle = {
    paddingBottom: 10 + insets.bottom,
  };
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      hideModalContentWhileAnimating
      useNativeDriver
      isVisible={visibleValue}
      style={styles.modalContainerStyle}
      accessibilityLabel={accessibilityLabel}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}>
      <View
        style={styles.wrapperBox}
        accessibilityLabel="modal_camera"
        testID="modal_camera">
        <View
          style={{
            height: 4,
            width: 40,
            borderRadius: 100,
            backgroundColor: Colors.black400,
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />
        <Text customStyle={{color:'#000', fontWeight:'bold'}} size="big" family="semi">
          {title}
        </Text>
        <View style={styles.containerDatePicker}>
          <DatePicker
            date={temporaryDate}
            locale="id"
            mode="date"
            fadeToColor="none"
            maximumDate={new Date()}
            textColor={Colors.black600}
            onDateChange={onDateChange}
            style={{
              marginTop: 0,
            }}
          />
        </View>

        <Gap height={32} />
        <View style={[styles.containerButton, _safeAreaStyle]}>
          <Button
            title="Confirm"
            onPress={onConfirm}
            containerStyle={{flex: 1}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerDialog: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainerStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerTitle: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  containerSelect: {
    flex: 1,
    justifyContent: 'center',
  },
  flexTwo: {
    flex: 2,
    marginTop: 4,
  },
  alignFlexEnd: {
    alignItems: 'flex-end',
  },
  wrapperBox: {
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 16,
  },
  containerDatePicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
});

export default ModalCalendar;
