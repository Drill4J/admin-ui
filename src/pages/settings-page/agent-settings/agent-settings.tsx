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
import { Icons } from '@drill4j/ui-kit';
import {
  useParams, Prompt, Switch, Route,
} from 'react-router-dom';
import 'twin.macro';

import { TabsPanel, Tab, PageHeader } from 'components';
import { useAgent } from 'hooks';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { GeneralSettingsForm } from './general-settings-form';
import { JsSystemSettingsForm } from './js-system-settings-form';
import { AgentStatusToggle } from '../../agents-page/agent-status-toggle';
import { UnSaveChangeModal } from '../un-save-changes-modal';

export const AgentSettings = () => {
  const [pristineSettings, setPristineSettings] = useState(true);
  const [nextLocation, setNextLocation] = useState('');
  const { id = '' } = useParams<{ id: string; }>();
  const agent = useAgent(id) || {};
  const SystemSettings = agent.agentType === 'Node.js' ? JsSystemSettingsForm : SystemSettingsForm;

  return (
    <div tw="flex flex-col w-full">
      <PageHeader
        title={(
          <div tw="flex gap-x-4 items-center pt-5 pb-7">
            <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
            {agent.agentType} Agent Settings
            <AgentStatusToggle tw="mt-2 leading-20" agent={agent} />
          </div>
        )}
      />
      <div tw="px-6">
        <TabsPanel>
          <Tab name="general" to={`/agents/agent/${id}/settings/general`}>General</Tab>
          <Tab name="system" to={`/agents/agent/${id}/settings/system`}>System</Tab>
          <Tab name="plugins" to={`/agents/agent/${id}/settings/plugins`}>Plugins</Tab>
        </TabsPanel>
      </div>
      <Switch>
        <Route
          path="/agents/agent/:id/settings/general"
          render={() => <GeneralSettingsForm agent={agent} setPristineSettings={setPristineSettings} />}
        />
        <Route
          path="/agents/agent/:id/settings/system"
          render={() => <SystemSettings agent={agent} setPristineSettings={setPristineSettings} />}
        />
        <Route
          path="/agents/agent/:id/settings/plugins"
          render={() => <PluginsSettingsTab agent={agent} />}
        />
      </Switch>
      <UnSaveChangeModal path={nextLocation} setNextLocation={setNextLocation} />
      <Prompt
        when
        message={({ pathname, state }) => {
          const { pristine } = state as { pristine: boolean } || {};

          if (pristineSettings || pristine) {
            return true;
          }
          setNextLocation(pathname);
          return false;
        }}
      />
    </div>
  );
};
