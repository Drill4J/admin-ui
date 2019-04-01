import { WsConnection } from './ws-connection';

export const defaultAdminSocket = new WsConnection();

export const defaultPluginSocket = new WsConnection('drill-plugin-socket');
