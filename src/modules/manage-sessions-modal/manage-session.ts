import axios from 'axios';

export function manageSession({
  agentType, agentId, pluginId, onSuccess, onError,
}: {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  agentType: string;
  agentId: string;
  pluginId: string;
}) {
  return async ({ sessionId, type }: { sessionId?: string; type?: 'START' | 'STOP' }) => {
    try {
      await axios
        .post(`/${agentType === 'ServiceGroup' ? 'service-groups' : 'agents'}/${agentId}/plugins/${pluginId}/dispatch-action`, {
          type,
          payload: { sessionId },
        });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message);
    }
  };
}
