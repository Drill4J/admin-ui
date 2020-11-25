import axios from 'axios';

import { Message } from 'types/message';

export const abortAllSession = async (
  { agentId, agentType, pluginId }: { agentId: string, agentType: string, pluginId: string },
  showGeneralAlertMessage: (message: Message) => void,
): Promise<void> => {
  try {
    await axios.post(`/${agentType === 'ServiceGroup' ? 'service-groups' : 'agents'}/${agentId}/plugins/${pluginId}/dispatch-action`, {
      type: 'CANCEL_ALL',
    });
    showGeneralAlertMessage && showGeneralAlertMessage({ type: 'SUCCESS', text: 'Sessions has been aborted successfully.' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    showGeneralAlertMessage && showGeneralAlertMessage({
      type: 'ERROR',
      text: message || 'There is some issue with your action. Please try again.',
    });
  }
};
