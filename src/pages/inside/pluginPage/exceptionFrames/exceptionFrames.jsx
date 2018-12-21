import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ExceptionFrame } from './exceptionFrame';
import styles from './exceptionFrames.scss';

const cx = classNames.bind(styles);

export class ExceptionFrames extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <div className={cx('exception-frames')}>
        {data.stackTrace.map((frame, index) => ({ ...frame, id: index })).map((frame) => (
          <ExceptionFrame frame={frame} key={frame.id} />
        ))}
      </div>
    );
  }
}
