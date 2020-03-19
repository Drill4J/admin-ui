import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';

import { Panel } from 'layouts';
import { Table, Column, Menu } from 'components';
import { MenuItemType } from 'components/menu/menu-item-type';
import { percentFormatter } from 'utils';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { CoveragePluginHeader } from '../../coverage-plugin-header';
import { useBuildVersion } from '../../use-build-version';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, useCoveragePluginState, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';

import styles from './scopes-list.module.scss';

interface Props {
  className?: string;
}

const scopesList = BEM(styles);

export const ScopesList = scopesList(({ className }: Props) => {
  const { showMessage } = React.useContext(NotificationManagerContext);
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();
  const { agentId, buildVersion } = usePluginState();
  const { pluginId = '' } = useParams();
  const { push } = useHistory();
  const dispatch = useCoveragePluginDispatch();
  const activeScope = useBuildVersion<ScopeSummary>('/active-scope');
  const scopes = useBuildVersion<ScopeSummary[]>('/scopes') || [];
  scopes.sort(
    ({ started: firstStartedDate }, { started: secondStartedDate }) => secondStartedDate - firstStartedDate,
  );

  const scopesData = activeScope && activeScope.name ? [activeScope, ...scopes] : scopes;
  return (
    <div className={className}>
      <CoveragePluginHeader />
      <Content>
        <Title>
          <span>All scopes</span>
          <ScopesCount>{scopesData.length}</ScopesCount>
        </Title>
        <Table data={scopesData} idKey="name" columnsSize="wide">
          <Column
            name="name"
            HeaderCell={() => <HeaderCell>Name</HeaderCell>}
            Cell={({
              value, item: {
                id, started, active, enabled, finished,
              },
            }) => (
              <NameCell
                onClick={() => push(`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${id}`)}
                data-test="scopes-list:scope-name"
              >
                {value}
                {active && <ActiveBadge>Active</ActiveBadge>}
                {!enabled && <IgnoreBadge>Ignored</IgnoreBadge>}
                <StartDate>
                  {new Date(started).toDateString()}
                  <ScopeTimer started={started} finised={finished} active={active} />
                </StartDate>
              </NameCell>
            )}
          />
          <Column
            name="coverage"
            HeaderCell={() => <HeaderCell>Coverage</HeaderCell>}
            Cell={({ value: { coverage } }) => (
              <Coverage data-test="scopes-list:coverage">
                {`${percentFormatter(coverage)}%`}
              </Coverage>
            )}
          />
          <Column
            name="autoTests"
            HeaderCell={() => (
              <HeaderCell>
                <div>Distribution</div>
                <TestTypeLabel>Auto Tests</TestTypeLabel>
              </HeaderCell>
            )}
            Cell={({ item: { coverage: { coverageByType }, active } }) => (
              <TestTypeCoverage>
                {coverageByType.AUTO && (
                  <span>{`${percentFormatter(coverageByType.AUTO.coverage)}%`}</span>
                )}
                {active && testTypes.includes('AUTO') && (
                  <>
                    <RecordingIcon />
                    <RecordingText>Rec</RecordingText>
                  </>
                )}
                <TestTypeTestCount>
                  {coverageByType.AUTO
                      && coverageByType.AUTO.testCount
                      && `${coverageByType.AUTO.testCount} tests`}
                </TestTypeTestCount>
              </TestTypeCoverage>
            )}
          />
          <Column
            name="manualTests"
            HeaderCell={() => (
              <HeaderCell>
                <TestTypeLabel>Manual</TestTypeLabel>
              </HeaderCell>
            )}
            Cell={({ item: { coverage: { coverageByType }, active } }) => (
              <TestTypeCoverage>
                {coverageByType.MANUAL && (
                  <span>{`${percentFormatter(coverageByType.MANUAL.coverage)}%`}</span>
                )}
                {active && testTypes.includes('MANUAL') && (
                  <>
                    <RecordingIcon />
                    <RecordingText>Rec</RecordingText>
                  </>
                )}
                <TestTypeTestCount>
                  {coverageByType.MANUAL
                      && coverageByType.MANUAL.testCount
                      && `${coverageByType.MANUAL.testCount} tests`}
                </TestTypeTestCount>
              </TestTypeCoverage>
            )}
          />
          <Column
            name="actions"
            HeaderCell={() => null}
            Cell={({ item }) => {
              const menuActions = [
                item.active && {
                  label: 'Finish Scope',
                  icon: 'Check',
                  onClick: () => dispatch(openModal('FinishScopeModal', item)),
                },
                item.active && {
                  label: 'Manage sessions',
                  icon: 'ManageSessions',
                  onClick: () => dispatch(openModal('ManageSessionsModal', null)),
                },
                !item.active && {
                  label: `${item.enabled ? 'Ignore in build stats' : 'Show in build stats'}`,
                  icon: item.enabled ? 'EyeCrossed' : 'Eye',
                  onClick: () => toggleScope(agentId, pluginId, {
                    onSuccess: () => {
                      showMessage({
                        type: 'SUCCESS',
                        text: `${item.name} has been ${
                          item.enabled ? 'excluded from' : 'included in'
                        } the build stats.`,
                      });
                    },
                  })(item.id),
                },
                {
                  label: 'Rename',
                  icon: 'Edit',
                  onClick: () => dispatch(openModal('RenameScopeModal', item)),
                },
                {
                  label: `${item.active ? 'Cancel' : 'Delete'}`,
                  icon: 'Delete',
                  onClick: () => dispatch(openModal('DeleteScopeModal', item)),
                },
              ].filter(Boolean);
              return (
                <ActionCell>
                  <Menu items={menuActions as MenuItemType[]} />
                </ActionCell>
              );
            }}
          />
        </Table>
      </Content>
    </div>
  );
});

const Content = scopesList.content('div');
const Title = scopesList.title(Panel);
const ScopesCount = scopesList.scopesCount('span');
const HeaderCell = scopesList.headerCell('div');
const TestTypeLabel = scopesList.testTypeLabel('div');
const TestTypeCoverage = scopesList.testTypeCoverage('div');
const TestTypeTestCount = scopesList.testTypeTestCount('div');
const RecordingIcon = scopesList.recordingIcon('span');
const RecordingText = scopesList.recordingText('span');
const NameCell = scopesList.nameCell('span');
const StartDate = scopesList.startDate('div');
const ActiveBadge = scopesList.activeBadge('span');
const IgnoreBadge = scopesList.ignoreBadge('span');
const Coverage = scopesList.coverage('div');
const ActionCell = scopesList.actionCell('div');
