import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '@/api/httpApi';
import websocketAPI from '@/api/WebsocketAPI';

import getAvatar from '@/utils/getAvatar';

import type { ChatWithInfo } from '@/models/data';
import type { Message, WhoIsOnlineBody } from '@/models/socket';
import type { RootState } from '@/store';

const getChats = createAsyncThunk(
  '@@chats/getChats',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const url = `/chats/${userId}`;

    const res = await $http.get(url);
    const chats: ChatWithInfo[] = res.data.message;

    let chatsWithAvatar = chats;

    if (chats.length > 0) {
      chatsWithAvatar = await Promise.all(
        chats.map(async (chat) => {
          const avatarUrl = await getAvatar(chat.user);
          if (avatarUrl) {
            const user = { ...chat.user, avatar: avatarUrl };
            return { ...chat, user };
          }
          return chat;
        })
      );
    }

    return chatsWithAvatar;
  }
);

const getOnlineContacts = createAsyncThunk(
  '@@chats/getOnlineContacts',
  async (_, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.data.id;
    const chats = (getState() as RootState).chat.data;
    const contacts = (getState() as RootState).contacts.data;

    const contactsId: Set<string> = new Set();

    chats?.forEach((chat) => {
      contactsId.add(chat.user.id.toString());
    });
    contacts?.forEach((contact) => {
      contactsId.add(contact.contactId.toString());
    });

    const title: Message<WhoIsOnlineBody> = {
      event: 'WHO_IS_ONLINE',
      body: {
        userId: userId!.toString(),
        contactsId: Array.from(contactsId),
      },
    };

    websocketAPI.sendMessage(title);
    setTimeout(() => {
      dispatch(getOnlineContacts());
    }, 15000);
  }
);

export { getChats, getOnlineContacts };
