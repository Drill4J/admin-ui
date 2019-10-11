import axios from 'axios';

export function finishScope(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (params: { prevScopeEnabled: boolean; savePrevScope: boolean }) => {
    try {
      await axios.post(`/agents/${agentId}/test-to-code-mapping/dispatch-action`, {
        type: 'SWITCH_ACTIVE_SCOPE',
        payload: { scopeName: '', ...params },
      });
      onSuccess && onSuccess();
    } catch ({ message }) {
      onError && onError(message);
    }
  };
}
