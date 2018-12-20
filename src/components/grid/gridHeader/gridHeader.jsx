import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { HeaderCell } from './headerCell';
import styles from './gridHeader.scss';

const cx = classNames.bind(styles);

export const GridHeader = ({ columns, withSubInfo, hasExpandedRows, onExpandAll, ...rest }) => (
  <div className={cx('grid-header')}>
    {withSubInfo && (
      <HeaderCell
        width={'3%'}
        withExpander
        hasExpandedRows={hasExpandedRows}
        onExpandAll={onExpandAll}
      />
    )}
    {columns.map((column) => (
      <HeaderCell
        key={column.id}
        title={column.title}
        width={column.width}
        headerComponent={column.headerComponent}
        {...rest}
      />
    ))}
  </div>
);
GridHeader.propTypes = {
  columns: PropTypes.array,
  hasExpandedRows: PropTypes.bool,
  withSubInfo: PropTypes.bool,
  onExpandAll: PropTypes.func,
};
GridHeader.defaultProps = {
  columns: [],
  hasExpandedRows: false,
  withSubInfo: false,
  onExpandAll: () => {},
};
