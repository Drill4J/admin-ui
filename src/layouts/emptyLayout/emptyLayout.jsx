import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './emptyLayout.css';

const cx = classNames.bind(styles);

export const EmptyLayout = ({ children }) => (
  <div className={cx('empty-layout')}>
    <div className={cx('content')}>
      <div className={cx('header')}>
        <div className={cx('logo')} />
      </div>
      <div className={cx('body')}>{children}</div>
    </div>
  </div>
);

EmptyLayout.propTypes = {
  children: PropTypes.node,
};
EmptyLayout.defaultProps = {
  children: null,
};
