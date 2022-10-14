import React, {useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import Modal from 'react-native-modal'
import {View, Button} from '../../common'
import Gap from '../../common/Gap'
import Text from '../../common/TextV2'
import * as Colors from '../../config/colors'
import Fonts from '../../config/fonts'

const ReportModal = ({
  isHidden,
  onHide,
  onDelete,
  onReport,
  onCloseModal,
  isVisible,
  titlemessage
}) => {
  const [isReport, setIsReport] = useState(false)
  const [comment, setComment] = useState('')

  return (
    <Modal
      style={styles.modalContainerStyle}
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      hideModalContentWhileAnimating
    >
      {!isReport && (
        <View style={styles.defaultContentContainerStyle}>
          <Gap height={10} />
          <Text
            size="big"
            family="semi"
            customStyle={{maxWidth: 187, textAlign: 'center'}}
          >
            {titlemessage}
          </Text>
          <Gap height={10} />
          <View borderWidth={1} borderColor={Colors.white300} width={'125%'} />
          <Gap height={10} />
          <View horizontal>
            {isHidden ? (
              <Button
                title="Unhide"
                onPress={onHide}
                containerStyle={{flex: 1}}
              />
            ) : (
              <Button
                title="Hide"
                onPress={onHide}
                containerStyle={{flex: 1}}
              />
            )}
          </View>
          <Gap height={5} />
          <View horizontal>
            <Button
              title="Delete"
              onPress={onDelete}
              containerStyle={{flex: 1}}
            />
          </View>
          <Gap height={5} />
          <View horizontal>
            <Button
              title="Report"
              onPress={() => setIsReport(true)}
              containerStyle={{flex: 1}}
            />
          </View>
          <Gap height={10} />
          <View borderWidth={1} borderColor={Colors.white300} width={'125%'} />
          <Gap height={10} />
          <View horizontal>
            <Button
              title="Cancel"
              onPress={onCloseModal}
              type="outline"
              containerStyle={{flex: 1}}
            />
          </View>
          <Gap height={10} />
        </View>
      )}
      {isReport && (
        <View style={styles.defaultContentContainerStyle}>
          <Gap height={10} />
          <Text
            size="big"
            family="semi"
            customStyle={{maxWidth: 187, textAlign: 'center'}}
          >
            Report
          </Text>
          <Gap height={10} />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Enter your report here"
            multiline
            onChangeText={value => setComment(value)}
          />
          <Gap height={10} />
          <View borderWidth={1} borderColor={Colors.white300} width={'125%'} />
          <Gap height={10} />
          <View horizontal>
            <Button
              title="Submit"
              onPress={e => onReport(comment)}
              containerStyle={{flex: 1}}
            />
          </View>
          <Gap height={5} />
          <View horizontal>
            <Button
              title="Cancel"
              onPress={() => setIsReport(false)}
              type="outline"
              containerStyle={{flex: 1}}
            />
          </View>
          <Gap height={10} />
        </View>
      )}
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    marginHorizontal: 61
  },
  defaultContentContainerStyle: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultIcon: {
    paddingTop: 50,
    paddingBottom: 38,
    alignSelf: 'center'
  },
  title: {
    marginBottom: 8,
    alignSelf: 'center'
  },
  description: {
    marginBottom: 28,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 12
  },
  containerButton: {
    flexDirection: 'row',
    marginBottom: 16
  },
  input: {
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600
  },
  image: {
    height: 80,
    width: 80
  }
})

export default ReportModal
