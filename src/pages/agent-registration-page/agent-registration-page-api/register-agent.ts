import axios from 'axios';
import { Agent } from 'types/agent';

export function registerAgent(onSuccess?: () => void) {
  return (
    {
      id,
      name,
      environment,
      description,
      plugins,
      systemSettings,
    }: Agent,
    onError: (message: string) => void,
  ) => {
    try {
      axios.patch(`/agents/${id}`, {
        name,
        environment,
        description,
        plugins,
        systemSettings: {
          ...systemSettings,
          packages: systemSettings?.packages?.filter(Boolean),
        },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
