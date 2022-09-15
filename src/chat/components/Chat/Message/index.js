import React from 'react';

import UserMessage from './UserMessage';
import ContactMessage from './ContactMessage';

/* =============================================================================
<Message />
============================================================================= */
const Message = ({...props}) => {
  if (props.currentMessage && props.currentMessage.user._id === 1) {
    return <UserMessage {...props} />;
  }

  return <ContactMessage {...props} />;
};

export default Message;
