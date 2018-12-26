import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ScrollWrapper } from 'components/scrollWrapper';
import styles from './appLayout.css';

const cx = classNames.bind(styles);

export const AppLayout = ({ children }) => (
  <div className={cx('app-layout')}>
    <ScrollWrapper>
      <div className={cx('content')}>{children}</div>
    </ScrollWrapper>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};
