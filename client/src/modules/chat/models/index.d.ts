type Messages = {
  id: number;
  userId: number;
  message: string;
  date: string;
  status: boolean | 'loading';
  isEdit: boolean;
};

type Users = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  status: boolean;
};

type Chat = {
  id: number;
  users: Users[];
  messages: Messages[];
};

export type { Chat, Messages };
