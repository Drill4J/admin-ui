import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link, useParams } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, TabsPanel, Tab } from 'components';
import { percentFormatter } from 'utils';
import { Coverage } from 'types/coverage';
import { ClassCoverage } from 'types/class-coverage';
import { ScopeSummary } from 'types/scope-summary';
import { Methods } from 'types/methods';
import { useAgent } from 'hooks';
import { isActiveBuild } from 'pages/agent-full-page/is-active-build';
import { CoveragePluginHeader } from '../coverage-plugin-header';
import { useBuildVersion } from '../use-build-version';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard, DetailedCodeCoverageCard } from '../code-coverage-card';
import { ProjectMethodsCard } from '../project-methods-card';
import { ScopeTimer } from '../scope';
import { usePluginState } from '../../store';
import { Tests } from '../tests';
import { ActiveScopeActions } from './active-scope-actions';

import styles from './overview.module.scss';

interface Props {
  className?: string;
}

const overview = BEM(styles);

export const Overview = overview(({ className }: Props) => {
  const { agentId, buildVersion } = usePluginState();
  const { buildVersion: activeBuildVersion } = useAgent(agentId) || {};
  const buildCoverage = useBuildVersion<Coverage>('/build/coverage') || {};
  const {
    prevBuildVersion = '',
    diff = 0,
    coverage: buildCodeCoverage = 0,
    finishedScopesCount = 0,
  } = buildCoverage;
  const {
    started = 0, finished = 0, active = false, coverage = 0, coveragesByType = {},
  } = useBuildVersion<ScopeSummary>('/active-scope') || {};
  const coverageByPackages = useBuildVersion<ClassCoverage[]>('/build/coverage-by-packages') || [];
  const [selectedTab, setSelectedTab] = React.useState('methods');
  const buildMethods = useBuildVersion<Methods>('/build/methods') || {};
  const { pluginId } = useParams();
  return (
    <div className={className}>
      <CoveragePluginHeader />
      <SummaryPanel align="space-between">
        {active ? (
          <CodeCoverageCard
            header={(
              <Panel align="space-between">
                Build Coverage
                <ScopesListLink to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes`}>
                  {`All Scopes (${finishedScopesCount + 1}) >`}
                </ScopesListLink>
              </Panel>
            )}
            coverage={buildCoverage}
            additionalInfo={(
              <Panel>
                {prevBuildVersion
                  && `${diff >= 0 ? '+ ' : '- '} ${percentFormatter(
                    Math.abs(diff),
                  )}% comparing to Build: ${prevBuildVersion}`}
                {!buildCodeCoverage
                  && !prevBuildVersion && isActiveBuild(activeBuildVersion, buildVersion)
                  && 'Will change when at least 1 scope is done.'}
              </Panel>
            )}
            testContext="build-coverage"
          />
        ) : (
          <DetailedCodeCoverageCard
            header={(
              <Panel align="space-between">
                Build Coverage
                <ScopesListLink to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes`}>
                  {`All Scopes (${finishedScopesCount}) >`}
                </ScopesListLink>
              </Panel>
            )}
            coverage={buildCoverage}
            additionalInfo={(
              <Panel>
                {prevBuildVersion
                  && `${diff >= 0 ? '+ ' : '- '} ${percentFormatter(
                    Math.abs(diff),
                  )}% comparing to Build: ${prevBuildVersion}`}
              </Panel>
            )}
          />
        )}
        {active && (
          <CodeCoverageCard
            header={(
              <Panel align="space-between">
                Active Scope Coverage
                <ActiveScopeActions />
              </Panel>
            )}
            coverage={{ coverage, coverageByType: coveragesByType }}
            additionalInfo={(
              <Panel>
                <ScopeDurationIcon />
                <ScopeTimer started={started} finised={finished} active={active} />
              </Panel>
            )}
            testContext="active-scope-coverage"
            showRecording
          />
        )}
      </SummaryPanel>
      <RoutingTabsPanel>
        <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="methods">
            <TabIconWrapper>
              <Icons.Function />
            </TabIconWrapper>
            Build methods
          </Tab>
          <Tab name="tests">
            <TabIconWrapper>
              <Icons.Test width={16} />
            </TabIconWrapper>
            Build tests
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
