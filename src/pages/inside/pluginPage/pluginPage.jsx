import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect((state) => ({
  pluginId: state.location.payload.pluginId,
}))
export class PluginPage extends PureComponent {
  static propTypes = {
    pluginId: PropTypes.string.isRequired,
  };

  render() {
    const { pluginId } = this.props;

    return <div>PluginPage; plugin id: {pluginId}</div>;
  }
}
