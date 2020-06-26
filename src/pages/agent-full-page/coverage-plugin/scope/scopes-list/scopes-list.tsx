import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Menu, Icons, Table, Column, Badge,
} from '@drill4j/ui-kit';

import { percentFormatter, dateFormatter, timeFormatter } from 'utils';
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
                {active && <ActiveBadge color="green">Active</ActiveBadge>}
                {!enabled && <IgnoreBadge>Ignored</IgnoreBadge>}
                <div>
                  <ScopeTimer started={started} finised={finished} active={active} size="small" />
                </div>
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
            Cell={({ value: { ratio } }) => (
              <Coverage data-test="scopes-list:coverage">
                {`${percentFormatter(ratio)}%`}
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
            Cell={({ item: { coverage: { byTestType }, active } }) => (
              <TestTypeCoverage>
                {byTestType.AUTO && (
                  <span>{`${percentFormatter(byTestType.AUTO.coverage)}%`}</span>
                )}
                {active && testTypes.includes('AUTO') && (
                  <>
                    <RecordingIcon />
                    <RecordingText>Rec</RecordingText>
                  </>
                )}
                <TestTypeTestCount>
                  {byTestType.AUTO
                      && byTestType.AUTO.testCount
                      && `${byTestType.AUTO.testCount} tests`}
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
            Cell={({ item: { coverage: { byTestType }, active } }) => (
              <TestTypeCoverage>
                {byTestType.MANUAL && (
                  <span>{`${percentFormatter(byTestType.MANUAL.coverage)}%`}</span>
                )}
                {active && testTypes.includes('MANUAL') && (
                  <>
                    <RecordingIcon />
                    <RecordingText>Rec</RecordingText>
                  </>
                )}
                <TestTypeTestCount>
                  {byTestType.MANUAL
                      && byTestType.MANUAL.testCount
                      && `${byTestType.MANUAL.testCount} tests`}
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
const StartTime = scopesList.startTime('div');
const ActiveBadge = scopesList.activeBadge(Badge);
const IgnoreBadge = scopesList.ignoreBadge(Badge);
const Coverage = scopesList.coverage('div');
const ActionCell = scopesList.actionCell('div');
