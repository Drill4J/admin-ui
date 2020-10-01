import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Menu, Icons, Table, Column, Status,
} from '@drill4j/ui-kit';

import {
  percentFormatter, dateFormatter, timeFormatter, transformObjectsArrayToObject,
} from 'utils';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { TestTypeSummary } from 'types/test-type-summary';
import { useAgent } from 'hooks';
import { useBuildVersion } from '../../use-build-version';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, useCoveragePluginState, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';

import styles from './scopes-list.module.scss';

interface Props {
  className?: string;
}

interface MenuItemType {
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
}

const scopesList = BEM(styles);

export const ScopesList = scopesList(({ className }: Props) => {
  const { showMessage } = React.useContext(NotificationManagerContext);
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();
  const { agentId } = usePluginState();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
  const { pluginId = '', buildVersion = '' } = useParams<{ pluginId: string; buildVersion: string }>();
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
      <Content>
        <Title>
          All scopes
          <ScopesCount>{scopesData.length}</ScopesCount>
        </Title>
        <Table
          data={scopesData}
          idKey="name"
          columnsSize="wide"
        >
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
                <Panel>
                  <ScopeTimer started={started} finished={finished} active={active} size="small" />
                  {active && <ActiveBadge>Active</ActiveBadge>}
                  {!enabled && <IgnoreBadge>Ignored</IgnoreBadge>}
                </Panel>
              </NameCell>
            )}
          />
          <Column
            name="started"
            HeaderCell={() => <HeaderCell>Started</HeaderCell>}
            Cell={({ value }) => (
              <>
                <StartDate>
                  {dateFormatter(value)}
                </StartDate>
                <StartTime>
                  at {timeFormatter(value)}
                </StartTime>
              </>
            )}
          />
          <Column
            name="coverage"
            HeaderCell={() => <HeaderCell>Coverage</HeaderCell>}
            Cell={({ item: { coverage: { percentage } } }) => (
              <Coverage data-test="scopes-list:coverage">
                {`${percentFormatter(percentage)}%`}
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
            Cell={({
              item: { coverage: { byTestType }, active },
            }: { item: { coverage: { byTestType: TestTypeSummary[] }; active: boolean }}) => {
              const coverageByTestType = transformObjectsArrayToObject(byTestType, 'type');
              return (
                <TestTypeCoverage>
                  {coverageByTestType?.AUTO && (
                    <span>
                      {`${percentFormatter(coverageByTestType?.AUTO?.summary?.coverage?.percentage || 0)}%`}
                    </span>
                  )}
                  {active && testTypes.includes('AUTO') && (
                    <>
                      <RecordingIcon />
                      <RecordingText>Rec</RecordingText>
                    </>
                  )}
                  <TestTypeTestCount>
                    {coverageByTestType?.AUTO
                      && coverageByTestType?.AUTO?.summary?.testCount
                      && `${coverageByTestType?.AUTO?.summary?.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              );
            }}
          />
          <Column
            name="manualTests"
            HeaderCell={() => (
              <HeaderCell>
                <TestTypeLabel>Manual</TestTypeLabel>
              </HeaderCell>
            )}
            Cell={({
              item: { coverage: { byTestType }, active },
            }: { item: { coverage: { byTestType: TestTypeSummary[] }; active: boolean }}) => {
              const coverageByTestType = transformObjectsArrayToObject(byTestType, 'type');
              return (
                <TestTypeCoverage>
                  {coverageByTestType?.MANUAL && (
                    <span>
                      {`${percentFormatter(coverageByTestType?.MANUAL?.summary?.coverage?.percentage || 0)}%`}
                    </span>
                  )}
                  {active && testTypes.includes('MANUAL') && (
                    <>
                      <RecordingIcon />
                      <RecordingText>Rec</RecordingText>
                    </>
                  )}
                  <TestTypeTestCount>
                    {coverageByTestType?.MANUAL
                      && coverageByTestType?.MANUAL?.summary?.testCount
                      && `${coverageByTestType?.MANUAL?.summary?.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              );
            }}
          />
          {activeBuildVersion === buildVersion && (
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
                    label: 'Manage Sessions',
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
                    label: 'Delete',
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
          )}
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
const StartTime = scopesList.startTime('div');
const ActiveBadge = scopesList.activeBadge(Status);
const IgnoreBadge = scopesList.ignoreBadge(Status);
const Coverage = scopesList.coverage('div');
const ActionCell = scopesList.actionCell('div');
