import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOnlineContacts } from '../messenger-action/messengerAction';
import { addFileToChat, addMessagesToChat } from './websocket-handlers';
import { addContactStatus } from '@/modules/contact/store/contacts/contactSlice';
import {
  addCompanionStatus,
  addDeleteChat,
  addDeleteMessage,
  addEditMessage,
  addMessageToChat,
  addNewChat,
  addReadMessages,
  changeIsConnected,
} from '../../chatSlice';

import type {
  CreateChatBodyRes,
  DeleteChatBodyRes,
  DeleteMessageBodyRes,
  EditMessageBodyRes,
  GetChatMessagesBodyRes,
  Message,
  MessageBodyRes,
  ReadMessageBodyRes,
  SendFileBodyRes,
  WhoIsOnlineBodyRes,
} from '@/models/socket';

// That connector give access to redux action to websocket
const websocketConnector = createAsyncThunk(
  '@@chat/connector',
  async (data: Message<unknown>, { dispatch }) => {
    switch (data.event) {
      case 'READY':
        dispatch(changeIsConnected());
        dispatch(getOnlineContacts());
        break;
      case 'GET_CHAT_MESSAGE':
        dispatch(addMessagesToChat(data as Message<GetChatMessagesBodyRes>));
        break;
      case 'SEND_FILE': {
        dispatch(addFileToChat(data as Message<SendFileBodyRes>));
        break;
      }
      case 'MESSAGE':
        dispatch(addMessageToChat(data as Message<MessageBodyRes>));
        break;
      case 'READ_MESSAGE':
        dispatch(addReadMessages(data as Message<ReadMessageBodyRes>));
        break;
      case 'EDIT_MESSAGE':
        dispatch(addEditMessage(data as Message<EditMessageBodyRes>));
        break;
      case 'DELETE_MESSAGE':
        dispatch(addDeleteMessage(data as Message<DeleteMessageBodyRes>));
        break;
      case 'WHO_IS_ONLINE':
        dispatch(addCompanionStatus(data as Message<WhoIsOnlineBodyRes>));
        dispatch(addContactStatus(data as Message<WhoIsOnlineBodyRes>));
        break;
      case 'CREATE_CHAT':
        dispatch(addNewChat(data as Message<CreateChatBodyRes>));
        break;
      case 'DELETE_CHAT':
        dispatch(addDeleteChat(data as Message<DeleteChatBodyRes>));
        break;
    }
  }
);

export { websocketConnector };
