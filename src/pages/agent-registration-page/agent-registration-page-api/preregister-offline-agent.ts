import axios from 'axios';

import { Agent } from 'types/agent';

export function preregisterOfflineAgent(onSuccess?: () => void) {
  return async (
    {
      id,
      name,
      environment,
      description,
      plugins,
      systemSettings,
    }: Agent,
    onError: (message: string) => void,
  ): Promise<void> => {
    try {
      await axios.post('/agents', {
        id,
        name,
        agentType: 'JAVA',
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
      onError && onError(message || 'There is some issue with your action. Please try again.');
    }
  };
}
