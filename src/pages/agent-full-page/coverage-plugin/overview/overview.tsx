import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link, useParams } from 'react-router-dom';
import { Panel, Icons } from '@drill4j/ui-kit';

import { TabsPanel, Tab } from 'components';
import { percentFormatter } from 'utils';
import { BuildCoverage } from 'types/build-coverage';
import { ClassCoverage } from 'types/class-coverage';
import { ActiveScope } from 'types/active-scope';
import { Methods } from 'types/methods';
import { useAgent } from 'hooks';
import { CoveragePluginHeader } from '../coverage-plugin-header';
import { useBuildVersion } from '../use-build-version';
import { CoverageDetails } from '../coverage-details';
import { DetailedCodeCoverageCard } from '../code-coverage-card';
import { ProjectMethodsCards } from '../project-methods-cards';
import { usePluginState } from '../../store';
import { Tests } from '../tests';
import { BuildCoverageInfo } from './build-coverage-info';
import { ActiveScopeInfo } from './active-scope-info';

import styles from './overview.module.scss';

interface Props {
  className?: string;
}

const overview = BEM(styles);

export const Overview = overview(({ className }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState('methods');
  const { agentId, buildVersion, loading } = usePluginState();
  const { status } = useAgent(agentId) || {};
  const buildCoverage = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const {
    prevBuildVersion = '',
    diff = 0,
    finishedScopesCount = 0,
  } = buildCoverage;
  const scope = useBuildVersion<ActiveScope>('/active-scope');
  const buildMethods = useBuildVersion<Methods>('/build/methods') || {};
  const coverageByPackages = useBuildVersion<ClassCoverage[]>('/build/coverage/packages') || [];
  const { pluginId } = useParams();

  return (
    <div className={className}>
      <CoveragePluginHeader />
      <SummaryPanel align="space-between">
        {scope?.active ? (
          <BuildCoverageInfo buildCoverage={buildCoverage} scope={scope} status={status} loading={loading} />
        )
          : (
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
        {scope?.active && (
          <ActiveScopeInfo scope={scope} />
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
            <ProjectMethodsCards methods={buildMethods} />
            <CoverageDetails
              coverageByPackages={coverageByPackages}
              associatedTestsTopic="/build/associated-tests"
              classesTopicPrefix="build"
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
