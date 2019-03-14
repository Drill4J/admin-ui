import axios from 'axios';

import { Agent } from './agent-types';

// TODO: write unit test
export const getSelectedAgentsActions = (
  agents: Agent[],
  selectedAgentsIds: string[],
  setSelectedAgents: (selected: string[]) => void,
) => {
  const selectedAgentsMap = getSelectedAgentsMap(agents, selectedAgentsIds);
  const disableIds = Object.keys(selectedAgentsMap).filter((key) => selectedAgentsMap[key]);
  const enableIds = Object.keys(selectedAgentsMap).filter((key) => !selectedAgentsMap[key]);

  return [
    {
      label: 'Enable Drill4J',
      onClick: getOnClickFunction(enableIds, setSelectedAgents),
      count: enableIds.length,
    },
    {
      label: 'Disable Drill4J',
      onClick: getOnClickFunction(disableIds, setSelectedAgents),
      count: disableIds.length,
    },
  ];
};

// TODO: write unit test
const getOnClickFunction = (
  toggleIds: string[],
  setSelectedAgents: (selectedIds: string[]) => void,
) => () => {
  toggleIds.forEach((id) => axios.post(`agents/${id}/toggle-standby`));
  setSelectedAgents([]);
};

// TODO: write unit test
export const getSelectedAgentsMap = (agents: Agent[], selectedAgentsIds: string[]) =>
  agents.reduce<{ [key: string]: boolean }>(
    (acc, { ipAddress = '', status }) =>
      selectedAgentsIds.includes(ipAddress) ? { ...acc, [ipAddress]: Boolean(status) } : acc,
    {},
  );
