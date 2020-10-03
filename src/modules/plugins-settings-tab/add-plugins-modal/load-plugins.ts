import axios from 'axios';

export const loadPlugins = (
  connectionTopic: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) => async (selectedPlugins: string[]) => {
  try {
    await Promise.all(
      selectedPlugins.map((pluginId) => axios.post(connectionTopic, { pluginId })),
    );
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'Internal service error');
  }
};
