/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import axios from 'axios';

export function finishAllScopes(
  serviceGroupId: string,
  pluginId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  return async (params: { prevScopeEnabled: boolean; savePrevScope: boolean }) => {
    try {
      await axios.post(`/groups/${serviceGroupId}/plugins/${pluginId}/dispatch-action`, {
        type: 'SWITCH_ACTIVE_SCOPE',
        payload: { scopeName: '', ...params },
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'There is some issue with scopes finishing. Please try again later');
    }
  };
}
