import axios from 'axios';

// TODO: write unit test
export const getSelectedPLuginsActions = (
  agent: any,
  selectedPluginsIds: string[],
  setSelectedPLugins: (selected: string[]) => void,
) => {
  const selectedAgentsMap = getSelectedPluginsMap(agent.rawPluginsName, selectedPluginsIds);
  const disableIds = Object.keys(selectedAgentsMap).filter((key) => selectedAgentsMap[key]);
  const enableIds = Object.keys(selectedAgentsMap).filter((key) => !selectedAgentsMap[key]);

  return [
    {
      label: 'Enable',
      onClick: getOnClickFunction(agent.id, enableIds, setSelectedPLugins),
      count: enableIds.length,
    },
    {
      label: 'Disable',
      onClick: getOnClickFunction(agent.id, disableIds, setSelectedPLugins),
      count: disableIds.length,
    },
    {
      label: 'Unload',
      onClick: getUnloadFunction(agent.id, selectedPluginsIds, setSelectedPLugins),
      count: selectedPluginsIds.length,
    },
  ];
};

// TODO: write unit test
const getOnClickFunction = (
  agentId: string,
  toggleIds: string[],
  setSelectedAgents: (selectedIds: string[]) => void,
) => () => {
  toggleIds.forEach((pluginId) => axios.post(`agents/${agentId}/${pluginId}/toggle-plugin`));
  setSelectedAgents([]);
};

// TODO: write unit test
const getUnloadFunction = (
  agentId: string,
  toggleIds: string[],
  setSelectedPLugins: (selectedIds: string[]) => void,
) => () => {
  toggleIds.forEach((pluginId) => axios.post(`agents/${agentId}/unload-plugin`, { pluginId }));
  setSelectedPLugins([]);
};

// TODO: write unit test
export const getSelectedPluginsMap = (plugins: any[] = [], selectedPluginsIds: string[]) =>
  plugins.reduce<{ [key: string]: boolean }>(
    (acc, { id = '', status }) =>
      selectedPluginsIds.includes(id) ? { ...acc, [id]: Boolean(status) } : acc,
    {},
  );
