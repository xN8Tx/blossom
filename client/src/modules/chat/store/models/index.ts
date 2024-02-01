import { HandlerFunctionType } from '@/api/WebsocketAPI';

type CreateMessageMessage = {
  chatId: string;
  message: string;
};

type CreateSendFile = {
  chatId: string;
  file: {
    file: string;
    fileType: string;
    fileName: string;
    fileExtension: string;
  };
};

type EditDeleteMessageMessage = {
  chatId: string;
  message: {
    id: string;
    message?: string;
  };
};

type setWebsocketHandlerData = {
  openCb: HandlerFunctionType;
  closeCb: HandlerFunctionType;
};

export type {
  CreateMessageMessage,
  CreateSendFile,
  EditDeleteMessageMessage,
  setWebsocketHandlerData,
};
