import { BuildVersion } from '../../../types/build-version';

export interface PluginState {
  agentId: string;
  pluginId: string;
  buildVersion: BuildVersion;
  loading: boolean;
}
