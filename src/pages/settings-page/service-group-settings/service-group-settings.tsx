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
import { BEM } from '@redneckz/react-bem-helper';

import { TabsPanel, Tab } from 'components';
import { CommonEntity } from 'types/common-entity';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { GeneralSettingsForm } from './general-settings-form';

import styles from './service-group-settings.module.scss';

interface Props {
  className?: string;
  serviceGroup: CommonEntity;
  type?: string;
}

interface TabsComponent {
  name: string;
  component: React.ReactNode;
}

const agentSettings = BEM(styles);

export const ServiceGroupSettings = agentSettings(
  ({ className, serviceGroup }: Props) => {
    const [selectedTab, setSelectedTab] = useState('general');
    const tabsComponents: TabsComponent[] = [
      {
        name: 'general',
        component: <GeneralSettingsForm serviceGroup={serviceGroup} />,
      },
      {
        name: 'system',
        component: <SystemSettingsForm agent={serviceGroup} />,
      },
      {
        name: 'plugins',
        component: <PluginsSettingsTab agent={serviceGroup} />,
      },
    ];

    return (
      <div className={className}>
        <Tabs activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="general">General</Tab>
          <Tab name="system">System</Tab>
          <Tab name="plugins">Plugins</Tab>
        </Tabs>
        {tabsComponents.find(({ name }) => name === selectedTab)?.component}
      </div>
    );
  },
);

const Tabs = agentSettings.tabsPanel(TabsPanel);
