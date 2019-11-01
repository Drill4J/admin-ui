import axios from 'axios';

export function manageSession(
  agentId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (message: string) => void;
  },
) {
  return async ({ sessionId, type }: { sessionId?: string; type?: 'START' | 'STOP' }) => {
    try {
      await axios.post(`/agents/${agentId}/test-to-code-mapping/dispatch-action`, {
        type,
        payload: { sessionId },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data } }) {
      onError && onError(data);
    }
  };
}
