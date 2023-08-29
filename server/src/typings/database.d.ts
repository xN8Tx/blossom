type ChatDB = {
  id: number;
  title: string;
  type: boolean;
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
};

type UsersDB = {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
};

export type { ChatDB, MembersDB, MessagesDB, UsersDB };
