import { createSlice } from '@reduxjs/toolkit';
import { editUser, getUser } from './userThunk';

import type { InitialState, User } from './index';

const initialData: User = {
  id: null,
  firstName: null,
  lastName: null,
  status: null,
  avatar: null,
  username: null,
  email: null,
};

const initialState: InitialState = {
  loading: 'idle',
  isEditLoaded: 'idle',
  data: initialData,
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = 'idle';
      state.isEditLoaded = 'idle';
      state.data = initialData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = 'error';
      })
      .addCase(getUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { firstName, lastName, username } = action.payload;
        state.isEditLoaded = 'success';
        state.data.firstName = firstName;
        state.data.lastName = lastName;
        state.data.username = username;
      })
      .addCase(editUser.rejected, (state) => {
        state.isEditLoaded = 'error';
      })
      .addCase(editUser.pending, (state) => {
        state.isEditLoaded = 'loading';
      });
  },
});

const userReducer = userSlice.reducer;
const { resetUser } = userSlice.actions;

export { resetUser };
export default userReducer;
