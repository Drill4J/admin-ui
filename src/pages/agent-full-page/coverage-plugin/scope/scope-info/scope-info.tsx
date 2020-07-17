import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import {
  Panel, Icons, Menu, Button,
} from '@drill4j/ui-kit';

import {
  TabsPanel, Tab,
} from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { BuildCoverage } from 'types/build-coverage';
import { ActiveScope } from 'types/active-scope';
import { Methods } from 'types/methods';
import { ClassCoverage } from 'types/class-coverage';
import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { useBuildVersion } from '../../use-build-version';
import { DetailedCodeCoverageCard } from '../../code-coverage-card';
import { ProjectMethodsCard } from '../../project-methods-card';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
}

interface MenuItemType {
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(
  ({
    className,
  }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const { agentId } = usePluginState();
    const { pluginId = '', scopeId = '' } = useParams();
    const dispatch = useCoveragePluginDispatch();
    const scope = useBuildVersion<ActiveScope>(`/scope/${scopeId}`);
    const coverage = useBuildVersion<BuildCoverage>(`/scope/${scopeId}/coverage`) || {};
    const scopeMethods = useBuildVersion<Methods>(`/scope/${scopeId}/methods`) || {};
    const coverageByPackages = useBuildVersion<ClassCoverage[]>(`/scope/${scopeId}/coverage/packages`) || [];

    const testsUsages = useBuildVersion<AssociatedTests[]>(`/scope/${scopeId}/tests-usages`) || [];

    const coveredMethodsByTest = useBuildVersion<MethodCoveredByTest[]>(`/scope/${scopeId}/tests/covered-methods`) || [];

    const coveredMethodsByTestType = useBuildVersion<MethodCoveredByTest[]>(`/scope/${scopeId}/test-types/covered-methods`)
        || [];

    const {
      name = '', active = false, enabled = false, started = 0, finished = 0,
    } = scope || {};

    const [selectedTab, setSelectedTab] = React.useState('coverage');
    const menuActions = [
      !active && {
        label: `${enabled ? 'Ignore in build stats' : 'Show in build stats'}`,
        icon: enabled ? 'EyeCrossed' : 'Eye',
        onClick: () => toggleScope(agentId, pluginId, {
          onSuccess: () => {
            showMessage({
              type: 'SUCCESS',
              text: `${name} has been ${
                enabled ? 'excluded from' : 'included in'
              } the build stats.`,
            });
          },
        })(scopeId),
      },
      active && {
        label: 'Manage sessions',
        icon: 'ManageSessions',
        onClick: () => dispatch(openModal('ManageSessionsModal', null)),
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
        <Header align="space-between">
          <Panel verticalAlign="center">
            <ScopeName>{name}</ScopeName>
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
              size="large"
              onClick={() => dispatch(openModal('FinishScopeModal', scope))}
              disabled={!active}
            >
              <Icons.Check height={12} width={16} />
              &nbsp;Finish scope
            </FinishScopeButton>
            <Menu items={menuActions as MenuItemType[]} />
          </Panel>
        </Header>
        <DetailedCodeCoverageCard
          header="Scope Code Coverage"
          coverage={coverage}
          showRecording={active}
        />
        <RoutingTabsPanel>
          <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
            <Tab name="coverage">
              <TabIconWrapper>
                <Icons.Function />
              </TabIconWrapper>
              Scope methods
            </Tab>
            <Tab name="tests">
              <TabIconWrapper>
                <Icons.Test width={16} />
              </TabIconWrapper>
              Scope tests
            </Tab>
          </TabsPanel>
        </RoutingTabsPanel>
        {selectedTab === 'coverage' ? (
          <>
            <ProjectMethods methods={scopeMethods} />
            <CoverageDetails
              coverageByPackages={coverageByPackages}
              associatedTestsTopic={`/scope/${scopeId}/associated-tests`}
              classesTopicPrefix={`scope/${scopeId}`}
            />
          </>
        ) : (
          <TestDetails
            testsUsages={testsUsages}
            coveredMethodsByTest={coveredMethodsByTest}
            coveredMethodsByTestType={coveredMethodsByTestType}
          />
        )}
      </div>
    );
  },
);

const Header = scopeInfo.header(Panel);
const ScopeName = scopeInfo.scopeName('div');
const ActiveBadge = scopeInfo.activeBadge('span');
const FinisedBadge = scopeInfo.finishedBadge('span');
const ScopeDuration = scopeInfo.scopeDuration('span');
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const ProjectMethods = scopeInfo.projectMethods(ProjectMethodsCard);
const RoutingTabsPanel = scopeInfo.routingTabsPanel(Panel);
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
