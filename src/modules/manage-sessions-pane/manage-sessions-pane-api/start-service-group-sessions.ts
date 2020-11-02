import axios from 'axios';

export function startServiceGroupSessions(
  serviceGroupId: string,
  pluginId: string,
) {
  return async ({ sessionId }: {sessionId: string}): Promise<void> => {
    await axios.post(`/service-groups/${serviceGroupId}/plugins/${pluginId}/dispatch-action`, {
      type: 'START',
      payload: { sessionId },
    });
  };
}
