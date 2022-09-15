import React from 'react';
import {ImageBackground, StyleSheet, FlatList} from 'react-native';
import {View, Card, Text, Container, StackHeader, Title} from '../../../common';

import GroupMembers from '../components/GroupDetails/GroupMembers';
import CreatePostForm from '../components/GroupDetails/CreatePostForm';
import GroupPostListItem from '../components/GroupDetails/GroupPostListItem';

import GROUP_POSTS from '../../../constants/groupPosts';

import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* =============================================================================
<GroupDetailsScreen />
============================================================================= */
const GroupDetailsScreen = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const data = route.params?.data || {};

  const _safeArea = {
    paddingBottom: insets.bottom,
  };

  return (
    <Container>
      <StackHeader type="secondary" title="Group" />

      <FlatList
        data={GROUP_POSTS}
        style={styles.list}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, _safeArea]}
        ListHeaderComponent={
          <View>
            <View padding={20}>
              <ImageBackground
                source={data.image}
                style={styles.coverImage}
                imageStyle={styles.coverImageStyle}>
                <View style={styles.coverInnerContainer}>
                  <Text style={styles.name}>{data.name}</Text>
                </View>
              </ImageBackground>

              <GroupMembers />

              <Card height={114} marginVertical={20}>
                <Text>
                  Here is a description of what this group content will be
                  about. This can be edited by the creator only.
                </Text>
              </Card>

              <CreatePostForm />
            </View>
            <Title type="h4" marginHorizontal={20}>
              Results
            </Title>
          </View>
        }
      />
    </Container>
  );
};

const renderPostItem = ({item}) => <GroupPostListItem data={item} />;

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 180,
  },
  coverImageStyle: {
    borderRadius: 10,
  },
  coverInnerContainer: {
    padding: 20,
    width: '100%',
    height: 180,
    borderRadius: 10,
    paddingVertical: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  name: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default GroupDetailsScreen;
