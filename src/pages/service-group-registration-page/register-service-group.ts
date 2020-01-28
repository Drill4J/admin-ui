import axios from 'axios';

import { Agent } from 'types/agent';

export function registerAgent({ onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void}) {
  return (
    {
      id,
      plugins,
      name = '',
      packagesPrefixes = [],
    }: Agent,
  ) => {
    try {
      axios.post(`/service-group/${id}/register`, {
        plugins,
        name,
        packagesPrefixes,
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
