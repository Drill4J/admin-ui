import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './noItemsView.scss';

const cx = classNames.bind(styles);

// Deprecated component. Remove after refactoring of noItemsView for pipeline wizard.
export const NoItemsView = ({ text }) => (
  <div className={cx('no-items-view')}>
    <div className={cx('text-content')}>
      {text.top && <div className={cx('top')}>{text.top}</div>}
      {text.bottom && <div className={cx('bottom')}>{text.bottom}</div>}
    </div>
  </div>
);

NoItemsView.propTypes = {
  text: PropTypes.object,
};
NoItemsView.defaultProps = {
  text: {},
};
