import React from 'react';
import {StatusBar} from 'react-native';
import {Container} from '../../common';

import Header from '../components/Announcements/Header';
import Results from '../components/Announcements/Results';

import * as Colors from '../../config/colors';

/* =============================================================================
<AnnouncementsScreen />
============================================================================= */
const AnnouncementsScreen = () => {
  return (
    <Container topSafeArea>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <Header />
      <Results />
    </Container>
  );
};

export default AnnouncementsScreen;
