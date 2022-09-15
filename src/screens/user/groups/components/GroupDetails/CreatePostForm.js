import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Tag,
  View,
  Text,
  Avatar,
  Button,
  Touchable,
  TextArea,
} from '../../../../common';

import UserImage from '../../../../assets/images/user.png';
import AddImageIcon from '../../../../assets/icons/app-add-image.svg';
import PlusIcon from '../../../../assets/icons/app-plus.svg';

import * as Colors from '../../../../config/colors';

/* =============================================================================
<CreatePostForm />
============================================================================= */
const CreatePostForm = () => {
  const [tags, setTags] = useState(['For Sale', 'Partying', 'Surfing']);
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <View center>
        <Button
          width={143}
          height={42}
          title="Create post"
          onPress={() => setShowForm(true)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userContainer}>
          <Avatar source={UserImage} size={56} />
          <Text style={styles.name}>Angela Belli </Text>
        </View>

        <Touchable style={styles.uploadBtn}>
          <AddImageIcon />
          <Text style={styles.uploadBtnText}>Upload Image</Text>
        </Touchable>
      </View>

      <TextArea placeholder="Write your post here" />

      <View>
        <Text style={styles.tagTitle}>Add Tags</Text>

        <View style={styles.tagContainer}>
          {tags.map((item, index) => (
            <Tag text={item} key={index} style={styles.tag} />
          ))}

          <Touchable style={styles.addTagButton}>
            <PlusIcon />
          </Touchable>
        </View>
      </View>

      <Button
        title="Post"
        style={styles.postButton}
        onPress={() => setShowForm(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.border,
    backgroundColor: Colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    paddingLeft: 10,
  },
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnText: {
    fontSize: 7,
    marginTop: 5,
    color: Colors.secondaryText,
  },
  tagTitle: {
    marginTop: 10,
    marginBottom: 5,
  },
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  tag: {
    borderColor: Colors.card,
    backgroundColor: Colors.card,
  },
  addTagButton: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    width: 107,
    height: 40,
    marginTop: 20,
  },
});

export default CreatePostForm;
