import axios from 'axios';

import { Message } from 'types/message';

export function finishSession(
  agentId: string,
  pluginId: string,
  showGeneralAlertMessage: (message: Message) => void,
) {
  return async (sessionId: string):Promise<void> => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'STOP',
        payload: { sessionId },
      });
      showGeneralAlertMessage && showGeneralAlertMessage({
        type: 'SUCCESS',
        text: 'Session has been finished successfully. All your progress has been added to the active scope.',
      });
    } catch ({ response: { data: { message } = {} } = {} }) {
      showGeneralAlertMessage && showGeneralAlertMessage({
        type: 'ERROR',
        text: message || 'There is some issue with your action. Please try again.',
      });
    }
  };
}
