import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WsConnection } from 'common/connection';
import { ExceptionsGrid } from './exceptionsGrid';

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
    this.connection = new WsConnection()
      .onOpen(() => this.connection.register())
      .onMessage((event) => {
        this.setState({
          exceptions: [JSON.parse(JSON.parse(event.data).message), ...this.state.exceptions],
        });
      });
  }

  actions = {
    onDeleteStackTrace: (stackTraceId) => {
      this.connection.send('DELETE', stackTraceId);
    },
  };

  render() {
    const { exceptions } = this.state;
    const { pluginId } = this.props;

    return (
      <div>
        <h2>PluginPage; plugin id: {pluginId}</h2>
        <ExceptionsGrid data={exceptions} actions={this.actions} />
      </div>
    );
  }
}
