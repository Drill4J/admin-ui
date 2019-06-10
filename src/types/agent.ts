import { Plugin } from './plugin';
import { BuildVersion } from './build-version';

export interface Agent {
  id?: string;
  name?: string;
  group?: string;
  description?: string;
  status?: 'READY' | 'NOT_REGISTERED';
  drillAdminUrl?: string;
  address?: string;
  rawPluginsName?: Plugin[];
  ipAddress?: string;
  activePluginsCount?: number;
  pluginsCount?: number;
  buildVersion?: string;
  buildVersions?: BuildVersion[];
}
