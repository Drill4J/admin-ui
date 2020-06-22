import { CommonEntity } from 'types/common-entity';
import { Plugin } from './plugin';

export interface Agent extends CommonEntity {
  status?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY';
  drillAdminUrl?: string;
  address?: string;
  plugins?: Plugin[];
  activePluginsCount?: number;
  buildVersion?: string;
  buildVersions?: string[];
  buildAlias?: string;
  packagesPrefixes?: string[];
  sessionIdHeaderName?: string;
  serviceGroup?: string;
  agentType?: string;
  agentVersion?: string;
}
