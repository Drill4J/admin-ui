import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../exceptionsGrid.scss';

const cx = classNames.bind(styles);

export const EventColumn = ({ data }) => (
  <div>
    <span className={cx('exception-type')}>{data.type}</span>
    <span className={cx('exception-message')}>{data.message}</span>
  </div>
);

EventColumn.propTypes = {
  data: PropTypes.object.isRequired,
};
