import { Agent } from '../../../types/agent';

export interface PluginState {
  agentId: string;
  pluginId: string;
  buildVersion: string;
  loading: boolean;
  agent?: Agent;
}
