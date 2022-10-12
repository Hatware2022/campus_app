import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {
  Container,
  StackHeader,
  Text,
  TextInput,
  View,
  Title,
} from '../../../common';
import ClubPostDetails from '../components/ClubPostComments/ClubPostDetails';
import ClubPostCommentForm from '../components/ClubPostComments/ClubPostCommentForm';
import ClubPostCommentListItem from '../components/ClubPostComments/ClubPostCommentsListItems';
import CHAT_POST_COMMENTS from '../../../constants/groupPostComments';
import * as Colors from '../../../config/colors';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import postService from '../../../services/post';
import session from '../../../store/session';
import keys from '../../../store/keys';
import Header from '../../component/Header';

/* =============================================================================
<ClubPostCommentsScreen />
============================================================================= */
const ClubPostCommentScreen = () => {
  const route = useRoute();
  const [post, setPost] = useState(route.params?.post || null);
  const [comments, setComments] = useState(route.params?.post?.comments || []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

  // useEffect(() => {
  //   reload();
  // }, []);

  const reload = () => {
    postService.getComments(session.get(keys.token), post.id).then(result => {
      if (result.data && result.data.success === true) {
        // setComments(result.data.data); // data not coming accurate
      }
    });
  };

  return (
    <Container>
      <Header title={'Comments'} />
      <FlatList
        style={styles.list}
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ClubPostDetails data={post} reload={reload} />}
        ListEmptyComponent={
          <Title type="h6" marginHorizontal={20} marginVertical={20}>
            No comments found.
          </Title>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
      <ClubPostCommentForm data={post} reload={reload} />
    </Container>
  );
};

const renderCommentItem = ({item}) => <ClubPostCommentListItem data={item} />;

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

export default ClubPostCommentScreen;
