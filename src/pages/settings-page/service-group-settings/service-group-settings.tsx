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
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { useServiceGroup } from 'hooks';
import { TabsPanel, Tab, PageHeader } from 'components';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { ServiceGroupGeneralSettingsForm } from './service-group-general-settings-form';
import { UnSaveChangeModal } from '../un-save-changes-modal';

interface TabsComponent {
  name: string;
  component: React.ReactNode;
}

export const ServiceGroupSettings = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [pristineSettings, setPristineSettings] = useState(false);
  const [nextSelectTab, setNextSelectTab] = useState('');
  const { id = '' } = useParams<{ id: string }>();
  const serviceGroup = useServiceGroup(id) || {};

  const tabsComponents: TabsComponent[] = [
    {
      name: 'general',
      component: <ServiceGroupGeneralSettingsForm
        serviceGroup={serviceGroup}
        setPristineSettings={setPristineSettings}
      />,
    },
    {
      name: 'system',
      component: <SystemSettingsForm
        setPristineSettings={setPristineSettings}
        agent={serviceGroup}
        isServiceGroup
      />,
    },
    {
      name: 'plugins',
      component: <PluginsSettingsTab agent={serviceGroup} />,
    },
  ];

  return (
    <div tw="flex flex-col w-full">
      <PageHeader
        title={(
          <div tw="flex items-center gap-x-4 w-full ">
            <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
            Service Group Settings
          </div>
        )}
      />
      <TabsPanel
        tw="mx-6"
        activeTab={selectedTab}
        onSelect={(tab) => {
          if (!pristineSettings) {
            setNextSelectTab(tab);
          } else {
            setSelectedTab(tab);
          }
        }}
      >
        <Tab name="general">General</Tab>
        <Tab name="system">System</Tab>
        <Tab name="plugins">Plugins</Tab>
      </TabsPanel>
      {tabsComponents.find(({ name }) => name === selectedTab)?.component}
      <UnSaveChangeModal
        isOpen={Boolean(nextSelectTab)}
        onToggle={() => setNextSelectTab('')}
        selectTab={() => {
          setSelectedTab(nextSelectTab);
          setNextSelectTab('');
        }}
      />
    </div>
  );
};
