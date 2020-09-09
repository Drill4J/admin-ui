import { adminUrl } from './admin-url';

export function getQualityGateConfigurationUrl(agentId: string, pluginId: string) {
  const openApiUrl = 'curl -i -H "accept: application/json" -H "content-type: application/json" '
    + `-w "\\n" -X GET ${adminUrl}api/agents/${agentId}/plugins/${pluginId}/data/quality-gate`;

  return openApiUrl;
}
