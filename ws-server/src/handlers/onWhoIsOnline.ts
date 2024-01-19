import ws from 'ws';
import { errorLogManager } from 'database';

import type {
  ContactOnline,
  Message,
  WebsocketType,
  WhoIsOnlineBody,
  WhoIsOnlineBodyRes,
} from '../typings/socket';

const onWhoIsOnline = async (
  message: Message<WhoIsOnlineBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) ws.close();

    const { userId, contactsId } = message.body;

    const contacts: ContactOnline[] = contactsId.map((contact) => {
      const isContains =
        Array.from(wss.clients).findIndex(
          (u) => Number((u as WebsocketType).id) === Number(contact),
        ) > -1;

      return {
        id: contact,
        status: isContains,
      };
    });

    const title: Message<WhoIsOnlineBodyRes> = {
      event: 'WHO_IS_ONLINE',
      body: {
        userId: userId,
        contactsId: contacts,
      },
    };

    const data = JSON.stringify(title);
    ws.send(data);
  } catch (error) {
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onWhoIsOnline;
