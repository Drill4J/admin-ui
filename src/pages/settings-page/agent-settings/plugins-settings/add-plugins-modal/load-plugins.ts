import axios from 'axios';

export const loadPlugins = (
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) => async (selectedPlugins: string[]) => {
  try {
    await Promise.all(
      selectedPlugins.map((pluginId) => axios.post(`/agents/${agentId}/load-plugin`, { pluginId })),
    );
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'Internal service error');
  }
};
