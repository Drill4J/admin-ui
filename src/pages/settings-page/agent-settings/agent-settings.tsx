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
import {
  ReactNode, useState,
} from 'react';
import { Icons } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { TabsPanel, Tab, PageHeader } from 'components';
import { useAgent } from 'hooks';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { GeneralSettingsForm } from './general-settings-form';
import { JsSystemSettingsForm } from './js-system-settings-form';
import { AgentStatusToggle } from '../../agents-page/agent-status-toggle';
import 'twin.macro';

interface TabsComponent {
  name: string;
  component: ReactNode;
}

export const AgentSettings = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const { id = '' } = useParams<{ id: string }>();
  const agent = useAgent(id) || {};

  const tabsComponents: TabsComponent[] = [
    {
      name: 'general',
      component: <GeneralSettingsForm agent={agent} />,
    },
    {
      name: 'system',
      component: agent.agentType === 'Node.js'
        ? <JsSystemSettingsForm agent={agent} />
        : <SystemSettingsForm agent={agent} />,
    },
    {
      name: 'plugins',
      component: <PluginsSettingsTab agent={agent} />,
    },
  ];

  return (
    <div tw="flex flex-col w-full">
      <PageHeader
        title={(
          <div tw="flex gap-x-4 items-center">
            <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
            {agent.agentType} Agent Settings
            <AgentStatusToggle tw="mt-2 leading-20" agent={agent} />
          </div>
        )}
      />
      <TabsPanel tw="mx-6" activeTab={selectedTab} onSelect={setSelectedTab}>
        <Tab name="general">General</Tab>
        <Tab name="system">System</Tab>
        <Tab name="plugins">Plugins</Tab>
      </TabsPanel>
      {tabsComponents.find(({ name }) => name === selectedTab)?.component}
    </div>
  );
};
