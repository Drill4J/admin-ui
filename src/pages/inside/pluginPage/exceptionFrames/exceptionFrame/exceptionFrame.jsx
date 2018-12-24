import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Parse from 'html-react-parser';
import ExpandIcon from 'common/img/icon-arrow-down-inline.svg';
import styles from './exceptionFrame.scss';

const cx = classNames.bind(styles);

export class ExceptionFrame extends PureComponent {
  static propTypes = {
    frame: PropTypes.object.isRequired,
  };

  state = {
    expanded: false,
  };

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { expanded } = this.state;
    const { frame } = this.props;
    const expandIconClassNames = cx('expand-icon', {
      expanded,
      hide: frame.localVariables.length === 0,
    });

    return (
      <div className={cx('exception-frame')}>
        <div className={cx('name-row')} onClick={this.toggleExpand}>
          <i className={expandIconClassNames}>{Parse(ExpandIcon)}</i>
          <div className={cx('name', { expanded })}>at {frame.name}</div>
        </div>
        {expanded && (
          <div className={cx('variables')}>
            {frame.localVariables.map((variable) => (
              <div className={cx('variable')} key={variable}>
                {variable}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
