export interface Agent {
  name?: string;
  group?: string;
  description?: string;
  isEnable?: boolean;
  drillAdminUrl?: string;
  address?: string;
  rawPluginNames?: string[];
  ipAddress?: string;
  activePluginsCount?: number;
  pluginsCount?: number;
}
