import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import classNames from 'classnames/bind';
import ArrowIcon from 'common/img/icon-arrow-down-inline.svg';
import styles from './expanderCell.css';

const cx = classNames.bind(styles);

export const ExpanderCell = ({ expanded, onExpand, width }) => (
  <div className={cx('expander-cell')} style={{ width }}>
    <i className={cx('expand-icon', { expanded })} onClick={onExpand}>
      {Parser(ArrowIcon)}
    </i>
  </div>
);
ExpanderCell.propTypes = {
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  width: PropTypes.string,
};
ExpanderCell.defaultProps = {
  expanded: false,
  onExpand: () => {},
  width: '',
};
