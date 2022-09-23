import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Container,
  Content,
  Button,
  View,
  Card,
  Title,
  Tag,
  Touchable,
  TagInput,
} from '../../../common';
import Text from '../../../common/TextV2';
import UserImage from '../../../assets/images/user.png';
import SocialButtons from '../components/ProfileDetails/SocialButtons';
import * as Colors from '../../../config/colors';
import utils from '../../../utils/utils';
import {useRoute} from '@react-navigation/native';
import session from '../../../store/session';
import keys from '../../../store/keys';
import userService from '../../../services/user';
import BackIcon from '../../../assets/icons/icon-back.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gap from '../../../common/Gap';
import Header from '../../component/Header';

/* =============================================================================
<ProfileDetailsScreen />
============================================================================= */
const ProfileDetailsScreen = () => {
  const route = useRoute();
  const [record, setRecord] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const _id = route.params._id;
    if (!_id) return;
    userService.getById(session.get(keys.token), _id).then(result => {
      if (result.data && result.data.success === true) {
        let r = result.data.data;
        setRecord(r);
      }
    });
  }, []);

  const _safeAreaStyle = {
    paddingTop: insets.top,
  };

  const _safeArea = {
    marginBottom: 16 + insets.bottom,
  };

  return (
    <Container>
      <Header title={'Profile Detail'} />

      <Content bottomSafeArea paddingHorizontal={16} paddingVertical={16}>
        <View center>
          <Avatar
            source={{uri: record?.imageUrl ? record?.imageUrl : null}}
            size={80}
          />
          <Gap height={12} />
          <Text size="big" family="semi">
            {record?.name ? record?.name : 'Dummy'}
          </Text>
          <Gap height={16} />

          <SocialButtons data={record} />
        </View>

        <View
          borderWidth={1}
          borderColor={Colors.white300}
          marginHorizontal={-16}
          marginVertical={24}
        />

        <View>
          <Text family="semi" size="big">
            Bio
          </Text>
          <Gap height={12} />
          <Card>
            <Text>{record?.bio ? record?.bio : 'This is dummy data'}</Text>
          </Card>
        </View>

        <View>
          <Card subCard leftTitle={'Major'} subContent={record?.major ? record?.major : "Biologi"} />
          <Card subCard leftTitle={'Year'} subContent={record?.gradYear ? record?.gradYear : "Junior"} />
          <Card subCard leftTitle={'Gender'} subContent={record?.gender ? record?.gender :"Male"} />
          <Card
            subCard
            leftTitle={'From'}
            subContent={record?.address ? record?.address : "dummy address, USA"}
          />

          <View
            borderWidth={1}
            borderColor={Colors.white300}
            marginVertical={24}
          />

        </View>

        <Text family="semi" size="big">
          Interest
        </Text>
        {record?.downFor && record?.downFor.length ?
        <TagInput label="Interests" tags={record?.downFor} />
        :null}
        <Gap height={12} />
        {/* <Text>Photography</Text>
        <Gap height={8} />
        <View padding={8} backgroundColor={Colors.white200} borderRadius={8}>
          <Text>
            I’ve been taking photos for 6 years. I love doing portraits and
            brand photography.
          </Text>
        </View>

        <Gap height={12} />
        <Text>Art</Text>
        <Gap height={8} />
        <View padding={8} backgroundColor={Colors.white200} borderRadius={8}>
          <Text>
            Art has always fascinated me. I love to paint and would like to get
            a group together to paint on the weekends in different locations!
          </Text>
        </View> */}

        <View
          borderWidth={1}
          borderColor={Colors.white300}
          marginVertical={24}
        />

        <Text family="semi" size="big">
          Down For
        </Text>
        {/* <TagInput label="Interests" tags={record.downFor} /> */}
        <Gap height={12} />
        <Text>Movies</Text>
        <Gap height={8} />
        <View padding={8} backgroundColor={Colors.white200} borderRadius={8}>
          <Text>
            I’ve been taking photos for 6 years. I love doing portraits and
            brand photography.
          </Text>
        </View>

        <Gap height={12} />
        <Text>Partying</Text>
        <Gap height={8} />
        <View padding={8} backgroundColor={Colors.white200} borderRadius={8}>
          <Text>
            Art has always fascinated me. I love to paint and would like to get
            a group together to paint on the weekends in different locations!
          </Text>
        </View>
        {/* <View>
					<Title type="h4">Down for:</Title>

					<Title type="h5" marginVertical={10}>
						Movies:
					</Title>
					<Card>
						<Text>
							Who are capable of assisting in securing funding as well as
							sourcing from china
						</Text>
					</Card>

					<Title type="h5" marginVertical={10}>
						Partying:
					</Title>
					<Card>
						<Text>
							Who are interested in attending events and other workshops locally
						</Text>
					</Card>

					<Title type="h5" marginVertical={10}>
						Traveling
					</Title>
					<Card>
						<Text>
							Students who are interested investing in properties, or brokers
							looking for an
						</Text>
					</Card>
				</View> */}

        {/* <View style={styles.underline} /> */}

        {/* <View>
					<Title type="h4">Find similar Students</Title>

					<Title type="h5" marginVertical={10}>
						Interests
					</Title>
					<View style={styles.tagContainer}>
						<Tag text="Business" style={styles.tag} />
						<Tag text="Hiking" style={styles.tag} />
						<Tag text="Reading" style={styles.tag} />
						<Tag text="Art" style={styles.tag} />
					</View>

					<Title type="h5" marginVertical={10}>
						Down for:
					</Title>
					<View style={styles.tagContainer}>
						<Tag text="Movies" style={styles.tag} />
						<Tag text="Partying" style={styles.tag} />
						<Tag text="Surfing " style={styles.tag} />
						<Tag text="Hiking" style={styles.tag} />
					</View>
				</View> */}
      </Content>

      <View style={styles.containerButton}>
        <Button
          style={[styles.button, _safeArea]}
          title="Start Conversation"
          onPress={() => console.log('a')}
        />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  underline: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Colors.border,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    minWidth: 80,
    marginRight: 8,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderColor: Colors.card,
    backgroundColor: Colors.card,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  iconBack: {
    marginRight: 16,
  },
  containerButton: {
    backgroundColor: Colors.white200,
    borderTopWidth: 1,
    borderTopColor: Colors.white300,
  },
  button: {
    margin: 16,
  },
});

export default ProfileDetailsScreen;
