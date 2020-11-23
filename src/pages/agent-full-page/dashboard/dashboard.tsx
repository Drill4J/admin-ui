import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { NoPluginsStub } from 'modules';
import { Agent } from 'types/agent';
import { usePluginState } from '../store';
import { PluginCard } from './plugin-card';
import {
  CoverageSection, TestsSection, RisksSection, TestsToRunSection,
} from './sections';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className, agent }: Props) => {
  const { id: agentId, plugins = [] } = agent;
  const { buildVersion } = usePluginState();
  const installedPlugins = plugins.filter(plugin => !plugin.available);

  return (
    <div className={className}>
      <Header>Dashboard</Header>
      <Content>
        {installedPlugins.length > 0 ? (
          <>
            {installedPlugins.map(({ id, name }) => (
              <PluginCard
                key={id}
                label={name}
                pluginLink={`/full-page/${agentId}/${buildVersion}/${id}/dashboard`}
              >
                <CoverageSection />
                <TestsSection />
                <RisksSection />
                <TestsToRunSection />
              </PluginCard>
            ))}
          </>
        ) : <NoPluginsStub agentId={agent.id} agentType="Agent" />}
      </Content>
    </div>
  );
});

const Header = dashboard.header('div');
const Content = dashboard.content('div');
