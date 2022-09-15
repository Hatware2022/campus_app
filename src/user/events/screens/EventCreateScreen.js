import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Content,
  Avatar,
  Container,
  StackHeader,
  TextInput,
  TextArea,
  Touchable,
  Title,
  Tag,
  Button,
} from '../../../common';

import DemoImage from '../../../assets/images/empty-image.png';

import PlusIcon from '../../../assets/icons/app-plus.svg';
import AddImageIcon from '../../../assets/icons/app-add-image.svg';

import * as Colors from '../../../config/colors';

/* =============================================================================
<EventCreateScreen />
============================================================================= */
const EventCreateScreen = () => {
  const isFocused = useIsFocused();
	const [record, setRecord] = useState(null);
	const [tags, setTags] = useState([]);
	const [post, setPost] = useState("");
	const [file, setFile] = useState(null);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			setRecord(null);
			setTags([]);
			setPost("");
			setFile(null);
		}

		return () => { isMounted = false };
	}, [isFocused]);

	useEffect(() => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if(!tokenData) return;
		userService.getById(session.get(keys.token), tokenData._id)
			.then(result => {
				if(result.data && result.data.success === true) {
					let r = result.data.data;
					setRecord(r);
				}
			});
	}, []);

  const _handlePost = () => {
		if(!file) return;
		imageService.create(file)
			.then(imageResponse => {

				if (imageResponse.data.success === true) {

					postService.create(session.get(keys.token), {
						userId: record._id,
						detail: post,
						tags: tags,
						imageUrl: imageResponse.data.url
					})
						.then(result => {
							if (result.data && result.data.success === true) {
								setShowForm(false);
								props.reload();
							}
						});
				}
			});
	}

	const _handleChooseFile = () => {
		try {
			ImagePicker.openPicker({
				cropping: false,
				multiple: false
			})
			.then(k => {
				setFile({
					name: k.path.split("/").pop(),
					type: k.mime,
					uri: Platform.OS === 'ios' ? k.path.replace('file://', '') : k.path
				});
			})
            .catch(err => {});
		}
		catch (err) { }
	}

  return (
    <Container>
      <StackHeader type="secondary" title="Create Post" />

      <Content padding={20} bottomSafeArea>
        <View style={styles.userDetails}>
          <Avatar source={DemoImage} size={56} />
          <Text marginHorizontal={10}>Comp Science</Text>
        </View>

        <View marginVertical={10}>
          <TextInput placeholder="Add title here" />
        </View>

        <Touchable style={styles.addImageContainer}>
          <AddImageIcon />
          <Text marginVertical={10} fontSize={15}>
            Add Image
          </Text>
        </Touchable>

        <Title marginVertical={10} type="h4">
          Choose Tags
        </Title>

        <View style={styles.tagContainer}>
          <TagInput
            label="Choose Tags"
            values={tags}
            onChange={setTags}
            tags={['Business', 'Hiking', 'Reading']}
          />

          <Touchable style={styles.addTagButton}>
            <PlusIcon />
          </Touchable>
        </View>

        <TextArea label="About" placeholder="Add Text about event here" />

        <TextInput label="When" placeholder="MM/DD/YYYY" />

        <TextInput placeholder="Insert date and time of day" />

        <TextInput label="Where" placeholder="Add title here" />

        <View center>
          <Button title="Post" style={styles.postButton} />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImageContainer: {
    width: '100%',
    height: 250,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  tagContainer: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
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
    marginVertical: 10,
  },
});

export default EventCreateScreen;
