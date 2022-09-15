import UserImage1 from '../assets/images/user.png';
import UserImage3 from '../assets/images/user-3.png';

const MESSAGES = [
  {
    _id: 1,
    text: 'Hello, Thanks For Contacting Us It, Will be in stock after fewdays.',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'User 2',
      avatar: UserImage3,
    },
  },
  {
    _id: 2,
    text: 'Hello, Thanks For Contacting Us It, Will be in stock after fewdays.',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'User 1',
      avatar: UserImage1,
    },
  },
];

export default MESSAGES;
