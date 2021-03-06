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
import { useParams, Link } from 'react-router-dom';
import {
  Menu, Icons, Table, Column, Status,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import {
  percentFormatter, dateFormatter, timeFormatter, transformObjectsArrayToObject,
} from 'utils';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { TestTypeSummary } from 'types/test-type-summary';
import { useActiveScope, useAgent, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { Stub } from 'components';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeTimer } from '../scope-timer';

const Title = styled.div`
  ${tw`flex items-center gap-x-2 w-full h-20 border-b border-monochrome-medium-tint`}
  ${tw`font-light text-24 leading-32 text-monochrome-black`}
`;

export const ScopesList = () => {
  const { showMessage } = useContext(NotificationManagerContext);
  const { agentId } = usePluginState();
  const { buildVersion: activeBuildVersion = '', status } = useAgent(agentId) || {};
  const { pluginId = '', buildVersion = '' } = useParams<{ pluginId: string; buildVersion: string }>();
  const dispatch = useCoveragePluginDispatch();
  const activeScope = useActiveScope();
  const scopes = useBuildVersion<ScopeSummary[]>('/build/scopes/finished') || [];
  scopes.sort(
    ({ started: firstStartedDate }, { started: secondStartedDate }) => secondStartedDate - firstStartedDate,
  );
  const scopesData = activeScope && activeScope.name ? [activeScope, ...scopes] : scopes;

  return (
    <div tw="flex flex-col w-full h-full">
      <Title>
        All Scopes
        <span tw="text-monochrome-default">{scopesData.length}</span>
      </Title>
      {scopesData.length > 0
        ? (
          <Table data={scopesData} idKey="name" gridTemplateColumns="40% repeat(4, 1fr) 48px">
            <Column
              name="name"
              label="Name"
              Cell={({
                value = '', item: {
                  id = '', started = 0, active = false, enabled = false, finished = 0,
                } = {},
              }) => (
                <Link
                  tw="font-bold text-14 leading-20 cursor-pointer"
                  to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${id}/methods`}
                  data-test="scopes-list:scope-name"
                >
                  <div className="link text-ellipsis" title={value}>{value}</div>
                  <div tw="flex gap-x-2 items-center w-full text-12">
                    <ScopeTimer started={started} finished={finished} active={active} size="small" />
                    {active && <Status tw="text-green-default">Active</Status>}
                    {!enabled && <Status tw="text-monochrome-default">Ignored</Status>}
                  </div>
                </Link>
              )}
              align="start"
            />
            <Column
              name="started"
              label="Started"
              Cell={({ value = 0 }) => (
                <>
                  <div tw="font-bold text-12 leading-16 text-monochrome-black">
                    {dateFormatter(value)}
                  </div>
                  <div tw="text-12 leading-20 text-monochrome-default">
                    at {timeFormatter(value)}
                  </div>
                </>
              )}
              align="start"
            />
            <Column
              name="coverage"
              label="Coverage"
              Cell={({ item = {} }) => (
                <div tw="text-20 leading-32 my-6 text-monochrome-black" data-test="scopes-list:coverage">
                  {`${percentFormatter(item?.coverage?.percentage)}%`}
                </div>
              )}
            />
            <Column
              name="autoTests"
              label="Auto Tests"
              Cell={({ item = {} }) => {
                const coverageByTestType = transformObjectsArrayToObject(item?.coverage?.byTestType as TestTypeSummary[], 'type');
                return (
                  <div tw="font-bold text-12 leading-20 text-monochrome-black">
                    {coverageByTestType?.AUTO && (
                      <span>
                        {`${percentFormatter(coverageByTestType?.AUTO?.summary?.coverage?.percentage || 0)}%`}
                      </span>
                    )}
                    <div tw="font-regular text-right text-monochrome-default leading-16">
                      {coverageByTestType?.AUTO && coverageByTestType?.AUTO?.summary?.testCount}
                    </div>
                  </div>
                );
              }}
            />
            <Column
              name="manualTests"
              label="Manual tests"
              Cell={({ item = {} }) => {
                const coverageByTestType = transformObjectsArrayToObject(item?.coverage?.byTestType as TestTypeSummary[], 'type');
                return (
                  <div tw="font-bold text-12 leading-20 text-monochrome-black">
                    {coverageByTestType?.MANUAL && (
                      <span>
                        {`${percentFormatter(coverageByTestType?.MANUAL?.summary?.coverage?.percentage || 0)}%`}
                      </span>
                    )}
                    <div tw="font-regular text-right text-monochrome-default leading-16">
                      {coverageByTestType?.MANUAL && coverageByTestType?.MANUAL?.summary?.testCount}
                    </div>
                  </div>
                );
              }}
            />
            {activeBuildVersion === buildVersion && status === AGENT_STATUS.ONLINE && (
              <Column
                name="actions"
                Cell={({ item = {} }) => {
                  const { active, enabled, id } = item;
                  const menuActions = [
                    active && {
                      label: 'Finish Scope',
                      icon: 'Check',
                      onClick: () => dispatch(openModal('FinishScopeModal', id)),
                    },
                    active && {
                      label: 'Sessions Management',
                      icon: 'ManageSessions',
                      Content: ({ children }: { children: JSX.Element }) => (
                        <Link to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/session-management-pane`}>
                          {children}
                        </Link>
                      ),
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
                      onClick: () => dispatch(openModal('RenameScopeModal', id)),
                    },
                    {
                      label: 'Delete',
                      icon: 'Delete',
                      onClick: () => dispatch(openModal('DeleteScopeModal', id)),
                    },
                  ].filter(Boolean);
                  return (
                    <Menu items={menuActions} />
                  );
                }}
              />
            )}
          </Table>
        ) : (
          <Stub
            icon={<Icons.Scope tw="text-monochrome-medium-tint" width={157} height={157} data-test="no-scope-stub:test-icon" />}
            title={<span tw="text-24">No scopes found</span>}
            message="There are no scopes with finished test sessions in this build."
          />
        )}
    </div>
  );
};
