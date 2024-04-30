import CustomFetch from '../services/fetch/customFetch.api';
import type { WebsocketType } from '../typings/socket';

const verifyActionWithMessage = async (
  userId: string,
  chatId: string,
  ws: WebsocketType,
) => {
  const members = await new CustomFetch('database').get<[]>(
    `/members/${userId}/${chatId}`,
  );

  if (members?.length === 0 || Number(ws.id) !== Number(userId)) {
    throw new Error(
      `Invalid access to chat with id: ${chatId} created by ws with id: ${ws.id}, userId: ${userId}`,
    );
  }
};

export default verifyActionWithMessage;
