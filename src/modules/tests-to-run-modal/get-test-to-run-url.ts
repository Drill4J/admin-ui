export function getTestToRunURL(agentId: string, pluginId: string, agentType?: string) {
  const adminUrl = new URL(
    process.env.REACT_APP_ENV
      ? `http://${window.location.host}`
      : 'http://ecse005002af.epam.com:8090',
  );

  const openApiUrl = 'curl -i -H "Accept: application/json" -H "Content-Type: application/json" '
    + `-X GET ${adminUrl}api/${agentType === 'ServiceGroup' ? 'service-group' : 'agents'}/${agentId}/plugin/${pluginId}/data/tests-to-run`;

  return openApiUrl;
}
