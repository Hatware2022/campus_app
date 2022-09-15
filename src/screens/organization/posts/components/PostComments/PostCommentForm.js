import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Touchable, View} from '../../../../common';

import * as Colors from '../../../../config/colors';

import SendButtonIcon from '../../../../assets/icons/app-send-button.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import postService from '../../../../services/post';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import utils from '../../../../utils/utils';
import moment from 'moment';

/* =============================================================================
<PostCommentForm />
============================================================================= */
const PostCommentForm = props => {
  const insets = useSafeAreaInsets();
  
	const [comment, setComment] = useState("");

	const _handleComment = () => {

		if (!comment || comment.length === 0) return;
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;

		let arr = Array.from(props.data.comments) || [];
		arr.push({
			userId: tokenData._id,
			comment: comment,
			date: moment().format()
		});
		let t = {
			...props.data,
			comments: arr
		}
		setComment("");
		postService.update(session.get(keys.token), props.data._id, t)
			.then(result => {
				if(result.data && result.data.success === true) {
					props.reload();
				}
			});
	}

  const _safeArea = {
    height: 83 + insets.bottom,
    paddingBottom: insets.bottom,
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={[styles.container, _safeArea]}>
        <TextInput
          style={styles.input}
          placeholder="Type here ..."
          placeholderTextColor={Colors.secondaryText}
					value={comment}
					onChangeText={setComment}
        />
        <Touchable style={styles.button} onPress={_handleComment}>
          <SendButtonIcon />
        </Touchable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 83,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    height: 52,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: Colors.background,
  },
  button: {
    padding: 5,
  },
});

export default PostCommentForm;
