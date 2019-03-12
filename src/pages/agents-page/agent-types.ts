export interface Agent {
  agentName?: string;
  agentGroupName?: string;
  agentDescription?: string;
  isEnable?: boolean;
  drillAdminUrl?: string;
  agentAddress?: string;
  rawPluginNames?: string[];
}
