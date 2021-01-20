/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useContext } from 'react';
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
import { useActiveScope, useAgent, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, useCoveragePluginState, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';
import { NoScopeStub } from '../no-scope-stub';

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
  const { showMessage } = useContext(NotificationManagerContext);
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();
  const { agentId } = usePluginState();
  const { buildVersion: activeBuildVersion = '', status } = useAgent(agentId) || {};
  const { pluginId = '', buildVersion = '' } = useParams<{ pluginId: string; buildVersion: string }>();
  const { push } = useHistory();
  const dispatch = useCoveragePluginDispatch();
  const activeScope = useActiveScope();
  const scopes = useBuildVersion<ScopeSummary[]>('/scopes') || [];
  scopes.sort(
    ({ started: firstStartedDate }, { started: secondStartedDate }) => secondStartedDate - firstStartedDate,
  );
  const scopesData = activeScope && activeScope.name ? [activeScope, ...scopes] : scopes;

  return (
    <div className={className}>
      <Content>
        <Title>
          All Scopes
          <ScopesCount>{scopesData.length}</ScopesCount>
        </Title>
        {scopesData.length > 0
          ? (
            <Table data={scopesData} idKey="name" gridTemplateColumns="40% repeat(4, 1fr) 48px">
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
                    <ScopeName title={value}>{value}</ScopeName>
                    {status === AGENT_STATUS.ONLINE && (
                      <Panel>
                        <ScopeTimer started={started} finished={finished} active={active} size="small" />
                        {active && <ActiveBadge>Active</ActiveBadge>}
                        {!enabled && <IgnoreBadge>Ignored</IgnoreBadge>}
                      </Panel>
                    )}
                  </NameCell>
                )}
                align="start"
              />
              <Column
                name="started"
                label="Started"
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
                align="start"
              />
              <Column
                name="coverage"
                label="Coverage"
                Cell={({ item: { coverage: { percentage } } }) => (
                  <Coverage data-test="scopes-list:coverage">
                    {`${percentFormatter(percentage)}%`}
                  </Coverage>
                )}
              />
              <Column
                name="autoTests"
                label="Auto Tests"
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
                        {coverageByTestType?.AUTO && coverageByTestType?.AUTO?.summary?.testCount}
                      </TestTypeTestCount>
                    </TestTypeCoverage>
                  );
                }}
              />
              <Column
                name="manualTests"
                label="Manual tests"
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
                        {coverageByTestType?.MANUAL && coverageByTestType?.MANUAL?.summary?.testCount}
                      </TestTypeTestCount>
                    </TestTypeCoverage>
                  );
                }}
              />
              {activeBuildVersion === buildVersion && status === AGENT_STATUS.ONLINE && (
                <Column
                  name="actions"
                  Cell={({ item }) => {
                    const { active, enabled, id } = item;
                    const menuActions = [
                      active && {
                        label: 'Finish Scope',
                        icon: 'Check',
                        onClick: () => dispatch(openModal('FinishScopeModal', item)),
                      },
                      active && {
                        label: 'Sessions Management',
                        icon: 'ManageSessions',
                        onClick: () => dispatch(openModal('SessionsManagementModal', null)),
                      },
                      !active && {
                        label: `${enabled ? 'Ignore' : 'Include'} in stats`,
                        icon: enabled ? 'EyeCrossed' : 'Eye',
                        onClick: () => toggleScope(agentId, pluginId, {
                          onSuccess: () => {
                            showMessage({
                              type: 'SUCCESS',
                              text: `Scope has been ${enabled ? 'ignored' : 'included'} in build stats.`,
                            });
                          },
                          onError: () => {
                            showMessage({
                              type: 'ERROR',
                              text: 'There is some issue with your action. Please try again later',
                            });
                          },
                        })(id),
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
                      <Menu items={menuActions as MenuItemType[]} />
                    );
                  }}
                />
              )}
            </Table>
          ) : <NoScopeStub />}
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
const ScopeName = scopesList.scopeName('div');
const StartDate = scopesList.startDate('div');
const StartTime = scopesList.startTime('div');
const ActiveBadge = scopesList.activeBadge(Status);
const IgnoreBadge = scopesList.ignoreBadge(Status);
const Coverage = scopesList.coverage('div');
