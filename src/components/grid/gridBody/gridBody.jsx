import React, { Component, Fragment } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ScrollWrapper } from 'components/scrollWrapper';
import { SpinningPreloader } from 'components/preloaders/spinningPreloader';
import { NoItemsView } from './noItemsView'; // Deprecated component. Remove after refactoring of noItemsView for
// pipeline wizard.
import { GridRow } from './gridRow';
import styles from './gridBody.css';

const cx = classNames.bind(styles);

export class GridBody extends Component {
  static propTypes = {
    data: PropTypes.object,
    expandedRows: PropTypes.array,
    withScroll: PropTypes.bool,
    maxScrollHeight: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.string,
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
    onExpand: PropTypes.func,
    noItemsText: PropTypes.object, // Deprecated prop. Remove after refactoring of noItemsView for pipeline wizard.
    noItemsComponent: PropTypes.element,
  };
  static defaultProps = {
    data: {},
    expandedRows: [],
    withScroll: false,
    maxScrollHeight: 200,
    loading: false,
    error: null,
    selectable: false,
    onSelect: () => {},
    selected: null,
    onExpand: () => {},
    noItemsText: {},
    noItemsComponent: null,
  };

  componentWillMount() {
    const { selectable, selected, data } = this.props;
    selectable && !selected && data.items.length && this.onSelect(data.items[0].id);
  }

  onSelect = (id) => {
    if (this.props.selected !== id) {
      this.props.onSelect(id);
    }
    return id;
  };

  render() {
    const {
      data,
      loading,
      withScroll,
      maxScrollHeight,
      noItemsText,
      noItemsComponent,
      onExpand,
      expandedRows,
      selected,
      error,
      ...rest
    } = this.props;

    return loading ? (
      <div className={cx('preloader-block')}>
        <SpinningPreloader />
      </div>
    ) : (
      <Fragment>
        {data.items.length ? (
          <ScrollWrapper
            disabled={!withScroll}
            autoHeight
            autoHeightMax={maxScrollHeight}
            hideTracksWhenNotNeeded
          >
            {data.items.map((rowData) => (
              <GridRow
                {...rest}
                key={rowData.id}
                data={rowData}
                meta={data.meta}
                selected={rowData.id === selected}
                onSelect={this.onSelect}
                onExpand={() => {
                  onExpand(rowData.id);
                }}
                expanded={!!expandedRows.find((id) => id === rowData.id)}
              />
            ))}
          </ScrollWrapper>
        ) : (
          <Fragment>{noItemsComponent || <NoItemsView text={noItemsText} />}</Fragment>
        )}
      </Fragment>
    );
  }
}
