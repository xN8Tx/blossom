import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { InitialState, User } from './index';
import { getUser } from './userThunk';

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
  data: initialData,
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = 'idle';
      state.data = initialData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(getUser.rejected), (state) => {
        state.loading = 'error';
      })
      .addMatcher(isAnyOf(getUser.pending), (state) => {
        state.loading = 'loading';
      });
  },
});

const userReducer = userSlice.reducer;
const { resetUser } = userSlice.actions;

export { resetUser };
export default userReducer;
