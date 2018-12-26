import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { GridHeader } from './gridHeader';
import { GridBody } from './gridBody';
import styles from './grid.css';

const cx = classNames.bind(styles);

export class Grid extends Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    actions: PropTypes.object,
    withSubInfo: PropTypes.bool,
    selectable: PropTypes.bool,
    selected: PropTypes.string,
  };
  static defaultProps = {
    columns: [],
    data: {},
    actions: {},
    withSubInfo: false,
    selectable: false,
    selected: null,
    searchQuery: '',
  };

  state = {
    expandedRows: [],
  };

  onExpand = (id) => {
    this.setState({
      expandedRows: this.state.expandedRows.find((rowId) => rowId === id)
        ? this.state.expandedRows.filter((rowId) => rowId !== id)
        : this.state.expandedRows.concat([id]),
    });
  };
  onExpandAll = () => {
    this.setState({
      expandedRows: this.state.expandedRows.length
        ? []
        : this.props.data.items.map((item) => item.id),
    });
  };

  render() {
    const { columns, data, withSubInfo, actions, selectable, ...rest } = this.props;
    return (
      <div className={cx('grid')}>
        <GridHeader
          columns={columns}
          data={data}
          withSubInfo={withSubInfo}
          actions={actions}
          hasExpandedRows={!!this.state.expandedRows.length}
          onExpandAll={this.onExpandAll}
          selectable={selectable}
        />
        <GridBody
          columns={columns}
          data={data}
          withSubInfo={withSubInfo}
          onExpand={this.onExpand}
          actions={actions}
          expandedRows={this.state.expandedRows}
          selectable={selectable}
          {...rest}
        />
      </div>
    );
  }
}
