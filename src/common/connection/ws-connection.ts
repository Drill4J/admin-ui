import cbor from 'cbor';

interface StompResponse {
  message: string;
  destination: string;
  type: string;
}

// @ts-ignore
window.a = cbor;

export class WsConnection {
  public connection: WebSocket;
  public onMessageListeners: { [key: string]: (arg: unknown) => void };
  constructor(socket: string = 'drill-admin-socket') {
    this.connection = new WebSocket(
      process.env.REACT_APP_ENV
        ? `ws://${window.location.host}/ws/${socket}`
        : `ws://localhost:8090/ws/${socket}`,
    );
    this.onMessageListeners = {};

    this.connection.onmessage = (event) => {
      const { destination, message }: StompResponse = cbor.decode(event.data);
      const callback = this.onMessageListeners[destination];

      callback && callback(message ? cbor.decode(message) : null);
    };
  }

  public onOpen(callback: () => void) {
    this.connection.onopen = callback;

    return this;
  }

  public subscribe(destination: string, callback: (arg: any) => void, message?: object) {
    this.onMessageListeners[destination] = callback;
    this.send(destination, 'SUBSCRIBE', message);

    return this;
  }

  public unsubscribe(destination: string) {
    this.send(destination, 'UNSUBSCRIBE');
    delete this.onMessageListeners[destination];

    return this;
  }

  public send(destination: string, type: string, message?: object) {
    if (this.connection.readyState === this.connection.OPEN) {
      this.connection.send(
        cbor
          .encode({
            destination,
            type,
            message: cbor.encode(message).toString('hex'),
          })
          .toString('hex'),
      );
    } else {
      setTimeout(() => this.send(destination, type, message), 200);
    }

    return this;
  }
}
