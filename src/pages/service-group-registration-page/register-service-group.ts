import axios from 'axios';

import { Agent } from 'types/agent';

export function registerAgent({ onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void}) {
  return (
    {
      id,
      plugins,
      name = '',
      systemSettings: {
        packages = [],
      } = {},
    }: Agent,
  ) => {
    try {
      axios.patch(`/service-groups/${id}`, {
        plugins,
        name,
        systemSettings: {
          packages,
        },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
