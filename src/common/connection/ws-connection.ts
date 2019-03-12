import { WS_CONNECTION_HOST } from '../constants';

interface StompResponse {
  message: string;
  destination: string;
  type: string;
}

export class WsConnection {
  public connection: WebSocket;
  public onMessageListeners: { [key: string]: (arg: any) => void };
  constructor() {
    this.connection = new WebSocket(WS_CONNECTION_HOST);
    this.onMessageListeners = {};

    this.connection.onmessage = (event) => {
      const { destination, message }: StompResponse = JSON.parse(event.data);
      const callback = this.onMessageListeners[destination];

      callback && callback(JSON.parse(message));
    };
  }

  public onOpen(callback: () => void) {
    this.connection.onopen = callback;

    return this;
  }

  public subscribe(destination: string, callback: () => void) {
    this.onMessageListeners[`/api/${destination}`] = callback;
    this.register(destination);

    return this;
  }

  public register(destination: string) {
    return this.send(`/api/${destination}`, 'REGISTER');
  }

  public send(destination: string, type: string, message = '') {
    this.connection.send(
      JSON.stringify({
        destination,
        type,
        message,
      }),
    );

    return this;
  }
}
