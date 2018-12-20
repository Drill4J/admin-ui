import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './gridCell.scss';

const cx = classNames.bind(styles);

const TextCell = ({ value }) => (
  <div className={cx('text-cell')}>
    <span>{value}</span>
  </div>
);
TextCell.propTypes = {
  value: PropTypes.any,
};
TextCell.defaultProps = {
  value: '',
};

export const GridCell = ({ component: CellComponent, data, meta, actions, width }) => (
  <div className={cx('grid-cell')} style={{ width }}>
    <CellComponent data={data} actions={actions} meta={meta} className={cx('grid-cell')} />
  </div>
);
GridCell.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  data: PropTypes.object,
  meta: PropTypes.object,
  actions: PropTypes.object,
  width: PropTypes.string,
};
GridCell.defaultProps = {
  component: TextCell,
  data: {},
  meta: {},
  actions: {},
  title: {},
  width: '',
};
