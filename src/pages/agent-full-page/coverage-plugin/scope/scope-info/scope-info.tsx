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
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {
  Icons, Menu, Button, SessionIndicator,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import {
  TabsPanel, Tab,
} from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { TableActionsProvider } from 'modules';
import { useAgent, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { ScopeProjectMethods } from './scope-project-methods';
import { CoverageDetails } from '../../coverage-details';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeStatus } from './scope-status';
import { ScopeProjectTests } from './scope-project-tests';
import { ScopeTests } from '../../scope-tests';

interface MenuItemType {
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
}

const Header = styled.div`
  ${tw`grid items-center gap-4 w-full h-20 border-b border-monochrome-medium-tint`}
  ${tw`text-24 text-monochrome-black`}
  grid-template-columns: minmax(auto, max-content) auto auto;
`;

export const ScopeInfo = () => {
  const { showMessage } = useContext(NotificationManagerContext);
  const { agentId, loading } = usePluginState();
  const { buildVersion: activeBuildVersion = '', status } = useAgent(agentId) || {};
  const {
    pluginId = '', scopeId = '', buildVersion = '', tab = '',
  } = useParams<{ pluginId: string, scopeId: string, buildVersion: string; tab: string }>();
  const dispatch = useCoveragePluginDispatch();
  const scope = useBuildVersion<ActiveScope>(`/build/scopes/${scopeId}`);
  const {
    name = '', active = false, enabled = false, started = 0, finished = 0, sessionsFinished,
  } = scope || {};
  const { push, location: { pathname = '' } } = useHistory();
  const menuActions = [
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
      })(scopeId),
    },
    active && {
      label: 'Sessions Management',
      icon: 'ManageSessions',
      onClick: () => {
        push(`${pathname}/session-management-pane`);
        dispatch(openModal(undefined, null));
      },
    },
    {
      label: 'Rename',
      icon: 'Edit',
      onClick: () => dispatch(openModal('RenameScopeModal', scope)),
    },
    {
      label: 'Delete',
      icon: 'Delete',
      onClick: () => dispatch(openModal('DeleteScopeModal', scope)),
    },
  ].filter(Boolean);
  const newBuildHasAppeared = activeBuildVersion && buildVersion && activeBuildVersion !== buildVersion;

  return (
    scope && !scope?.coverage.percentage && newBuildHasAppeared
      ? <Redirect to={{ pathname: `/full-page/${agentId}/${activeBuildVersion}/${pluginId}/dashboard` }} />
      : (
        <div>
          <Header>
            <div
              className="text-ellipsis font-light text-24 leading-32 text-monochrome-black"
              data-test="scope-info:scope-name"
              title={name}
            >
              {name}
            </div>
            {status === AGENT_STATUS.ONLINE && (
              <div className="flex items-center w-full">
                {active && <SessionIndicator tw="mr-2" active={loading} />}
                <ScopeStatus active={active} loading={loading} enabled={enabled} started={started} finished={finished} />
              </div>
            )}
            <div className="flex justify-end items-center w-full">
              {active && status === AGENT_STATUS.ONLINE && (
                <Button
                  className="flex gap-x-2 mr-4"
                  type="primary"
                  size="large"
                  onClick={() => dispatch(openModal('FinishScopeModal', scope))}
                  data-test="scope-info:finish-scope-button"
                >
                  <Icons.Complete />
                  <span>Finish Scope</span>
                </Button>
              )}
              {activeBuildVersion === buildVersion && status === AGENT_STATUS.ONLINE
                  && <Menu items={menuActions as MenuItemType[]} />}
            </div>
          </Header>
          <div tw="flex items-center w-full border-b border-monochrome-medium-tint">
            <TabsPanel>
              <Tab name="methods" to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/methods`}>
                <div tw="flex items-center mr-2 text-monochrome-black">
                  <Icons.Function />
                </div>
                Scope methods
              </Tab>
              <Tab name="tests" to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/tests`}>
                <div tw="flex items-center mr-2 text-monochrome-black">
                  <Icons.Test width={16} />
                </div>
                Scope tests
              </Tab>
            </TabsPanel>
          </div>
          <div tw="mt-4">
            <TableActionsProvider key={tab}>
              {tab === 'methods' ? (
                <>
                  <ScopeProjectMethods scope={scope} />
                  <CoverageDetails
                    topic={`/build/scopes/${scopeId}/coverage/packages`}
                    associatedTestsTopic={`/build/scopes/${scopeId}`}
                    classesTopicPrefix={`build/scopes/${scopeId}`}
                    showCoverageIcon={loading || Boolean(sessionsFinished)}
                  />
                </>
              ) : (
                <>
                  <ScopeProjectTests scopeId={scopeId} />
                  <div tw="mt-2">
                    <ScopeTests />
                  </div>
                </>
              )}
            </TableActionsProvider>
          </div>
        </div>
      )
  );
};
