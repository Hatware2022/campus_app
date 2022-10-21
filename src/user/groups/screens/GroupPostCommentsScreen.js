import React, {useState} from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {Container} from '../../../common'
import Header from '../../component/Header'

import GroupPostDetails from '../components/GroupPostComments/GroupPostDetails'
import GroupPostCommentForm from '../components/GroupPostComments/GroupPostCommentForm'
import GroupPostCommentListItem from '../components/GroupPostComments/GroupPostCommentsListItem'
import {useIsFocused} from '@react-navigation/native'

import * as Colors from '../../../config/colors'
import utils from '../../../utils/utils'
import {useRoute} from '@react-navigation/native'
import commentService from '../../../services/comment'
import session from '../../../store/session'
import keys from '../../../store/keys'
import moment from 'moment'

import useGetUserById from '../../../hooks/useGetUserById'

/* =============================================================================
<GroupPostCommentsScreen />
============================================================================= */
const GroupPostCommentsScreen = () => {
  const isFocused = useIsFocused()
  const route = useRoute()
  const post = route.params?.post || {}
  const apiPath = route.params?.apiPath || 'post/comment'
  const [allComments, setAllComments] = useState(
    route.params?.post?.comments || []
  )
  const [totalcomments, setTotalComments] = useState(
    route.params?.post?.comments.length
  )
  const tokenData = utils.decodeJwt(session.get(keys.token)) || null
  const [record] = useGetUserById(tokenData?.id, [isFocused])

  const handleSendComment = e => {
    let data = {
      comment: e,
      postId: post.id
    }
    commentService
      .addComment(session.get(keys.token), data, apiPath)
      .then(result => {
        if (result.data && result.data.success === true) {
          setTotalComments(totalcomments + 1)
          setAllComments([
            ...allComments,
            {
              id: record.id,
              createdBy: record.id,
              comment: e,
              postId: post.id,
              isDeleted: false,
              commenterImageUrl: record?.imageUrl,
              commenterName: record?.name,
              createdAt: record?.createdAt,
              updatedAt: moment(new Date())
            }
          ])
        }
      })
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
        ListHeaderComponent={
          <GroupPostDetails
            data={post}
            totalcomments={totalcomments}
            reload={() => console.log('k')}
            apiPath={apiPath.split('/')[0]}
          />
        }
      />

      {session.get(keys.loginType) !== 'organization' && (
        <GroupPostCommentForm sendMsg={e => handleSendComment(e)} />
      )}
    </Container>
  )
}

const renderCommentItem = ({item}) => (
  <GroupPostCommentListItem allComments={item?.comments || []} data={item} />
)

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  listContent: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: Colors.background
  }
})

export default GroupPostCommentsScreen
