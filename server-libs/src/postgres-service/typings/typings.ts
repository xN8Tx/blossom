type ChatDB = {
  id: number;
  title: string;
  avatar: string;
};

type MembersDB = {
  id: number;
  chatId: number;
  userId: number;
};

type MessagesDB = {
  id: number;
  chatId: number;
  userId: number;
  message: string;
  status: boolean;
  date: Date;
  isEdit: boolean;
};

type UsersDB = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string | null;
  email: string;
  password: string;
  status: boolean;
};

type UserProfileDB = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string | null;
  status: boolean;
};

type ContactDB = {
  id: number;
  userId: number;
  contactId: number;
};

type ContactUserDB = Omit<ContactDB, 'userId'> & {
  firstName: string;
  secondName: string;
  username: string;
  avatar: string | null;
};

type ChatsWithInfoDB = ChatDB & {
  isLoaded: 'idle';
  notification: string | null;
  user: UserProfileDB;
  messages: Omit<MessagesDB, 'chatId'>[];
};

export type {
  ChatDB,
  MembersDB,
  MessagesDB,
  UsersDB,
  ContactDB,
  ContactUserDB,
  UserProfileDB,
  ChatsWithInfoDB,
};
