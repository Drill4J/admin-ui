import { WS_CONNECTION_HOST } from '../constants';

export class WsConnection {
  public connection: WebSocket;
  public onMessageListeners: { [key: string]: (arg: any) => void };
  constructor() {
    this.connection = new WebSocket(WS_CONNECTION_HOST);
    this.onMessageListeners = {};

    this.connection.onmessage = (event) => {
      const data: { destination: string } = JSON.parse(event.data);
      const callback = this.onMessageListeners[data.destination];

      callback && callback(data);
    };
  }

  public onOpen(callback: () => void) {
    this.connection.onopen = callback;

    return this;
  }

  public subscribe(destination: string, callback: () => void) {
    this.onMessageListeners[destination] = callback;
    this.register(destination);

    return this;
  }

  public register(destination: string) {
    return this.send(destination, 'REGISTER');
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
