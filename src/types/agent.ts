import { CommonEntity } from 'types/common-entity';
import { Plugin } from './plugin';
import { SystemSettings } from './system-settings';

export interface Agent extends CommonEntity {
  status?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY';
  drillAdminUrl?: string;
  address?: string;
  plugins?: Plugin[];
  activePluginsCount?: number;
  buildVersion?: string;
  buildVersions?: string[];
  buildAlias?: string;
  serviceGroup?: string;
  agentType?: string;
  agentVersion?: string;
  systemSettings?: SystemSettings;
}
