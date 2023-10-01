import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './auth/authSlice';
import chatReducer from '../modules/chat/store/chatSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
