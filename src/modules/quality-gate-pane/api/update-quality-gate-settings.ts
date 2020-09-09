import axios from 'axios';

import { ConditionSettingByType } from 'types/quality-gate-type';
import { Message } from 'types/message';

export function updateQualityGateSettings(
  agentId: string,
  pluginId: string,
  showGeneralAlertMessage: (message: Message) => void,
) {
  return async (formValues: ConditionSettingByType): Promise<void> => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'UPDATE_SETTINGS',
        payload: [
          {
            type: 'condition',
            enabled: formValues.coverage.enabled,
            condition: {
              ...formValues.coverage.condition,
              value: formValues.coverage.condition.value || 0.1,
            },
          },
          {
            type: 'condition',
            enabled: formValues.risks.enabled,
            condition: {
              ...formValues.risks.condition,
              value: formValues.risks.condition.value || 0,
            },
          },
          {
            type: 'condition',
            enabled: formValues.tests.enabled,
            condition: {
              ...formValues.tests.condition,
              value: formValues.tests.condition.value || 0,
            },
          },
        ],
      });
      showGeneralAlertMessage({ type: 'SUCCESS', text: 'Quality Gate has been saved' });
    } catch ({ response: { data: { message } = {} } = {} }) {
      showGeneralAlertMessage({
        type: 'ERROR',
        text: message || 'On-submit error. Server problem or operation could not be processed in real-time',
      });
    }
  };
}
