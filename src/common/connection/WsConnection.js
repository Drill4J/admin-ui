const WS_CONNECTION_HOST = 'ws://localhost:8090/drill-socket';

export class WsConnection {
  constructor() {
    this.connection = new WebSocket(WS_CONNECTION_HOST);
    this.onMessageListeners = {};

    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const callback = this.onMessageListeners[data.destination];

      callback && callback(data);
    };
  }

  onOpen(callback) {
    this.connection.onopen = callback;

    return this;
  }

  subscribe(destination, callback) {
    this.onMessageListeners[destination] = callback;
    this.register(destination);

    return this;
  }

  register(destination) {
    return this.send(destination, 'REGISTER');
  }

  send(destination, type, message = '') {
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
