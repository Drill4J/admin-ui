import axios from 'axios';

import { Message } from 'types/message';

export function startAgentSession(
  agentId: string,
  pluginId: string,
  showGeneralAlertMessage: (message: Message) => void,
) {
  return async ({ sessionId }: {sessionId: string}):Promise<void> => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'START',
        payload: { sessionId },
      });
      showGeneralAlertMessage && showGeneralAlertMessage({ type: 'SUCCESS', text: 'New session has been started successfully.' });
    } catch ({ response: { data: { message } = {} } = {} }) {
      showGeneralAlertMessage && showGeneralAlertMessage({
        type: 'ERROR',
        text: message || 'There is some issue with your action. Please try again.',
      });
    }
  };
}
