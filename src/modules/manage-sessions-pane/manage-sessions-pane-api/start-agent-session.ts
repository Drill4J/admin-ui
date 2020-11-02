import axios from 'axios';

export function startAgentSession(
  agentId: string,
  pluginId: string,
) {
  return async ({ sessionId }: {sessionId: string}): Promise<void> => {
    await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
      type: 'START',
      payload: { sessionId },
    });
  };
}
