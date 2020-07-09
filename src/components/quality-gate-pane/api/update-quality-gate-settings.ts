import axios from 'axios';

import { ConditionSettingByType } from 'types/quality-gate-type';

export function updateQualityGateSettings(
  agentId: string,
  pluginId: string,
  onError: (message: string) => void,
) {
  return async (formValues: ConditionSettingByType) => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'UPDATE_SETTINGS',
        payload: [
          { type: 'condition', enabled: formValues.coverage.enabled, condition: formValues.coverage.condition },
          { type: 'condition', enabled: formValues.risks.enabled, condition: formValues.risks.condition },
          { type: 'condition', enabled: formValues.tests.enabled, condition: formValues.tests.condition },
        ],
      });
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'On-submit error. Server problem or operation could not be processed in real-time');
    }
  };
}
