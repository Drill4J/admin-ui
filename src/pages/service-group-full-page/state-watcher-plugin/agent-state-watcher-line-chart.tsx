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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { StateWatcher, MonitoringButton } from 'components';
import { useAgent, useStateWatcher } from 'hooks';

interface Props {
  id: string;
  buildVersion: string;
  instanceIds: string[];
}

export const AgentStateWatcherLineChart = ({ id, buildVersion, instanceIds }: Props) => {
  const [isMonitored, setIsMonitored] = useState(false);
  const props = useStateWatcher(id, buildVersion);

  const { buildVersion: activeBuildVersion = '' } = useAgent(id) || {};
  const isActiveBuildVersion = buildVersion === activeBuildVersion;
  return (
    <>
      <div tw="flex justify-between items-center py-5 border-b border-monochrome-medium-tint">
        <div tw="flex gap-x-3 text-blue-default items-baseline cursor-pointer">
          <Icons.Expander
            width={16}
            rotate={isMonitored ? 90 : 0}
            onClick={() => setIsMonitored(!isMonitored)}
          />
          <div tw="flex flex-col gap-y-1">
            <Link
              to={`/full-page/${id}/${buildVersion}/state-watcher/dashboard`}
              tw="text-14 leading-20 font-bold"
            >
              {id}
            </Link>
            <div tw="text-12 leading-16 text-monochrome-black">{buildVersion}</div>
          </div>
        </div>
        <MonitoringButton
          size="small"
          agentId={id}
          onClick={() => setIsMonitored(!isMonitored)}
          {...props}
        />
      </div>
      {isMonitored && (
        <div tw="px-8 py-6 border-b border-l border-r border-monochrome-medium-tint">
          <StateWatcher
            instanceIds={instanceIds}
            isActiveBuildVersion={isActiveBuildVersion}
            height={180}
            {...props}
          />
        </div>
      )}
    </>
  );
};
