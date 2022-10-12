import React from 'react'
import {StyleSheet, TextInput, ActivityIndicator} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Avatar, Touchable, View} from '../../../common'

// import SendIcon from '../../../assets/icons/app-send.svg';
import SendIcon from '../../../assets/icons/icon-send-message.svg'
import EmojiIcon from '../../../assets/icons/icon-emoji.svg'

import * as Colors from '../../../config/colors'

/* =============================================================================
<Composer />
============================================================================= */
const Composer = ({loading, text, onChange, onSend, imageUrl}) => {
  const insets = useSafeAreaInsets()

  const _layout = {
    minHeight: 58 + insets.bottom,
    paddingBottom: insets.bottom
  }

  const _handleSend = () => {
    onSend({text})
  }

  return (
    <View style={[styles.container, _layout]}>
      <View
        horizontal
        style={{
          flex: 1
        }}
      >
        <Avatar size={40} source={imageUrl ? {uri: imageUrl} : null} />
        <TextInput
          multiline
          numberOfLines={3}
          value={text}
          style={styles.input}
          placeholderTextColor={Colors.secondaryText}
          placeholder={'Type Something'}
          onChangeText={onChange}
        />
      </View>

      <Touchable
        style={[
          styles.button,
          {
            opacity: !text ? 0.3 : 1
          }
        ]}
        disabled={!text || loading}
        onPress={_handleSend}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <SendIcon />
        )}
      </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    fontFamily: 'SFProDisplay-Regular',
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    backgroundColor: Colors.white200
  },
  button: {
    width: 36,
    height: 36,
    marginLeft: 8,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary
  }
})

export default Composer
