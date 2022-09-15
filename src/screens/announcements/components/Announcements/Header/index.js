import React from 'react';

import {StackHeader} from '../../../../common';

import SearchInput from './SearchInput';

/* =============================================================================
<AnnouncementsHeader />
============================================================================= */
const AnnouncementsHeader = () => {
  return <StackHeader title="Announcements" content={<SearchInput />} />;
};

export default AnnouncementsHeader;
