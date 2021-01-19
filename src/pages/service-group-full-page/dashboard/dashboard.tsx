import { BEM } from '@redneckz/react-bem-helper';

import { NoPluginsStub } from 'modules';
import { Plugin } from 'types/plugin';
import { ServiceGroupSummary } from 'types/service-group-summary';
import { usePluginData } from '../use-plugin-data';
import { PluginCard } from './plugin-card';
import {
  CoverageSection, RisksSection, TestsToRunSection, TestsSection,
} from './sections';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  serviceGroupId: string;
  plugins: Plugin[];
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({
  className, serviceGroupId, plugins,
}: Props) => (
  <div className={className}>
    <Header>Dashboard</Header>
    <Content>
      {plugins.length > 0 ? plugins.map(({ id: pluginId = '', name }) => {
        const {
          aggregated: {
            scopeCount = 0,
            coverage = 0,
            methodCount = {},
            tests = [],
            testsToRun = {},
            riskCounts = {},
          } = {},
        } = usePluginData<ServiceGroupSummary>('/service-group/summary', serviceGroupId, pluginId) || {};

        return (
          <PluginCard
            label={name}
            pluginLink={`/service-group-full-page/${serviceGroupId}/${pluginId}`}
            key={pluginId}
          >
            <CoverageSection totalCoverage={coverage} methodCount={methodCount} />
            <TestsSection testsType={tests} scopeCount={scopeCount} />
            <RisksSection risks={riskCounts} />
            <TestsToRunSection testsToRun={testsToRun} />
          </PluginCard>
        );
      }) : <NoPluginsStub agentId={serviceGroupId} agentType="ServiceGroup" />}
    </Content>
  </div>
));

const Header = dashboard.header('div');
const Content = dashboard.content('div');
