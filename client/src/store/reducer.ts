import authReducer from './auth/authSlice';
import chatReducer from '../modules/chat/store/chatSlice';
import userReducer from './user/userSlice';
import contactsReducer from '../modules/contact/store/contacts/contactSlice';
import usersReducer from '../modules/contact/store/users/usersSlice';
import profileReducer from '../modules/profile/store/profileSlice';

const reducer = {
  auth: authReducer,
  chat: chatReducer,
  user: userReducer,
  contacts: contactsReducer,
  users: usersReducer,
  profile: profileReducer,
};

export default reducer;
