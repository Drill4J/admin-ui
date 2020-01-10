import axios from 'axios';
import { Agent } from 'types/agent';

export function registerAgent(onSuccess?: () => void) {
  return (
    {
      id,
      name,
      environment,
      packagesPrefixes = [],
      description,
      plugins,
      sessionIdHeaderName,
    }: Agent,
    onError: (message: string) => void,
  ) => {
    try {
      axios.post(`/agents/${id}/register`, {
        name,
        environment,
        packagesPrefixes: packagesPrefixes.filter(Boolean),
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
