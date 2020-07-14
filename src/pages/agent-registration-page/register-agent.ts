import axios from 'axios';
import { Agent } from 'types/agent';

export function registerAgent(onSuccess?: () => void) {
  return (
    {
      id,
      name,
      environment,
      packages = [],
      description,
      plugins,
      sessionIdHeaderName,
    }: Agent,
    onError: (message: string) => void,
  ) => {
    try {
      axios.patch(`/agents/${id}`, {
        name,
        environment,
        packages: packages.filter(Boolean),
        description,
        plugins,
        sessionIdHeaderName,
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
