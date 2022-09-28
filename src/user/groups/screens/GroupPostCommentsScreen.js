import React, { useEffect, useState } from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container, StackHeader} from '../../../common';
import Header from '../../component/Header';

import GroupPostDetails from '../components/GroupPostComments/GroupPostDetails';
import GroupPostCommentForm from '../components/GroupPostComments/GroupPostCommentForm';
import GroupPostCommentListItem from '../components/GroupPostComments/GroupPostCommentsListItem';

import GROUP_POST_COMMENTS from '../../../constants/groupPostComments';
 
import * as Colors from '../../../config/colors';

import {useRoute} from '@react-navigation/native';
import postService from '../../../services/post';
import session from '../../../store/session';
import keys from '../../../store/keys';

/* =============================================================================
<GroupPostCommentsScreen />
============================================================================= */
const GroupPostCommentsScreen = () => {
  const route = useRoute();
  const post = route.params?.post || {};
  const userName = route.params?.userName || 'Dummy';
 
  const [allComments,setAllComments]= useState(route.params?.post?.comments || [])

 
  useEffect(()=>{
    // getComments()
  },[])

  // const getComments =()=>{
  //   postService
  //   .getComments(session.get(keys.token), post.id)
  //   .then(result => {
  //     alert(JSON.stringify(result))
  //     if (result.data && result.data.success === true) {
  //     }
  //   });
  // }

  const handleSendComment =(e)=>{
    let data ={
      "comment" :e,
      "postId": post.id
    }
    postService
    .addComment(session.get(keys.token), data)
    .then(result => {
      alert(JSON.stringify(result))
      if (result.data && result.data.success === true) {
        allComments.push({
          "id": 3,
          "createdBy": 27,
          "comment": e,
          "postId": 7,
          "isDeleted": false,
          "imageUrl": null,
          "updatedBy": null,
          "createdAt": "2022-09-22T16:37:36.258Z",
          "updatedAt": "2022-09-22T16:37:36.258Z"
      })
      }
    });
  }

  return (
    <Container>
      <Header title={'Comments'} />

      <FlatList
        style={styles.list}
        // data={GROUP_POST_COMMENTS}
        data={allComments}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<GroupPostDetails data={post} userName={userName} />}
      />

      <GroupPostCommentForm sendMsg={(e)=>handleSendComment(e)} />
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
