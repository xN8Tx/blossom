import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '@/api/httpApi';
import websocketAPI from '@/api/WebsocketAPI';

import { websocketConnector } from './websocketConnector';

import type { RootState } from '@/store';
import type { setWebsocketHandlerData } from '../../models';

// get http pass key and start websocket connection
const startWebsocket = createAsyncThunk(
  '@@chats/startWebsocket',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.data.id;

    const url = `/ws/${userId}`;
    const res = await $http.get(url);
    const key = res.data.message;

    websocketAPI.start(key);
  }
);

// setup all websocket handlers and functions
const setWebsocketHandler = createAsyncThunk(
  '@@chat/setWebsocketHandler',
  ({ openCb, closeCb }: setWebsocketHandlerData, { dispatch }) => {
    websocketAPI.setHandlerFunctions(openCb, closeCb);
    websocketAPI.setConnector((data) => dispatch(websocketConnector(data)));
  }
);

export { startWebsocket, setWebsocketHandler };
