import { adminUrl } from './admin-url';

export function getTestToRunURL(agentId: string, pluginId: string, agentType?: string) {
  const openApiUrl = 'curl -i -H "accept: application/json" -H "content-type: application/json" '
    + `-w "\n" -X GET ${adminUrl}api/${agentType === 'ServiceGroup'
      ? 'service-group' : 'agents'}/${agentId}/plugin/${pluginId}/data/tests-to-run`;

  return openApiUrl;
}
