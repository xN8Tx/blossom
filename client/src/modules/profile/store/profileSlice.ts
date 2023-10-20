import { createSlice } from '@reduxjs/toolkit';

import type { InitialState, Profile } from '../../../models/data';
import { getProfile } from './profileThunk';

const initialState: InitialState<Profile> = {
  loading: 'idle',
  data: null,
};

const profileSlice = createSlice({
  name: '@@profile',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = 'idle';
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = 'error';
    });
  },
});

const profileReducer = profileSlice.reducer;
const { reset } = profileSlice.actions;

export { reset };
export default profileReducer;
