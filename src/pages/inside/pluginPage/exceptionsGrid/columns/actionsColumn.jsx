import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../exceptionsGrid.scss';

const cx = classNames.bind(styles);

export const ActionsColumn = ({ data, actions }) => (
  <div>
    <span
      className={cx('action-link')}
      onClick={() => actions.onDeleteStackTrace(data.destination, data.id)}
    >
      delete
    </span>
  </div>
);

ActionsColumn.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    onDeleteStackTrace: PropTypes.func.isRequired,
  }).isRequired,
};
