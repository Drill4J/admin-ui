import { DrillSocket } from '@drill4j/socket';

import { TOKEN_KEY } from '../constants';

const getSocketUrl = (socket: string) => {
  const token = localStorage.getItem(TOKEN_KEY);

  return `wss://${
    process.env.REACT_APP_ENV ? window.location.host : 'localhost:8443'
  }/ws/${socket}?token=${token}`;
};

export const defaultAdminSocket = new DrillSocket(getSocketUrl('drill-admin-socket'));

export const defaultPluginSocket = new DrillSocket(getSocketUrl('drill-plugin-socket'));
