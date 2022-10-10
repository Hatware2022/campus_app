import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Touchable, Text, View, Avatar, Card } from '../../../../common';
import * as Colors from '../../../../config/colors';
import LikeIcon from '../../../../assets/icons/app-likes.svg';
import CommentIcon from '../../../../assets/icons/app-comments.svg';
import DemoImage from '../../../../assets/images/empty-image.png';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import userService from '../../../../services/user';
import session from '../../../../store/session';
import keys from '../../../../store/keys';
import utils from '../../../../utils/utils';
import postService from '../../../../services/post';

/* =============================================================================
<PostListItem />
============================================================================= */
const PostListItem = props => {
	const navigation = useNavigation();
	const [user, setUser] = useState(null);

	const _moveToChatComments = () => {
		navigation.navigate('PostComments', { post: props.data });
	};

	useEffect(() => {
		if (!props.data) return;
		userService.getById(session.get(keys.token), props.data.userId)
			.then(result => {
				if (result.data && result.data.success === true) {
					let r = result.data.data;
					setUser(r);
				}
			});
	}, []);

	const _handleLike = () => {
		const tokenData = utils.decodeJwt(session.get(keys.token));
		if (!tokenData) return;

		let arr = Array.from(props.data.likes) || [];
		if (arr.find(k => k.userId === tokenData._id)) return;

		arr.push({
			userId: tokenData._id,
			date: moment().format()
		});
		let t = {
			...props.data,
			likes: arr
		}
		postService.update(session.get(keys.token), props.data._id, t)
			.then(result => {
				if (result.data && result.data.success === true) {
					props.reload();
				}
			});
	}

	return (
		<Touchable onPress={_moveToChatComments} style={styles.container}>
			<View style={styles.topContainer}>
				{
					user &&
					<View style={styles.userContainer}>
						<Avatar size={56} source={{uri: user.imageUrl ? user.imageUrl : null}} />
						<Text style={styles.name}>{user.firstName} {user.lastName}</Text>
					</View>
				}
				<Text style={styles.time}>{moment(props.data.created_at).fromNow()}</Text>
			</View>

			<Card height={'auto'} marginVertical={5}>
				<Text>{props.data.detail}</Text>
			</Card>

			<View style={styles.bottomContainer}>
				<View style={styles.actionButtonContainer}>
					<Touchable style={styles.likeButton}>
						<LikeIcon onPress={_handleLike} />
						<Text style={styles.likeButtonText}>{props?.data?.likes?.length}</Text>
					</Touchable>
					<Touchable style={styles.commentButton}>
						<CommentIcon />
						<Text style={styles.commentButtonText}>{props?.data?.comments?.length}</Text>
					</Touchable>
				</View>

				<View style={styles.tagContainer}>
					{
						props.data && props.data?.tags.map(k => {
							return (
								<View style={styles.tag} key={k}>
									<Text style={styles.tagText}>{k}</Text>
								</View>
							);
						})
					}
				</View>
			</View>
		</Touchable>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginHorizontal: 20,
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
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	userContainer: {
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: {
		fontSize: 15,
		marginLeft: 10,
	},
	time: {
		fontSize: 13,
		color: Colors.secondaryText,
	},
	bottomContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	actionButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	likeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 10,
	},
	likeButtonText: {
		fontSize: 12,
		marginLeft: 5,
		color: Colors.primary,
	},
	commentButton: {
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	commentButtonText: {
		fontSize: 12,
		marginLeft: 5,
	},
	tagContainer: {
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	tag: {
		height: 31,
		minWidth: 91,
		borderWidth: 1,
		borderRadius: 10,
		marginHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: Colors.primary,
	},
	tagText: {
		fontSize: 14,
		color: Colors.primary,
	},
});

export default PostListItem;
