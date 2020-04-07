import { DrillSocket } from '@drill4j/socket';

import { TOKEN_KEY } from '../constants';

export const getSocketUrl = (socket: string) => {
  const token = localStorage.getItem(TOKEN_KEY);

  return `${window.location.href.startsWith('https') ? 'wss' : 'ws'}://${
    process.env.REACT_APP_ENV ? window.location.host : '194.67.92.202:8090'
  }/ws/${socket}?token=${token}`;
};

export const defaultAdminSocket = new DrillSocket(getSocketUrl('drill-admin-socket'));

export const defaultPluginSocket = new DrillSocket(getSocketUrl('drill-plugin-socket'));
