import { Plugin } from './plugin';

export interface Agent {
  name?: string;
  group?: string;
  description?: string;
  status?: boolean;
  drillAdminUrl?: string;
  address?: string;
  rawPluginsName?: Plugin[];
  ipAddress?: string;
  activePluginsCount?: number;
  pluginsCount?: number;
}
