import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './scrollWrapper.css';

const cx = classNames.bind(styles);

export class ScrollWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    autoHide: PropTypes.bool,
    autoHeight: PropTypes.bool,
    autoHeightMin: PropTypes.number,
    autoHideTimeout: PropTypes.number,
    autoHeightMax: PropTypes.number,
    renderTrackHorizontal: PropTypes.func,
    renderTrackVertical: PropTypes.func,
    renderThumbHorizontal: PropTypes.func,
    renderThumbVertical: PropTypes.func,
    renderView: PropTypes.func,
    hideTracksWhenNotNeeded: PropTypes.bool,
    thumbMinSize: PropTypes.number,
  };
  static defaultProps = {
    children: {},
    disabled: false,
    autoHide: false,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    autoHideTimeout: 500,
    renderTrackHorizontal: (props) => <div {...props} className={cx('track-horizontal')} />,
    renderTrackVertical: (props) => <div {...props} className={cx('track-vertical')} />,
    renderThumbHorizontal: (props) => <div {...props} className={cx('thumb-horizontal')} />,
    renderThumbVertical: (props) => <div {...props} className={cx('thumb-vertical')} />,
    renderView: (props) => <div {...props} className={cx('scrolling-content')} />,
    hideTracksWhenNotNeeded: false,
    thumbMinSize: 30,
  };

  handleScrollFrame = (values) => {
    if (values.scrollTop !== this.scrollbars.lastViewScrollTop) {
      this.scrollbars.thumbVertical.style.opacity = 1;
    }
    if (values.scrollLeft !== this.scrollbars.lastViewScrollLeft) {
      this.scrollbars.thumbHorizontal.style.opacity = 1;
    }
  };
  handleScrollStop = () => {
    this.scrollbars.thumbVertical.style.opacity = '';
    this.scrollbars.thumbHorizontal.style.opacity = '';
  };

  render() {
    return this.props.disabled ? (
      this.props.children // base props are defined. For more info see https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/API.md
    ) : (
      <Scrollbars
        ref={(scrollbars) => {
          this.scrollbars = scrollbars;
        }}
        className={cx('scroll-component')}
        autoHide={this.props.autoHide}
        autoHeight={this.props.autoHeight}
        autoHeightMin={this.props.autoHeightMin}
        autoHeightMax={this.props.autoHeightMax}
        autoHideTimeout={this.props.autoHideTimeout}
        renderTrackHorizontal={this.props.renderTrackHorizontal}
        renderTrackVertical={this.props.renderTrackVertical}
        renderThumbHorizontal={this.props.renderThumbHorizontal}
        renderThumbVertical={this.props.renderThumbVertical}
        renderView={this.props.renderView}
        hideTracksWhenNotNeeded={this.props.hideTracksWhenNotNeeded}
        thumbMinSize={this.props.thumbMinSize}
        onScrollFrame={this.handleScrollFrame}
        onScrollStop={this.handleScrollStop}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
