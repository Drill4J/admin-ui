import axios from 'axios';

export function finishScope(
  agentId: string,
  pluginId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (params: { prevScopeEnabled: boolean; savePrevScope: boolean }) => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'SWITCH_ACTIVE_SCOPE',
        payload: { scopeName: '', ...params },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message);
    }
  };
}
