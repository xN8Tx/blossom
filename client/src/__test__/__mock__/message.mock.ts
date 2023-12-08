import { Messages } from '@/models/data';

const message: Messages = {
  id: 1,
  chatId: '10',
  userId: 2,
  message: 'Hello testing!',
  isEdit: false,
  status: false,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const editMessage = {
  id: 1,
  chatId: '10',
  userId: 2,
  message: 'Hello testing! Im edited!',
  isEdit: true,
  status: false,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const readMessage = {
  id: 1,
  chatId: '10',
  userId: 2,
  message: 'Hello testing! Im read!',
  isEdit: false,
  status: true,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const readEditMessageFromUser = {
  id: 1,
  chatId: '10',
  userId: 1,
  message: 'Hello testing! Im edited! Im read! From User!',
  isEdit: true,
  status: true,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const messageFromUser: Messages = {
  id: 1,
  chatId: '10',
  userId: 1,
  message: 'Hello testing! From User!',
  isEdit: false,
  status: false,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const readEditMessage = {
  id: 1,
  chatId: '10',
  userId: 2,
  message: 'Hello testing! Im edited! Im read!',
  isEdit: true,
  status: true,
  date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
};

const messagesMock = {
  message,
  editMessage,
  readMessage,
  readEditMessage,
  readEditMessageFromUser,
  messageFromUser,
};

export default messagesMock;
