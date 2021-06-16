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
import { useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import 'twin.macro';

import { StateWatcher, MonitoringButton } from 'components';
import { useAgent, useStateWatcher } from 'hooks';
import { StateWatcherPluginHeader } from './state-watcher-plugin-header';

export const StateWatcherPlugin = () => {
  const { agentId = '', buildVersion = '' } = useParams<{ agentId: string; buildVersion: string; }>();
  const { buildVersion: activeBuildVersion = '', instanceIds = [] } = useAgent(agentId) || {};
  const props = useStateWatcher(agentId, buildVersion);

  const isActiveBuildVersion = buildVersion === activeBuildVersion;

  return (
    <div tw="w-full h-full px-6">
      <StateWatcherPluginHeader
        items={(
          <div tw="flex gap-x-4 items-center">
            <TextField
              id="datetime-local"
              label="Start"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="datetime-local"
              label="End"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <MonitoringButton agentId={agentId} size="large" {...props} />
          </div>
        )}
      />
      <StateWatcher
        instanceIds={instanceIds}
        isActiveBuildVersion={isActiveBuildVersion}
        height={400}
        {...props}
      />
    </div>
  );
};
