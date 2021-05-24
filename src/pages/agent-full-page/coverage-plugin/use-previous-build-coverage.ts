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
import { BuildCoverage } from 'types/build-coverage';
import { usePluginState } from '../store';

export function usePreviousBuildCoverage(previousBuildVersion: string): BuildCoverage | null {
  const { agentId } = usePluginState();
  const [data, setData] = useState<BuildCoverage | null>(null);

  useEffect(() => {
    function handleDataChange(newData: BuildCoverage) {
      setData(newData);
    }

    const unsubscribe =
      agentId && previousBuildVersion
        ? defaultTest2CodePluginSocket.subscribe('/build/coverage', handleDataChange, {
            agentId,
            buildVersion: previousBuildVersion,
            type: 'AGENT',
          })
        : null;

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [previousBuildVersion]);

  return data;
}
