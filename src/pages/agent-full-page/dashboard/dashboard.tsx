import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Agent } from 'types/agent';
import { usePluginState } from '../store';
import { PluginCard } from './plugin-card';
import { NoPluginsStub } from './no-plugins-stub';
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
  const {
    buildVersion: { id: buildVersion },
  } = usePluginState();

  return (
    <div className={className}>
      <Header>Dashboard</Header>
      <Content>
        {plugins.length > 0 ? (
          <>
            {plugins.map(({ id, name }) => (
              <PluginCard
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
        ) : (
          <NoPluginsStub agent={agent} />
        )}
      </Content>
    </div>
  );
});

const Header = dashboard.header('div');
const Content = dashboard.content('div');
