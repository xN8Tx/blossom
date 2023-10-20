import { createSlice } from '@reduxjs/toolkit';

import { getUsers } from './usersThunk';

import type { InitialState, User } from '../../../../models/data';

const initialState: InitialState<User[]> = {
  loading: 'idle',
  data: null,
};

const usersSlice = createSlice({
  name: '@@users',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = 'idle';
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = 'error';
    });
  },
});

const usersReducer = usersSlice.reducer;
const { reset } = usersSlice.actions;

export default usersReducer;
export { reset };
