const WS_CONNECTION_HOST = 'ws://localhost:8090/drill-socket';
const DRILL_SESSION_ID = '339034885B359EC6B23F973028D2C2FE';

export class WsConnection {
  constructor(destination = `except-ions${DRILL_SESSION_ID}`) {
    this.connection = new WebSocket(WS_CONNECTION_HOST);
    this.destination = destination;
  }

  onOpen(callback) {
    this.connection.onopen = callback;

    return this;
  }

  onMessage(callback) {
    this.connection.onmessage = callback;

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
