import axios from 'axios';

import { Message } from 'types/message';

export function abortSession(
  agentId: string,
  pluginId: string,
  showGeneralAlertMessage: (message: Message) => void,
) {
  return async (sessionId: string): Promise<void> => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'CANCEL',
        payload: { sessionId },
      });
      showGeneralAlertMessage && showGeneralAlertMessage({ type: 'SUCCESS', text: 'Session has been aborted successfully.' });
    } catch ({ response: { data: { message } = {} } = {} }) {
      showGeneralAlertMessage && showGeneralAlertMessage({
        type: 'ERROR',
        text: message || 'There is some issue with your action. Please try again.',
      });
    }
  };
}
