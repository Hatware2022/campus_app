import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container, StackHeader} from '../../../common';

import GroupPostDetails from '../components/GroupPostComments/GroupPostDetails';
import GroupPostCommentForm from '../components/GroupPostComments/GroupPostCommentForm';
import GroupPostCommentListItem from '../components/GroupPostComments/GroupPostCommentsListItem';

import GROUP_POST_COMMENTS from '../../../constants/groupPostComments';

import * as Colors from '../../../config/colors';

import {useRoute} from '@react-navigation/native';

/* =============================================================================
<GroupPostCommentsScreen />
============================================================================= */
const GroupPostCommentsScreen = () => {
  const route = useRoute();

  const post = route.params?.post || {};

  return (
    <Container>
      <StackHeader type="secondary" title="Comments" />

      <FlatList
        style={styles.list}
        data={GROUP_POST_COMMENTS}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<GroupPostDetails data={post} />}
      />
      <GroupPostCommentForm />
    </Container>
  );
};

const renderCommentItem = ({item}) => <GroupPostCommentListItem data={item} />;

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

export default GroupPostCommentsScreen;
