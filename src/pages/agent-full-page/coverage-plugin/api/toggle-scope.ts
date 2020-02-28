import axios from 'axios';

export function toggleScope(
  agentId: string,
  pluginId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (scopeId: string) => {
    try {
      await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
        type: 'TOGGLE_SCOPE',
        payload: { scopeId },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message);
    }
  };
}
