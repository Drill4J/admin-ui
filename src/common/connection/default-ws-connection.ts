import { DrillSocket } from '@drill4j/socket';

// process.env.REACT_APP_ENV
//   ? `wss://${window.location.host}/ws/${socket}`
//   : `wss://localhost:8443/ws/${socket}`,

export const defaultAdminSocket = new DrillSocket();

export const defaultPluginSocket = new DrillSocket('drill-plugin-socket');
