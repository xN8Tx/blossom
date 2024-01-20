import { Message } from '@/models/socket';

type ConnectorType = (message: Message<unknown>) => void;
type HandlerFunctionType = () => void;

class WebsocketAPI {
  public isSocketRestart: boolean = true;
  private socket: WebSocket | null = null;
  private connector: ConnectorType | null = null;
  private openHandlerFunction: HandlerFunctionType | null = null;
  private closeHandlerFunction: HandlerFunctionType | null = null;

  private closeHandler() {
    if (this.closeHandlerFunction) {
      return this.closeHandlerFunction();
    }
    return console.log('Connection closed!');
  }

  private openHandler() {
    this.isSocketRestart = false;
    if (this.openHandlerFunction) return this.openHandlerFunction();
    return console.log('Connection opened!');
  }

  private receiveMessage(event: MessageEvent) {
    const newMessage = JSON.parse(event.data);

    this.connector!(newMessage);
  }

  setHandlerFunctions(
    openCb: HandlerFunctionType,
    closeCb: HandlerFunctionType
  ) {
    this.closeHandler = closeCb;
    this.openHandler = openCb;
  }

  isSocketOpen() {
    if (this.socket === null) return false;
    if (this.socket.readyState === this.socket.OPEN) return true;
    return false;
  }

  setConnector(callback: ConnectorType) {
    this.connector = callback;
  }

  start(key: string) {
    this.socket?.removeEventListener('close', this.closeHandler);
    this.socket?.close();

    const socketURL = `${import.meta.env.VITE_WS_SERVER_URL}${key}`;

    this.socket = new WebSocket(socketURL);
    this.socket.addEventListener('error', () => console.log('error'));
    this.socket.addEventListener('close', this.closeHandler.bind(websocketAPI));
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
export type { HandlerFunctionType, ConnectorType };
