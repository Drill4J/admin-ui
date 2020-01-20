import axios from 'axios';

import { ScopeSummary } from 'types/scope-summary';
import { finishScope } from './finish-scope';

export function deleteScope(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async ({ id, active }: ScopeSummary) => {
    if (active) {
      await finishScope(agentId, { onSuccess, onError })({
        prevScopeEnabled: false,
        savePrevScope: false,
      });
    } else {
      try {
        await axios.post(`/agents/${agentId}/test-to-code-mapping/dispatch-action`, {
          type: 'DROP_SCOPE',
          payload: { scopeId: id },
        });
        onSuccess && onSuccess();
      } catch ({ response: { data: { message } = {} } = {} }) {
        onError && onError(message);
      }
    }
  };
}
