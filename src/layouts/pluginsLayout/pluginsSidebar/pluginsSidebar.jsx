import classNames from 'classnames/bind';
import { NavLink } from 'redux-first-router-link';
import { PLUGIN_PAGE } from 'common/constants';
import styles from './pluginsSidebar.scss';

const cx = classNames.bind(styles);

const plugins = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
];

export const PluginsSidebar = () => (
  <div className={cx('plugins-sidebar')}>
    {plugins.map((plugin) => (
      <NavLink
        className={cx('item')}
        activeClassName={cx('active')}
        key={plugin.id}
        to={{
          type: PLUGIN_PAGE,
          payload: {
            pluginId: plugin.id,
          },
        }}
      >
        {plugin.id}
      </NavLink>
    ))}
  </div>
);
