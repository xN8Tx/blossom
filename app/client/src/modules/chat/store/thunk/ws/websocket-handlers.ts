import { createAsyncThunk } from '@reduxjs/toolkit';

import getFile from '@/utils/getFile';

import type {
  GetChatMessagesBodyRes,
  Message,
  MessageBodyRes,
} from '@/models/socket';
import { RootState } from '@/store';

const addFileToChat = createAsyncThunk(
  '@@chat/addFileToChat',
  async (data: Message<MessageBodyRes>, { getState }) => {
    const uId = (getState() as RootState).user.data.id;

    const { chatId, message } = data.body;
    const { userId } = message;

    const isUser = Number(userId) === Number(uId);

    const [fileUrl, fileType] = await getFile(message.message);
    message.message = fileUrl;
    message.type = fileType;

    return { message, chatId, isUser };
  }
);
const addMessagesToChat = createAsyncThunk(
  '@@chat/addMessagesToChat',
  async (action: Message<GetChatMessagesBodyRes>) => {
    const modifiedMessages = await Promise.all(
      action.body.messages.map(async (mes) => {
        if (mes.type) {
          const [fileUrl, fileType] = await getFile(mes.message);
          return { ...mes, message: fileUrl, type: fileType };
        }
        return mes;
      })
    );

    return { ...action.body, messages: modifiedMessages };
  }
);

export { addFileToChat, addMessagesToChat };
