import { BuildVersion } from '../../../types/build-version';
import { Agent } from '../../../types/agent';

export interface PluginState {
  agentId: string;
  pluginId: string;
  buildVersion: BuildVersion;
  loading: boolean;
  agent?: Agent;
}
