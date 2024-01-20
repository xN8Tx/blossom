import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

import type { MessagesDB, EditMessageDB } from '../typings/typings';

dotenv.config();

type MessageType = EditMessageDB | MessagesDB | Omit<MessagesDB, 'chatId'>;
type MessagesType = MessageType[];
type DecryptMessagesFunction = (
  messages: MessagesType | MessageType,
) => MessagesType | MessageType | null;

const decryptMessages: DecryptMessagesFunction = (messages) => {
  if (!process.env.MESSAGE_CRYPT) return null;

  if (Array.isArray(messages)) {
    if (messages.length === 0) return [];

    const newArray: MessagesType = messages.map((m: MessageType) => {
      const decryptMessage = CryptoJS.AES.decrypt(
        m.message,
        process.env.MESSAGE_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);

      return {
        ...m,
        message: decryptMessage,
      };
    });
    return newArray;
  } else {
    const decryptMessage = CryptoJS.AES.decrypt(
      messages.message,
      process.env.MESSAGE_CRYPT!,
    ).toString(CryptoJS.enc.Utf8);

    return {
      ...messages,
      message: decryptMessage,
    };
  }
};

export { decryptMessages };
