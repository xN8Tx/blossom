import type { RootState } from '@/store';

const selectById = (state: RootState, id: number) => {
  const contact = state.contacts.data?.find(
    (contact) => Number(contact.contactId) == Number(id)
  );

  if (contact) return contact;
  return null;
};

export { selectById };
