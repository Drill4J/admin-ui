import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../layouts';
import { Icons, TabsPanel, Tab } from '../../../../components';
import { useBuildVersion } from '../use-build-version';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard } from '../code-coverage-card';
import { ProjectMethodsCard } from '../project-methods-card';
import { ScopeTimer } from '../scope';
import { usePluginState } from '../../store';
import { Tests } from '../tests';
import { ActiveScopeActions } from './active-scope-actions';
import { Coverage } from '../../../../types/coverage';
import { ClassCoverage } from '../../../../types/class-coverage';
import { ScopeSummary } from '../../../../types/scope-summary';
import { Methods } from '../../../../types/methods';

import styles from './overview.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

const overview = BEM(styles);

export const Overview = overview(({ className }: Props) => {
  const { agentId, pluginId } = usePluginState();
  const buildCoverage = useBuildVersion<Coverage>('/build/coverage') || {};
  const { started = 0, finished = 0, active = false, coverage = 0, coveragesByType = {} } =
    useBuildVersion<ScopeSummary>('/active-scope') || {};
  const coverageByPackages = useBuildVersion<ClassCoverage[]>('/build/coverage-by-packages') || [];
  const [selectedTab, setSelectedTab] = React.useState('methods');
  const buildMethods = useBuildVersion<Methods>('/build/methods') || {};

  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard
          header={
            <Panel align="space-between">
              Build Coverage
              <ScopesListLink to={`/full-page/${agentId}/${pluginId}/scopes`}>
                All Scopes >
              </ScopesListLink>
            </Panel>
          }
          coverage={buildCoverage}
        />
        <CodeCoverageCard
          header={
            <Panel align="space-between">
              Active Scope Coverage
              <ActiveScopeActions />
            </Panel>
          }
          coverage={{ coverage, coverageByType: coveragesByType }}
          additionalInfo={
            <Panel>
              <ScopeDurationIcon />
              <ScopeTimer started={started} finised={finished} active={active} />
            </Panel>
          }
        />
      </SummaryPanel>
      <RoutingTabsPanel>
        <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="methods">
            <TabIconWrapper>
              <Icons.Function height={20} width={20} />
            </TabIconWrapper>
            Build methods
          </Tab>
          <Tab name="tests">
            <TabIconWrapper>
              <Icons.Test height={20} width={20} />
            </TabIconWrapper>
            Build Tests
          </Tab>
        </TabsPanel>
      </RoutingTabsPanel>
      <TabContent>
        {selectedTab === 'methods' ? (
          <>
            <ProjectMethodsCard methods={buildMethods} />
            <CoverageDetails
              coverageByPackages={coverageByPackages}
              associatedTestsTopic="/build/associated-tests"
            />
          </>
        ) : (
          <Tests />
        )}
      </TabContent>
    </div>
  );
});

const SummaryPanel = overview.summaryPanel(Panel);
const ScopesListLink = overview.scopesListLink(Link);
const RoutingTabsPanel = overview.routingTabsPanel('div');
const TabContent = overview.tabContent('div');
const TabIconWrapper = overview.tabIconWrapper('div');
const ScopeDurationIcon = overview.scopeDurationIcon(Icons.Clock);
