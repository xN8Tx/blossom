import {
  combineReducers,
  configureStore,
  createReducer,
} from '@reduxjs/toolkit';
import { auth, chat, contacts, profile, user, users } from './state.mock';

const authReducer = createReducer(auth, () => {});
const chatReducer = createReducer(chat, () => {});
const userReducer = createReducer(user, () => {});
const contactsReducer = createReducer(contacts, () => {});
const usersReducer = createReducer(users, () => {});
const profileReducer = createReducer(profile, () => {});

const reducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  users: usersReducer,
  contacts: contactsReducer,
  profile: profileReducer,
  user: userReducer,
});

const mockState = configureStore({
  reducer,
});

export default mockState;
