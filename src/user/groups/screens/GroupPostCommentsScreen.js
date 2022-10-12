import React, { useEffect, useState } from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container, StackHeader} from '../../../common';
import Header from '../../component/Header';

import GroupPostDetails from '../components/GroupPostComments/GroupPostDetails';
import GroupPostCommentForm from '../components/GroupPostComments/GroupPostCommentForm';
import GroupPostCommentListItem from '../components/GroupPostComments/GroupPostCommentsListItem';
import {useIsFocused} from '@react-navigation/native';

import GROUP_POST_COMMENTS from '../../../constants/groupPostComments';

import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import {useRoute} from '@react-navigation/native';
import commentService from '../../../services/comment';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import moment from 'moment';

/* =============================================================================
<GroupPostCommentsScreen />
============================================================================= */
const GroupPostCommentsScreen = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const post = route.params?.post || {};
  const [record, setRecord] = useState(null);
  const apiPath = route.params?.apiPath || 'post/comment'
  const [allComments,setAllComments]= useState(route.params?.post?.comments || [])
  const [totalcomments, setTotalComments] = useState(route.params?.post?.comments.length);
  const tokenData = utils.decodeJwt(session.get(keys.token)) || null;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reload();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const reload = () => {
    if (!tokenData) return;
    userService.getById(session.get(keys.token), tokenData.id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  };


  const handleSendComment =(e)=>{
    let data ={
      "comment" :e,
      "postId": post.id
    }
    commentService
    .addComment(session.get(keys.token), data, apiPath)
      .then(result => {
        if (result.data && result.data.success === true) {
          // alert(JSON.stringify(result?.data?.message))
        setTotalComments(totalcomments+1)
          allComments.push({
          "id": record.id,
          "createdBy": record.id,
          "comment": e,
          "postId": post.id,
          "isDeleted": false,
          "commenterImageUrl": record?.imageUrl,
          "commenterName": record?.name,
          "createdAt": record?.createdAt,
          "updatedAt": moment(new Date())
          })
        }
    });
  }

  return (
    <Container>
      <Header title={'Comments'} />
      <FlatList
        style={styles.list}
        data={allComments}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<GroupPostDetails data={post} totalcomments={totalcomments} reload={()=>console.log('k')} />}
      />

      <GroupPostCommentForm sendMsg={(e)=>handleSendComment(e)} />
    </Container>
  );
};

const renderCommentItem = ({item}) => <GroupPostCommentListItem allComments={item?.comments || []}  data={item} />;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // padding: 20,
  },
  listContent: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: Colors.background,
    // shadowColor: Colors.border,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // elevation: 8,
  },
});

export default GroupPostCommentsScreen;
