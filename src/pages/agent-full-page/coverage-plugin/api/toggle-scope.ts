import axios from 'axios';

export function toggleScope(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (scopeId: string) => {
    try {
      await axios.post(`/agents/${agentId}/coverage/dispatch-action`, {
        type: 'TOGGLE_SCOPE',
        payload: { scopeId },
      });
      onSuccess && onSuccess();
    } catch ({ message }) {
      onError && onError(message);
    }
  };
}
