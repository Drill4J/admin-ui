import axios from 'axios';

import { StartSessionPayloadTypes } from './start-session-payload-types';

export function startServiceGroupSessions(
  serviceGroupId: string,
  pluginId: string,
) {
  return async ({ sessionId, isGlobal, isRealtime }: StartSessionPayloadTypes): Promise<void> => {
    await axios.post(`/service-groups/${serviceGroupId}/plugins/${pluginId}/dispatch-action`, {
      type: 'START',
      payload: { sessionId, isGlobal, isRealtime },
    });
  };
}
