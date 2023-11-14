import audioNotification from '../utils/audioNotification';
// import websocketAPI from '../../../api/WebsocketAPI';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatInitialState } from '../../../models/data';
import type {
  DeleteMessageBodyRes,
  EditMessageBodyRes,
  // GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  MessageBodyRes,
  ReadMessageBodyRes,
  WhoIsOnlineRes,
} from '../../../models/socket';
// import websocketAPI from '../../../api/WebsocketAPI';

const reducers = {
  addMessagesToChat: (
    state: ChatInitialState,
    action: PayloadAction<Message<GetChatMessagesBodyRes>>
  ) => {
    const index = state.data!.findIndex(
      (chat) => `${chat.id}` === action.payload.body.chatId
    );

    state.data![index].messages = action.payload.body.messages;
    state.data![index].isLoaded = 'success';
  },
  addMessageToChat: (
    state: ChatInitialState,
    action: PayloadAction<Message<MessageBodyRes>>
  ) => {
    // PREPARE
    const indexOfChat = state.data!.findIndex(
      (chat) => `${chat.id}` === action.payload.body.chatId
    );

    const chatUserId = state.data![indexOfChat].user.id;

    const messageUserId = action.payload.body.message.userId;

    if (Number(chatUserId) === Number(messageUserId)) {
      audioNotification();
    }

    // REDUCER
    if (state.data![indexOfChat].notification === null)
      state.data![indexOfChat].notification = 0;
    state.data![indexOfChat].messages.push(action.payload.body.message);
    state.data![indexOfChat].notification++;
  },
  addReadMessages: (
    state: ChatInitialState,
    action: PayloadAction<Message<ReadMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );
    state.data![indexOfChat].messages = action.payload.body.messages;
  },
  addEditMessage: (
    state: ChatInitialState,
    action: PayloadAction<Message<EditMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );

    const indexOfMessage = state.data![indexOfChat].messages.findIndex(
      (message) =>
        Number(message.id) === Number(action.payload.body.messages.id)
    );

    state.data![indexOfChat].messages[indexOfMessage].message =
      action.payload.body.messages.message;
    state.data![indexOfChat].messages[indexOfMessage].isEdit =
      action.payload.body.messages.isEdit;
  },
  addDeleteMessage: (
    state: ChatInitialState,
    action: PayloadAction<Message<DeleteMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );

    const indexOfMessage = state.data![indexOfChat].messages.findIndex(
      (message) =>
        Number(message.id) === Number(action.payload.body.messages.id)
    );

    state.data![indexOfChat].messages.splice(indexOfMessage, 1);
  },
  changeIsLoaded: (state: ChatInitialState) => {
    state.isLoaded = true;
  },
  changeIsConnected: (state: ChatInitialState) => {
    state.isConnected = true;
  },
  addCompanionStatus: (
    state: ChatInitialState,
    action: PayloadAction<Message<WhoIsOnlineRes>>
  ) => {
    const contactsId = action.payload.body.contactsId;

    state.data?.forEach((chat, index) => {
      const contactIndex = contactsId.findIndex(
        (contact) => Number(contact.id) === Number(chat.user.id)
      );
      state.data![index].user.status = contactsId[contactIndex].status;
    });
  },
  // getChatMessages: {
  //   reducer: (state: ChatInitialState, action: PayloadAction<string>) => {
  //     const index = state.data!.findIndex(
  //       (chat) => `${chat.id}` === action.payload
  //     );
  //     state.data![index].isLoaded = 'loading';
  //   },
  //   prepare: (chatId: string) => {
  //     const title: Message<GetChatMessagesBody> = {
  //       event: 'GET_CHAT_MESSAGE',
  //       body: {
  //         chatId: chatId,
  //       },
  //     };
  //     websocketAPI.sendMessage<GetChatMessagesBody>(title);
  //     return { payload: chatId };
  //   },
  // },
};

export default reducers;
