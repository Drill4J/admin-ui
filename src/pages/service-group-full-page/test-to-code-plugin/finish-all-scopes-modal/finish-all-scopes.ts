import axios from 'axios';

export function finishAllScopes(
  serviceGroupId: string,
  pluginId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (params: { prevScopeEnabled: boolean; savePrevScope: boolean }) => {
    try {
      await axios.post(`/agents/${serviceGroupId}/${pluginId}/dispatch-action`, {
        type: 'SWITCH_ACTIVE_SCOPE',
        payload: { scopeName: '', ...params },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'There is some issue with scopes finishing. Please try again later');
    }
  };
}
