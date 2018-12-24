import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WsConnection } from 'common/connection';
import { GLOBAL, LOCAL } from 'common/constants';
import { ExceptionsGrid } from './exceptionsGrid';

const DRILL_SESSION_ID = '0A3523744FA09F6C21A9E116CA005161';

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
    this.connection = new WsConnection().onOpen(() => {
      this.connection
        .subscribe(`except-ions${DRILL_SESSION_ID}`, (data) => this.onMessage(data, LOCAL))
        .subscribe('except-ions', (data) => this.onMessage(data, GLOBAL));
    });
  }

  onMessage(data, eventType) {
    switch (data.type) {
      case 'MESSAGE':
        this.setState({
          exceptions: [
            {
              ...JSON.parse(data.message),
              destination: data.destination,
              eventType,
            },
            ...this.state.exceptions,
          ],
        });
        break;

      case 'DELETE':
        this.setState({
          exceptions: this.state.exceptions.filter((exception) => exception.id !== data.message),
        });
        break;

      default:
    }
  }

  actions = {
    onDeleteStackTrace: (destination, stackTraceId) => {
      // eslint-disable-next-line no-alert
      window.confirm('Are you sure?') && this.connection.send(destination, 'DELETE', stackTraceId);
    },
  };

  render() {
    const { exceptions } = this.state;
    const { pluginId } = this.props;

    return (
      <div>
        <h2>Exception catcher plugin ({pluginId})</h2>
        <ExceptionsGrid data={exceptions} actions={this.actions} />
      </div>
    );
  }
}
