import axios from 'axios';

import { Message } from 'types/message';

export const finishAllSession = async (
  { agentId, agentType, pluginId }: { agentId: string, agentType: string, pluginId: string },
  showGeneralAlertMessage: (message: Message) => void,
): Promise<void> => {
  try {
    await axios.post(`/${agentType === 'ServiceGroup' ? 'service-groups' : 'agents'}/${agentId}/plugins/${pluginId}/dispatch-action`, {
      type: 'STOP_ALL',
    });
    showGeneralAlertMessage && showGeneralAlertMessage({
      type: 'SUCCESS',
      text: 'Sessions have been finished successfully. All your progress has been added to the active scope.',
    });
  } catch ({ response: { data: { message } = {} } = {} }) {
    showGeneralAlertMessage && showGeneralAlertMessage({
      type: 'ERROR',
      text: message || 'There is some issue with your action. Please try again.',
    });
  }
};
