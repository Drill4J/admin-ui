import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ExceptionFrame } from './exceptionFrame';
import styles from './exceptionFrames.css';

const cx = classNames.bind(styles);

export class ExceptionFrames extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    const frames = data.stackTrace.map((frame, index) => ({ ...frame, id: index }));

    return (
      <div className={cx('exception-frames')}>
        {frames.map((frame) => (
          <ExceptionFrame frame={frame} key={frame.id} />
        ))}
      </div>
    );
  }
}
