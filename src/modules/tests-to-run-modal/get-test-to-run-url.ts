import { adminUrl } from './admin-url';

export function getTestToRunURL(agentId: string, pluginId: string, agentType?: string) {
  const openApiUrl = 'curl -i -H "accept: application/json" -H "content-type: application/json" '
    + `-w "\\n" -X GET ${adminUrl}api/${agentType === 'ServiceGroup'
      ? 'service-groups' : 'agents'}/${agentId}/plugins/${pluginId}/data/tests-to-run`;

  return openApiUrl;
}
