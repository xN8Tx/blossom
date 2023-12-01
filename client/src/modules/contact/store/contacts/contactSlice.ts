import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getContacts, deleteContact, postContact } from './contactThunk';

import type { Contact, InitialState } from '../../../../models/data';

import type { Message, WhoIsOnlineBodyRes } from '../../../../models/socket';

const initialState: InitialState<Contact[]> = {
  loading: 'idle',
  data: null,
};

const contactsSlice = createSlice({
  name: '@@contacts',
  initialState,
  reducers: {
    addContactStatus: (
      state,
      action: PayloadAction<Message<WhoIsOnlineBodyRes>>
    ) => {
      const contactsId = action.payload.body.contactsId;

      state.data?.forEach((contact, index) => {
        const contactIndex = contactsId.findIndex(
          (c) => Number(contact.contactId) === Number(c.id)
        );
        state.data![index].status = contactsId[contactIndex].status;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.data?.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const newData = state.data!.filter(
          (contact) => Number(contact.id) !== action.payload
        );

        console.log(newData);

        state.data = newData;
      })
      .addCase(getContacts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getContacts.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

const contactsReducer = contactsSlice.reducer;
const { addContactStatus } = contactsSlice.actions;

export default contactsReducer;
export { addContactStatus };
