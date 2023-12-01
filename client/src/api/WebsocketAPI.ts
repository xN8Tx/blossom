import { Message } from '../models/socket';

class WebsocketAPI {
  private socket: WebSocket | null = null;
  private connector: ((message: Message<unknown>) => void) | null = null;

  private closeHandler() {
    console.log('Socket closed');
  }

  private openHandler() {
    console.log('Connection open!');
  }

  private receiveMessage(event: MessageEvent) {
    const newMessage = JSON.parse(event.data);

    this.connector!(newMessage);
  }

  isSocketOpen() {
    if (this.socket === null) return false;
    if (this.socket.readyState === this.socket.OPEN) return true;
    return false;
  }

  setConnector(callback: (message: Message<unknown>) => void) {
    this.connector = callback;
  }

  start(key: string) {
    this.socket?.removeEventListener('close', this.closeHandler);
    this.socket?.close();

    const socketURL = `${import.meta.env.VITE_WS_SERVER_URL}${key}`;

    this.socket = new WebSocket(socketURL);
    this.socket.addEventListener('open', this.openHandler.bind(websocketAPI));
    this.socket.addEventListener(
      'message',
      this.receiveMessage.bind(websocketAPI)
    );
  }

  sendMessage<T>(title: Message<T>) {
    if (this.isSocketOpen()) {
      const message = JSON.stringify(title);
      this.socket?.send(message);
    } else {
      return setTimeout(() => {
        this.sendMessage(title);
      }, 500);
    }
  }
}

const websocketAPI = new WebsocketAPI();

export default websocketAPI;
