import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import classNames from 'classnames/bind';
import ArrowIcon from 'common/img/icon-arrow-down-inline.svg';
import styles from './headerCell.css';

const cx = classNames.bind(styles);

export const HeaderCell = ({
  data,
  title,
  headerComponent,
  width,
  withExpander,
  hasExpandedRows,
  actions,
  onExpandAll,
  selectable,
}) => {
  const HeaderComponent = headerComponent;
  return (
    <div
      className={cx('header-cell', { 'expand-cell': withExpander, selectable })}
      style={{ width }}
    >
      {title && <span className={cx('title')}>{title}</span>}
      {headerComponent && <HeaderComponent actions={actions} data={data} />}
      {withExpander && (
        <div className={cx('expand-icon', { expanded: hasExpandedRows })} onClick={onExpandAll}>
          {Parser(ArrowIcon)}
        </div>
      )}
    </div>
  );
};
HeaderCell.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  headerComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  width: PropTypes.string,
  data: PropTypes.object,
  withExpander: PropTypes.bool,
  selectable: PropTypes.bool,
  actions: PropTypes.object,
  hasExpandedRows: PropTypes.bool,
  onExpandAll: PropTypes.func,
};
HeaderCell.defaultProps = {
  id: '',
  title: '',
  headerComponent: null,
  width: '',
  data: {},
  withExpander: false,
  selectable: false,
  actions: {},
  hasExpandedRows: false,
  onExpandAll: () => {},
};
