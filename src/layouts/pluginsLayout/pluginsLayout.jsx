import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ScrollWrapper } from 'components/scrollWrapper';
import { PluginsSidebar } from './pluginsSidebar';
import styles from './pluginsLayout.css';

const cx = classNames.bind(styles);

export const PluginsLayout = ({ children }) => (
  <div className={cx('plugins-layout')}>
    <PluginsSidebar />
    <ScrollWrapper>
      <div className={cx('content')}>{children}</div>
    </ScrollWrapper>
  </div>
);

PluginsLayout.propTypes = {
  children: PropTypes.node,
};

PluginsLayout.defaultProps = {
  children: null,
};
