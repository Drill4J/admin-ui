import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { TabsPanel, Tab } from 'components';
import { Agent } from 'types/agent';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { GeneralSettingsForm } from './general-settings-form';

import styles from './agent-settings.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

interface TabsComponent {
  name: string;
  component: React.ReactNode;
}

const agentSettings = BEM(styles);

export const AgentSettings = agentSettings(({ className, agent }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState('general');
  const tabsComponents: TabsComponent[] = [
    {
      name: 'general',
      component: <GeneralSettingsForm agent={agent} />,
    },
    {
      name: 'system',
      component: <SystemSettingsForm agent={agent} />,
    },
    {
      name: 'plugins',
      component: <PluginsSettingsTab agent={agent} />,
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
});

const Tabs = agentSettings.tabsPanel(TabsPanel);
