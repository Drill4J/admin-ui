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
        <Table
          data={scopesData}
          idKey="name"
          columnsSize="wide"
          defaultSortField="name"
          combinedColumn={
            {
              name: 'Distribution',
              columns: [
                <Column
                  name="autoTests"
                  label="Auto Tests"
                  Cell={({ item: { coveragesByType, active } }) => (
                    <TestTypeCoverage>
                      {coveragesByType.AUTO && (
                        <span>{`${percentFormatter(coveragesByType.AUTO.coverage)}%`}</span>
                      )}
                      {active && testTypes.includes('AUTO') && (
                        <>
                          <RecordingIcon />
                          <RecordingText>Rec</RecordingText>
                        </>
                      )}
                      <TestTypeTestCount>
                        {coveragesByType.AUTO
                          && coveragesByType.AUTO.testCount
                          && `${coveragesByType.AUTO.testCount} tests`}
                      </TestTypeTestCount>
                    </TestTypeCoverage>
                  )}
                />,
                <Column
                  name="manualTests"
                  label="Manual"
                  Cell={({ item: { coveragesByType, active } }) => (
                    <TestTypeCoverage>
                      {coveragesByType.MANUAL && (
                        <span>{`${percentFormatter(coveragesByType.MANUAL.coverage)}%`}</span>
                      )}
                      {active && testTypes.includes('MANUAL') && (
                        <>
                          <RecordingIcon />
                          <RecordingText>Rec</RecordingText>
                        </>
                      )}
                      <TestTypeTestCount>
                        {coveragesByType.MANUAL
                          && coveragesByType.MANUAL.testCount
                          && `${coveragesByType.MANUAL.testCount} tests`}
                      </TestTypeTestCount>
                    </TestTypeCoverage>
                  )}
                />,
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
                />,
              ],
            }
          }
        >
          <Column
            name="name"
            label="Name"
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
            label="Coverage"
            Cell={({ value }) => (
              <Coverage data-test="scopes-list:coverage">
                {`${percentFormatter(value)}%`}
              </Coverage>
            )}
          />
        </Table>
      </Content>
    </div>
  );
});

const Content = scopesList.content('div');
const Title = scopesList.title(Panel);
const ScopesCount = scopesList.scopesCount('span');
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
