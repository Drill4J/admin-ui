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
import { useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import 'twin.macro';

import { StateWatcher, MonitoringButton } from 'components';
import { useAgent, useStateWatcher, useInstanceIds } from 'hooks';
import { transformDateToLocalDatetime } from 'utils';
import { StateWatcherPluginHeader } from './state-watcher-plugin-header';

export const StateWatcherPlugin = () => {
  const { agentId = '', buildVersion = '' } = useParams<{ agentId: string; buildVersion: string; }>();
  const { buildVersion: activeBuildVersion = '', instanceIds = [] } = useAgent(agentId) || {};

  const { observableInstances, toggleInstanceActiveStatus } = useInstanceIds(instanceIds);
  const [range, setRange] = useState({
    from: Date.now() - 60000,
    to: Date.now(),
  });

  const {
    data, setData, isLoading, setIsLoading,
  } = useStateWatcher(agentId, buildVersion, {
    ...range,
    instanceIds: observableInstances
      .filter(({ isActive }) => isActive).map(({ instanceId }) => instanceId),
  });

  const isActiveBuildVersion = buildVersion === activeBuildVersion;
  const startDate = new Date(range.from);
  const endDate = new Date(range.to);

  return (
    <div tw="w-full h-full px-6">
      <StateWatcherPluginHeader
        items={(
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
              agentId={agentId}
              size="large"
              data={data}
              setData={setData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        )}
      />
      <StateWatcher
        data={data}
        observableInstances={observableInstances}
        toggleInstanceActiveStatus={toggleInstanceActiveStatus}
        isActiveBuildVersion={isActiveBuildVersion}
        height={400}
      />
    </div>
  );
};
