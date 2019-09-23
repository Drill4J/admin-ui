import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { TabsPanel, Tab, Icons, Menu } from '../../../../../components';
import { useBuildVersion } from '../../use-build-version';
import { CodeCoverageCard } from '../../code-coverage-card';
import { ProjectMethodsCard } from '../../project-methods-card';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { toggleScope } from '../../api';
import { usePluginState, usePluginDispatch, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';
import { ScopeSummary } from '../../../../../types/scope-summary';
import { Coverage } from '../../../../../types/coverage';
import { Methods } from '../../../../../types/methods';
import { ClassCoverage } from '../../../../../types/class-coverage';
import { AssociatedTests } from '../../../../../types/associated-tests';

import styles from './scope-info.module.scss';

interface Props extends RouteComponentProps<{ scopeId: string; pluginId: string }> {
  className?: string;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = withRouter(
  scopeInfo(({ className, match: { params: { scopeId } }, history: { push } }: Props) => {
    const { agentId } = usePluginState();
    const dispatch = usePluginDispatch();
    const coverage = useBuildVersion<Coverage>(`/scope/${scopeId}/coverage`) || {};
    const scopeMethods = useBuildVersion<Methods>(`/scope/${scopeId}/methods`) || {};
    const coverageByPackages =
      useBuildVersion<ClassCoverage[]>(`/scope/${scopeId}/coverage-by-packages`) || [];

    const testsUsages = useBuildVersion<AssociatedTests[]>(`/scope/${scopeId}/tests-usages`) || [];

    const scope = useBuildVersion<ScopeSummary>(`/scope/${scopeId}`);
    const { name = '', active = false, enabled = false, started = 0, finished = 0 } = scope || {};
    const [selectedTab, setSelectedTab] = React.useState('coverage');
    const menuActions = [
      !active && {
        label: `${enabled ? 'Ignore in build stats' : 'Show in build stats'}`,
        icon: enabled ? 'EyeCrossed' : 'Eye',
        onClick: () => toggleScope(agentId)(scopeId),
      },
      {
        label: 'Rename',
        icon: 'Edit',
        onClick: () => dispatch(openModal('RenameScopeModal', scope)),
      },
      active
        ? {
            label: 'Cancel',
            icon: 'Delete',
            onClick: () => dispatch(openModal('DeleteScopeModal', scope)),
          }
        : {
            label: 'Delete',
            icon: 'Delete',
            onClick: () => dispatch(openModal('DeleteScopeModal', scope)),
          },
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
              {active ? <ActiveBadge>Active</ActiveBadge> : <FinisedBadge>Finished</FinisedBadge>}
              {Boolean(started) && (
                <ScopeDuration>
                  <ScopeTimer started={started} finised={finished} active={active} />
                </ScopeDuration>
              )}
            </Panel>
            <Panel align="end">
              <FinishScopeButton
                type="secondary"
                onClick={() => dispatch(openModal('FinishScopeModal', scope))}
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
            coverageByPackages={coverageByPackages}
            associatedTestsTopic={`/scope/${scopeId}/associated-tests`}
          />
        ) : (
          <TestDetails testsUsages={testsUsages} />
        )}
      </div>
    );
  }),
);

const BackToScopesList = scopeInfo.backToScopesList('span');
const Header = scopeInfo.header('div');
const ActiveBadge = scopeInfo.activeBadge('span');
const FinisedBadge = scopeInfo.finishedBadge('span');
const ScopeDuration = scopeInfo.scopeDuration('span');
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const SummaryPanel = scopeInfo.summaryPanel(Panel);
const RoutingTabsPanel = scopeInfo.routingTabsPanel(Panel);
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
