import { CommonEntity } from 'types/common-entity';
import { AgentStatus } from './agent-status';
import { Plugin } from './plugin';
import { SystemSettings } from './system-settings';

export interface Agent extends CommonEntity {
  status?: AgentStatus;
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
