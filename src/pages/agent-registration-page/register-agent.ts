import axios from 'axios';
import { Agent } from 'types/agent';

export function registerAgent(onSuccess: () => void) {
  return async (
    { id, name, group, packagesPrefixes = [], description, plugins, sessionIdHeaderName }: Agent,
    onError: (message: string) => void,
  ) => {
    try {
      await axios.post(`/agents/${id}/register`, {
        name,
        group,
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
