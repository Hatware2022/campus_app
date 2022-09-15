import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Container, StackHeader, Title} from '../../../common';

import PostDetails from '../components/PostComments/PostDetails';
import PostCommentForm from '../components/PostComments/PostCommentForm';
import PostCommentsListItem from '../components/PostComments/PostCommentsListItem';

import POST_COMMENTS from '../../../constants/postComments';

import * as Colors from '../../../config/colors';

import {useRoute} from '@react-navigation/native';
import postService from '../../../services/post';
import session from '../../../store/session';
import keys from '../../../store/keys';

/* =============================================================================
<PostCommentsScreen />
============================================================================= */
const PostCommentsScreen = () => {
  const route = useRoute();
  const [post, setPost] = useState(route.params?.post || null);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = () => {
		setRefreshing(true);
		reload();
		setRefreshing(false);
	}

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
    if(!post) return;
		postService.getById(session.get(keys.token), post._id)
			.then(result => {
				if(result.data && result.data.success === true) {
					setPost(result.data.data);
				}
			});
	}

  return (
    <Container>
      <StackHeader type="secondary" title="Comments" />

      <FlatList
        style={styles.list}
        data={post.comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<PostDetails data={post} />}
				ListEmptyComponent={<Title type="h6" marginHorizontal={20} marginVertical={20}>No data found.</Title>}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
      />
      <PostCommentForm data={post} reload={reload} />
    </Container>
  );
};

const renderCommentItem = ({item}) => <PostCommentsListItem data={item} />;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    borderRadius: 10,
    paddingBottom: 20,
    backgroundColor: Colors.background,
    shadowColor: Colors.border,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default PostCommentsScreen;
