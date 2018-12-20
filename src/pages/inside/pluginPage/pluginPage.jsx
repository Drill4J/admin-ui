import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ExceptionsGrid } from './exceptionsGrid';

const drillSessionId = 'E0C2CDBC1477508E07E00AEFBE2A4753';

@connect((state) => ({
  pluginId: state.location.payload.pluginId,
}))
export class PluginPage extends PureComponent {
  static propTypes = {
    pluginId: PropTypes.string.isRequired,
  };

  state = {
    exceptions: [],
  };

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:8090/drill-socket');

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'REGISTER',
          destination: `except-ions${drillSessionId}`,
          message: '',
        }),
      );
    };

    ws.onmessage = (event) => {
      this.setState({
        exceptions: [...this.state.exceptions, JSON.parse(JSON.parse(event.data).message)],
      });
    };
  }

  render() {
    const { exceptions } = this.state;
    const { pluginId } = this.props;

    return (
      <div>
        <h2>PluginPage; plugin id: {pluginId}</h2>
        <ExceptionsGrid data={exceptions} />
      </div>
    );
  }
}
