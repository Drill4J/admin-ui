import { CommonEntity } from 'types/common-entity';
import { Plugin } from './plugin';
import { BuildVersion } from './build-version';

export interface Agent extends CommonEntity {
  status?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY';
  drillAdminUrl?: string;
  address?: string;
  plugins?: Plugin[];
  ipAddress?: string;
  activePluginsCount?: number;
  buildVersion?: string;
  buildVersions?: BuildVersion[];
  buildAlias?: string;
  packagesPrefixes?: string[];
  sessionIdHeaderName?: string;
  serviceGroup?: string;
  agentType?: string;
}
