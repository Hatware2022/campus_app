import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import ProgressCircle from 'react-native-progress-circle';

import {
	Text,
	View,
	Touchable,
	Container,
	SimpleRadioButton,
} from '../../common';
import AppIntroCarousel from '../components/AppIntro/AppIntroCarousel';

import IconImage1 from '../../assets/icons/app-intro-image-1.svg';
import IconImage2 from '../../assets/icons/app-intro-image-2.svg';
import IconImage3 from '../../assets/icons/app-intro-image-3.svg';
import IconImage4 from '../../assets/icons/app-intro-image-4.svg';
import ArrowRightIcon from '../../assets/icons/app-arrow-right.svg';

import * as Colors from '../../config/colors';
import { setKey } from "../../store/actions";
import { connect } from "react-redux";
import keys from "../../store/keys";
import session from "../../store/session";

/* =============================================================================
<AppIntroScreen />
============================================================================= */
const AppIntroScreen = ({ globalState, setKey, navigation, ...props }) => {
	const carousel = useRef();
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [terms, setTerms] = useState(true);

	const _handleSnapToItem = index => {
		setCarouselIndex(index);
	};

	useEffect(() => {
		let isFirstLaunch = session.get(keys.isFirstLaunch) || null;
		if (isFirstLaunch) {
			navigation.navigate('Login');
		}

		const token = session.get(keys.token) || null;
		let isLoggedIn = session.get(keys.isLoggedIn) || null;
		let loginType = session.get(keys.loginType) || null;
		if (token && isLoggedIn) {
			if (loginType === "user") {
				navigation.navigate('UserTab');
			}
			if (loginType === "organization") {
				navigation.navigate('OrganizationTab');
			}
		}
	}, []);

	const _handlePress = () => {
		if (carouselIndex === 3) {
			session.set(keys.isFirstLaunch, "true");
			navigation.navigate('Login');
		} else {
			carousel.current.snapToNext();
		}
	};

	return (
		<Container safeArea>
			<StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

			<AppIntroCarousel
				ref={carousel}
				items={CAROUSEL_ITEMS}
				onSnapToItem={_handleSnapToItem}
			/>
			<Pagination
				dotsLength={CAROUSEL_ITEMS.length}
				activeDotIndex={carouselIndex}
				dotStyle={styles.paginationDotActive}
				inactiveDotStyle={styles.paginationDotInactive}
				inactiveDotOpacity={0.08}
				inactiveDotScale={1}
			/>
			<View center>
				<SimpleRadioButton
					selected={terms}
					onChange={() => setTerms(!terms)}
					label="I accept Terms of Service"
				/>

				<Text style={styles.link}>{DESCRIPTIONS[carouselIndex]?.title}</Text>

				<View style={styles.nextBtnContainer}>
					<ProgressCircle
						percent={(carouselIndex + 1) * 25}
						radius={118 / 2}
						borderWidth={4}
						color={Colors.primary}
						shadowColor={Colors.card}
						bgColor={Colors.background}>
						<Touchable style={styles.nextBtn} onPress={_handlePress}>
							<ArrowRightIcon />
						</Touchable>
					</ProgressCircle>
				</View>
			</View>
		</Container>
	);
};

const DESCRIPTIONS = [
	{
		title: 'View Terms of Service Here',
		link: '',
	},
	{
		title: 'View Conduct Code Here',
		link: '',
	},
	{
		title: 'View Cookies Policy Here',
		link: '',
	},
	{
		title: 'View Cookies Policy Here',
		link: '',
	},
];

const CAROUSEL_ITEMS = [
	{
		title: 'Connect with Students',
		description:
			'Instantly find and connect with similar students based on interests, activities and more.',
		source: <IconImage1 height={360} width={360} />,
	},
	{
		title: 'View Events',
		description: 'See whats happening, where its happening and who is going.',
		source: <IconImage2 height={360} width={360} />,
	},
	{
		title: 'Join Groups',
		description:
			'Create and join in on interest based groups to discuss or set up activities.',
		source: <IconImage3 height={360} width={360} />,
	},
	{
		title: 'Join Groups',
		description:
			'Create and join in on interest based groups to discuss or set up activities.',
		source: <IconImage4 height={360} width={360} />,
	},
];

const styles = StyleSheet.create({
	paginationDotActive: {
		width: 38,
		height: 16,
		borderRadius: 20,
		marginHorizontal: -6,
		backgroundColor: Colors.primary,
	},
	paginationDotInactive: {
		width: 16,
		height: 16,
		borderRadius: 16 / 2,
		marginHorizontal: -6,
		backgroundColor: Colors.primary,
	},
	nextBtn: {
		width: 112,
		height: 112,
		borderWidth: 3,
		borderColor: '#FFF',
		alignItems: 'center',
		borderRadius: 112 / 2,
		justifyContent: 'center',
		backgroundColor: Colors.primary,
	},
	nextBtnContainer: {
		marginVertical: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	link: {
		fontSize: 15,
		marginVertical: 10,
		color: Colors.primary,
		textDecorationColor: Colors.primary,
		textDecorationLine: 'underline',
	},
});

/* Export
============================================================================= */

const mapStateToProps = store => ({ globalState: store.session });
const mapDispatchToProps = dispatch => ({
	setKey: (key, value) => dispatch(setKey(key, value)),
	removeKey: key => dispatch(removeKey(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroScreen);