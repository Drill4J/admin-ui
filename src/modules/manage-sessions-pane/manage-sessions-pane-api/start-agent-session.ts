import axios from 'axios';

import { StartSessionPayloadTypes } from './start-session-payload-types';

export function startAgentSession(
  agentId: string,
  pluginId: string,
) {
  return async ({ sessionId, isGlobal, isRealtime }: StartSessionPayloadTypes): Promise<void> => {
    await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
      type: 'START',
      payload: { sessionId, isGlobal, isRealtime },
    });
  };
}
