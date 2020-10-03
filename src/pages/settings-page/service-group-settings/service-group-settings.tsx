import * as React from 'react';
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
    const [selectedTab, setSelectedTab] = React.useState('general');
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
