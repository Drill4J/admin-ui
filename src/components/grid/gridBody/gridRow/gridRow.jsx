import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { GridCell } from './gridCell';
import { ExpanderCell } from './expanderCell';
import styles from './gridRow.css';

const cx = classNames.bind(styles);

export class GridRow extends Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    meta: PropTypes.object,
    actions: PropTypes.object,
    withSubInfo: PropTypes.bool,
    subInfoComponent: PropTypes.func,
    expanded: PropTypes.bool,
    onExpand: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    columns: [],
    data: {},
    meta: {},
    actions: {},
    withSubInfo: false,
    subInfoComponent: null,
    expanded: false,
    onExpand: () => {},
    selectable: false,
    selected: false,
    onSelect: () => {},
  };

  onSelect = () => {
    this.props.selectable && this.props.onSelect(this.props.data.id);
  };
  onExpand = () => {
    this.props.onExpand();
  };

  render() {
    const {
      columns,
      data,
      meta,
      actions,
      withSubInfo,
      expanded,
      selectable,
      selected,
      subInfoComponent,
    } = this.props;
    const SubInfoComponent = subInfoComponent;
    return (
      <div
        className={cx('grid-row', {
          expanded,
          selectable,
          selected,
        })}
        onClick={this.onSelect}
      >
        <div className={cx('grid-row-main')}>
          {withSubInfo && (
            <ExpanderCell width={'3%'} expanded={expanded} onExpand={this.onExpand} />
          )}
          {columns.map((column) => (
            <GridCell
              key={column.id}
              data={data}
              meta={meta}
              actions={actions}
              component={column.component}
              width={column.width}
            />
          ))}
        </div>
        {expanded && (
          <div className={cx('grid-row-additional')}>
            <SubInfoComponent data={data} actions={actions} />
          </div>
        )}
      </div>
    );
  }
}
