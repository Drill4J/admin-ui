import axios from 'axios';

export function renameBuildVersion(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async ({ buildVersion, alias }: { buildVersion: string; alias: string }) => {
    try {
      await axios.post(`/agents/${agentId}/rename-build`, {
        id: buildVersion,
        name: alias,
      });
      onSuccess && onSuccess();
    } catch ({ response: { data } }) {
      onError && onError(data);
    }
  };
}
