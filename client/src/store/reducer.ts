import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import chatReducer from '@chat/store/chatSlice';
import profileReducer from '@profile/store/profileSlice';
import usersReducer from '@contact/store/users/usersSlice';
import contactsReducer from '@contact/store/contacts/contactSlice';

const reducer = {
  auth: authReducer,
  chat: chatReducer,
  user: userReducer,
  contacts: contactsReducer,
  users: usersReducer,
  profile: profileReducer,
};

export default reducer;
