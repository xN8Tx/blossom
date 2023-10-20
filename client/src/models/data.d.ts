type LoadingType = 'idle' | 'loading' | 'success' | 'error';

type User = {
  id: number;
  contactId: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
};

type Contact = User & {
  contactId: number; // id - its id of contact from database, contactId it's id of user
};

type Messages = {
  id: number;
  userId: number;
  message: string;
  date: string;
  status: boolean | 'loading';
  isEdit: boolean;
};

type Chat = {
  id: number;
  users: User;
  messages: Messages[];
};

type Profile = User & {
  messages: Message[];
};

type InitialState<T> = {
  loading: LoadingType;
  data: null | T;
};

export type {
  LoadingType,
  User,
  Contact,
  Messages,
  Chat,
  InitialState,
  Profile,
};
