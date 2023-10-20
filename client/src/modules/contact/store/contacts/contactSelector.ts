import type { RootState } from '../../../../store';

const selectById = (state: RootState, id: number) => {
  return state.contacts.data?.filter((contact) => contact.contactId == id);
};

export { selectById };
