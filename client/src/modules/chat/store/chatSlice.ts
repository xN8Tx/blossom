import { createSlice } from '@reduxjs/toolkit';

import type { InitialState, Chat } from '../../../models/data';

const initialState: InitialState<Chat[]> = {
  loading: 'idle',
  data: null,
};

const chatSlice = createSlice({
  name: '@@chat',
  initialState,
  reducers: {},
});

const chatReducer = chatSlice.reducer;

export default chatReducer;
