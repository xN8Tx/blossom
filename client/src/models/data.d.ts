type LoadingType = 'idle' | 'loading' | 'success' | 'error';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  status: boolean;
};

type Contact = User & {
  contactId: number; // id - its id of contact from database, contactId it's id of user
};

type Messages = {
  id: number;
  chatId: string;
  userId: number;
  message: string;
  date: string;
  status: boolean | 'loading';
  isEdit: boolean;
};

type Chat = {
  id: number;
  title: string;
  avatar: string | null;
};

type Profile = User & {
  messages: Messages[];
};

type ChatWithInfo = Chat & {
  isLoaded: LoadingType;
  notification: number;
  user: User;
  messages: Messages[];
};

type InitialState<T> = {
  loading: LoadingType;
  data: null | T;
};

type ChatInitialState = InitialState<ChatWithInfo[]> & {
  isLoaded: boolean;
  isConnected: boolean;
  isReRender: boolean;
};

export type {
  LoadingType,
  User,
  Contact,
  Messages,
  Chat,
  InitialState,
  Profile,
  ChatWithInfo,
  ChatInitialState,
};
