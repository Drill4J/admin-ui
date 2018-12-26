import classNames from 'classnames/bind';
import { ExceptionFrames } from '../../exceptionFrames';
import styles from './exceptionsGridSubInfo.css';

const cx = classNames.bind(styles);

export const ExceptionsGridSubInfo = (props) => (
  <div className={cx('exceptions-grid-sub-info')}>
    <ExceptionFrames {...props} />
  </div>
);
