import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { TabsPanel, Tab, Icons, Menu } from '../../../../../components';
import { useBuildVersion } from '../../use-build-version';
import { RenameScopeModal } from '../rename-scope-modal';
import { FinishScopeModal } from '../finish-scope-modal';
import { DeleteScopeModal } from '../delete-scope-modal';
import { CodeCoverageCard } from '../../code-coverage-card';
import { ProjectMethodsCard } from '../../project-methods-card';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { toggleScope } from '../../api';
import { ScopeSummary } from '../../../../../types/scope-summary';
import { Coverage } from '../../../../../types/coverage';
import { Methods } from '../../../../../types/methods';
import { ClassCoverage } from '../../../../../types/class-coverage';
import { AssociatedTests } from '../../../../../types/associated-tests';

import styles from './scope-info.module.scss';

interface Props extends RouteComponentProps<{ scopeId: string; pluginId: string }> {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = withRouter(
  scopeInfo(
    ({
      className,
      agentId,
      buildVersion,
      match: {
        params: { scopeId },
      },
      history: { push },
    }: Props) => {
      const coverage =
        useBuildVersion<Coverage>(`/scope/${scopeId}/coverage`, agentId, buildVersion) || {};
      const scopeMethods =
        useBuildVersion<Methods>(`/scope/${scopeId}/methods`, agentId, buildVersion) || {};
      const coverageByPackages =
        useBuildVersion<ClassCoverage[]>(
          `/scope/${scopeId}/coverage-by-packages`,
          agentId,
          buildVersion,
        ) || [];

      const testsUsages =
        useBuildVersion<AssociatedTests[]>(
          `/scope/${scopeId}/tests-usages`,
          agentId,
          buildVersion,
        ) || [];

      const scope = useBuildVersion<ScopeSummary>(`/scope/${scopeId}`, agentId, buildVersion);
      const { name = '', active = false, enabled = false } = scope || {};
      const [isFinishModalOpen, setIsFinishModalOpen] = React.useState(false);
      const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
      const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
      const [selectedTab, setSelectedTab] = React.useState('coverage');
      const menuActions = [
        !active && {
          label: `${enabled ? 'Ignore in build stats' : 'Show in build stats'}`,
          icon: enabled ? 'EyeCrossed' : 'Eye',
          onClick: () => toggleScope(agentId)(scopeId),
        },
        { label: 'Rename', icon: 'Edit', onClick: () => setIsRenameModalOpen(true) },
        active
          ? { label: 'Cancel', icon: 'Delete', onClick: () => setIsCancelModalOpen(true) }
          : { label: 'Delete', icon: 'Delete', onClick: () => setIsCancelModalOpen(true) },
      ].filter(Boolean);

      return (
        <div className={className}>
          <BackToScopesList onClick={() => push(`/full-page/${agentId}/coverage/scopes`)}>
            &lt; Scopes list
          </BackToScopesList>
          <Header>
            <Panel align="space-between">
              <Panel>
                {name}
                {active && <ActiveBadge>Active</ActiveBadge>}
              </Panel>
              <Panel align="end">
                <FinishScopeButton
                  type="secondary"
                  onClick={() => setIsFinishModalOpen(true)}
                  disabled={!active}
                >
                  <Icons.Check height={12} width={16} />
                  {` Finish scope`}
                </FinishScopeButton>
                <Menu items={menuActions as any} />
              </Panel>
            </Panel>
          </Header>
          <SummaryPanel align="space-between">
            <CodeCoverageCard header="Scope Code Coverage" coverage={coverage} />
            <ProjectMethodsCard header="Project Methods" methods={scopeMethods} />
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
                  <Icons.Test />
                </TabIconWrapper>
                Tests
              </Tab>
            </TabsPanel>
          </RoutingTabsPanel>
          {selectedTab === 'coverage' ? (
            <CoverageDetails
              agentId={agentId}
              buildVersion={buildVersion}
              coverageByPackages={coverageByPackages}
              associatedTestsTopic={`/scope/${scopeId}/associated-tests`}
            />
          ) : (
            <TestDetails testsUsages={testsUsages} />
          )}
          {isFinishModalOpen && (
            <FinishScopeModal
              agentId={agentId}
              buildVersion={buildVersion}
              scope={scope}
              isOpen={isFinishModalOpen}
              onToggle={setIsFinishModalOpen}
              withRedirect
            />
          )}
          {isRenameModalOpen && (
            <RenameScopeModal
              isOpen={isRenameModalOpen}
              onToggle={setIsRenameModalOpen}
              agentId={agentId}
              scope={scope}
            />
          )}
          {isCancelModalOpen && (
            <DeleteScopeModal
              isOpen={isCancelModalOpen}
              onToggle={setIsCancelModalOpen}
              agentId={agentId}
              buildVersion={buildVersion}
              scope={scope as ScopeSummary}
              withRedirect
            />
          )}
        </div>
      );
    },
  ),
);

const BackToScopesList = scopeInfo.backToScopesList('span');
const Header = scopeInfo.header('div');
const ActiveBadge = scopeInfo.activeBadge('span');
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const SummaryPanel = scopeInfo.summaryPanel(Panel);
const RoutingTabsPanel = scopeInfo.routingTabsPanel(Panel);
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
