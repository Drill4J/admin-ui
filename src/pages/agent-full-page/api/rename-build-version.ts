import axios from 'axios';

import { BuildVersion } from '../../../types/build-version';

export function renameBuildVersion(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (buildVersion: BuildVersion) => {
    try {
      await axios.post(`/agents/${agentId}/rename-build`, buildVersion);
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
