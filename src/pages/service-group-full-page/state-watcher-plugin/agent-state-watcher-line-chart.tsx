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
import { TextField } from '@material-ui/core';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { StateWatcher, MonitoringButton } from 'components';
import { useAgent, useStateWatcher, useInstanceIds } from 'hooks';
import { transformDateToLocalDatetime } from 'utils';

interface Props {
  id: string;
  buildVersion: string;
  instanceIds: string[];
}

export const AgentStateWatcherLineChart = ({ id, buildVersion, instanceIds }: Props) => {
  const [isMonitored, setIsMonitored] = useState(false);

  const { observableInstances, toggleInstanceActiveStatus } = useInstanceIds(instanceIds);

  const [range, setRange] = useState({
    from: Date.now() - 60000,
    to: Date.now(),
  });
  const startDate = new Date(range.from);
  const endDate = new Date(range.to);

  const {
    data, setData, isLoading, setIsLoading,
  } = useStateWatcher(id, buildVersion, {
    ...range,
    instanceIds: observableInstances
      .filter(({ isActive }) => isActive).map(({ instanceId }) => instanceId),
  });

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
        <div tw="flex gap-x-4 items-center">
          <TextField
            id="datetime-local"
            label="Start"
            type="datetime-local"
            defaultValue={transformDateToLocalDatetime(startDate)}
            onBlur={({ target }) => {
              setRange({ ...range, from: new Date(target.value).getTime() });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="End"
            type="datetime-local"
            defaultValue={transformDateToLocalDatetime(endDate)}
            onBlur={({ target }) => {
              setRange({ ...range, to: new Date(target.value).getTime() });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <MonitoringButton
            agentId={id}
            size="large"
            data={data}
            setData={setData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onClick={() => setIsMonitored(true)}
          />
        </div>
      </div>
      {isMonitored && (
        <div tw="px-8 py-6 border-b border-l border-r border-monochrome-medium-tint">
          <StateWatcher
            data={data}
            observableInstances={observableInstances}
            toggleInstanceActiveStatus={toggleInstanceActiveStatus}
            isActiveBuildVersion={isActiveBuildVersion}
            height={180}
          />
        </div>
      )}
    </>
  );
};
