const WS_CONNECTION_HOST = 'ws://localhost:8090/drill-socket';
const DRILL_SESSION_ID = '7AC70FA0197299C382877FBDAE520EB4';

export class WsConnection {
  constructor(destination = `except-ions${DRILL_SESSION_ID}`) {
    this.connection = new WebSocket(WS_CONNECTION_HOST);
    this.destination = destination;
    this.onMessageListeners = {};

    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const callback = this.onMessageListeners[data.type];

      callback && callback(data.message);
    };
  }

  onOpen(callback) {
    this.connection.onopen = callback;

    return this;
  }

  onMessage(type, callback) {
    this.onMessageListeners[type] = callback;

    return this;
  }

  send(type, message = '') {
    this.connection.send(
      JSON.stringify({
        destination: this.destination,
        type,
        message,
      }),
    );

    return this;
  }

  register() {
    return this.send('REGISTER');
  }
}
