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
import { useEffect, useState } from 'react';

import { ActiveSession } from 'types/active-session';
import { defaultTest2CodePluginSocket } from 'common/connection';

export function useActiveSessions(
  agentType: string,
  id: string,
  buildVersion?: string,
): ActiveSession[] | null {
  const [data, setData] = useState<ActiveSession[] | null>(null);
  const message =
    agentType === 'Agent'
      ? {
          agentId: id,
          buildVersion,
          type: 'AGENT',
        }
      : { groupId: id, type: 'GROUP' };
  const topic = agentType === 'Agent' ? '/active-scope/active-sessions' : '/group/active-sessions';

  useEffect(() => {
    function handleDataChange(newData: ActiveSession[]) {
      setData(newData);
    }

    const unsubscribe = defaultTest2CodePluginSocket.subscribe(topic, handleDataChange, message);

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [id, buildVersion]);

  return data;
}
