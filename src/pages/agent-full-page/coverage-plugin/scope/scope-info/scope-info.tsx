import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { TabsPanel, Tab, Icons } from '../../../../../components';
import { useBuildVersion } from '../../use-build-version';
import { FinishScopeModal } from './finish-scope-modal';
import { CodeCoverageCard } from '../../code-coverage-card';
import { ProjectMethodsCard } from '../../project-methods-card';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { ScopeSummary } from '../../../../../types/scope-summary';
import { Coverage } from '../../../../../types/coverage';
import { NewMethodsCoverage } from '../../../../../types/new-methods-coverage';
import { ClassCoverage } from '../../../../../types/class-coverage';
import { CoverageByTypes } from '../../../../../types/coverage-by-types';
import { AssociatedTests } from '../../../../../types/associated-tests';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
  selectedScope: string;
  onScopeClick: (scopeId: string) => void;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(
  ({ className, agentId, buildVersion, selectedScope, onScopeClick }: Props) => {
    const coverage =
      useBuildVersion<Coverage>(`/scope/${selectedScope}/coverage`, agentId, buildVersion) || {};
    const newMethodsCoverage =
      useBuildVersion<NewMethodsCoverage>(
        `/scope/${selectedScope}/coverage-new`,
        agentId,
        buildVersion,
      ) || {};

    const coverageByTypes =
      useBuildVersion<CoverageByTypes>(
        `/scope/${selectedScope}/coverage-by-types`,
        agentId,
        buildVersion,
      ) || {};
    const coverageByPackages =
      useBuildVersion<ClassCoverage[]>(
        `/scope/${selectedScope}/coverage-by-packages`,
        agentId,
        buildVersion,
      ) || [];

    const testsUsages =
      useBuildVersion<AssociatedTests[]>(
        `/scope/${selectedScope}/tests-usages`,
        agentId,
        buildVersion,
      ) || [];

    const scope = useBuildVersion<ScopeSummary>(`/scope/${selectedScope}`, agentId, buildVersion);
    const { name = '', active = false } = scope || {};
    const [isFinishModalOpen, setIsFinishModalOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('coverage');

    return (
      <div className={className}>
        <BackToScopesList onClick={() => onScopeClick('')}>&lt; Scopes list</BackToScopesList>
        <Header>
          <Panel align="space-between">
            <Panel>
              {name}
              {active && <ActiveBadge>Active</ActiveBadge>}
            </Panel>
            <FinishScopeButton
              type="secondary"
              onClick={() => setIsFinishModalOpen(true)}
              disabled={!active}
            >
              Finish scope
            </FinishScopeButton>
          </Panel>
        </Header>
        <SummaryPanel align="space-between">
          <CodeCoverageCard
            header="Build Code Coverage"
            coverage={coverage}
            coverageByTypes={coverageByTypes}
          />
          <ProjectMethodsCard
            header="Project Methods"
            coverage={coverage}
            newMethodsCoverage={newMethodsCoverage}
          />
        </SummaryPanel>
        <RoutingTabsPanel>
          <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
            <Tab name="coverage">
              <TabIconWrapper>
                <Icons.Coverage height={20} width={20} />
              </TabIconWrapper>
              Code Coverage
            </Tab>
            <Tab name="tests">
              <TabIconWrapper>
                <Icons.Scope />
              </TabIconWrapper>
              Tests
            </Tab>
          </TabsPanel>
        </RoutingTabsPanel>
        {selectedTab === 'coverage' ? (
          <CoverageDetails buildVersion={buildVersion} coverageByPackages={coverageByPackages} />
        ) : (
          <TestDetails testsUsages={testsUsages} />
        )}

        {isFinishModalOpen && (
          <FinishScopeModal
            agentId={agentId}
            scope={scope}
            isOpen={isFinishModalOpen}
            onToggle={setIsFinishModalOpen}
          />
        )}
      </div>
    );
  },
);

const BackToScopesList = scopeInfo.backToScopesList('span');
const Header = scopeInfo.header('div');
const ActiveBadge = scopeInfo.activeBadge('span');
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const SummaryPanel = scopeInfo.summaryPanel(Panel);
const RoutingTabsPanel = scopeInfo.routingTabsPanel(Panel);
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
