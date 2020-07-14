import axios from 'axios';

import { Agent } from 'types/agent';

export function registerAgent({ onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void}) {
  return (
    {
      id,
      plugins,
      name = '',
      packages = ['org/springframework/samples/petclinic'],
    }: Agent,
  ) => {
    try {
      axios.patch(`/service-groups/${id}`, {
        plugins,
        name,
        packages,
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
