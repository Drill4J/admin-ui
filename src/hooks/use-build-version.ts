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
import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { Search } from 'types/search';
import { Sort } from 'types/sort';
import { OutputType } from 'types/output-type';
import { usePluginState } from 'pages/agent-full-page/store';

export function useBuildVersion<Data>(
  topic: string,
  filters?: Search[],
  orderBy?: Sort[],
  output?: OutputType,
  activeBuildVersion?: string,
): Data | null {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = agentId && buildVersion
      ? defaultTest2CodePluginSocket.subscribe(topic, handleDataChange, {
        agentId,
        buildVersion: activeBuildVersion || buildVersion,
        type: 'AGENT',
        filters,
        orderBy,
        output,
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [agentId, buildVersion, activeBuildVersion, topic, orderBy, filters]);

  return data;
}
