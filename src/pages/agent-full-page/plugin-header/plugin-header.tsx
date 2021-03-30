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
import { useHistory, matchPath } from 'react-router-dom';
import { Spinner, Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { AGENT_STATUS } from 'common/constants';
import { capitalize, snakeToSpaces } from 'utils';
import { AgentStatus } from 'types/agent-status';
import { useAgent } from 'hooks';
import { usePluginState } from '../store';
import { ReactComponent as LogoSvg } from './logo.svg';

interface Props {
  agentName?: string;
  agentStatus?: AgentStatus;
}

const LogoWrapper = styled.div`
  ${tw`relative w-20 h-20 border-2 border-monochrome-black rounded-full`}
  &:before {
    ${({ recording }: { recording?: boolean }) => recording && 'content: \'\';'}
    ${tw`absolute w-19 h-19 rounded-full`}
    background: conic-gradient(
            red,
            #ff8000,
            yellow,
            #80ff00,
            lime,
            #00ff80,
            cyan,
            #0080ff,
            blue,
            #8000ff,
            magenta,
            #ff0080,
            red
    );
    animation: rotation 10s linear infinite;
    @keyframes rotation {
      to {
        transform: rotate(1turn);
      }
    }
  }
`;
const AgentInfo = styled.div`
  ${tw`flex flex-col ml-6 max-w-1/2`}
  & > * {
    ${tw`mb-2`}
  }
`;
const SettingsButton = styled(Icons.Settings)(({ disabled }: { disabled?: boolean }) => [
  tw`flex w-8 h-8 cursor-pointer`,
  disabled && tw`opacity-25 pointer-events-none`,
]);
const AgentStatusWrapper = styled.div(({ status }: { status?: AgentStatus }) => [
  tw`flex justify-center items-center px-2`,
  tw`border border-current-color rounded-full font-bold text-12 leading-20`,
  status === 'BUSY' && tw`text-orange-default`,
  status === 'NOT_REGISTERED' && tw`text-monochrome-default`,
  status === 'OFFLINE' && tw`text-monochrome-default`,
  status === 'ONLINE' && tw`text-green-default`,
]);

export const PluginHeader = ({ agentName, agentStatus }: Props) => {
  const { loading } = usePluginState();
  const { push, location: { pathname } } = useHistory();
  const { params: { buildVersion = '', agentId = '' } = {} } = matchPath<{ buildVersion: string; agentId: string }>(pathname, {
    path: '/:page/:agentId/:buildVersion',
  }) || {};
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};

  return (
    <div tw="flex w-full h-28">
      <div tw="flex justify-between items-center w-full h-full px-6">
        <div className="flex items-center w-full">
          <LogoWrapper recording={buildVersion === activeBuildVersion && loading}>
            <LogoSvg tw="absolute bottom-0 left-0" />
          </LogoWrapper>
          <AgentInfo>
            <div className="text-ellipsis text-32 leading-40" title={agentName}>{agentName}</div>
            <div className="flex items-center w-full">
              <AgentStatusWrapper status={agentStatus}>{capitalize(snakeToSpaces(agentStatus))}</AgentStatusWrapper>
              <div
                className="flex items-center ml-2"
              >
                {agentStatus === AGENT_STATUS.BUSY && <Spinner />}
              </div>
            </div>
          </AgentInfo>
        </div>
        <span className="link">
          <SettingsButton
            onClick={() => push(`/agents/agent/${agentId}/settings/general`)}
            disabled={agentStatus === AGENT_STATUS.OFFLINE}
            data-test="plugin-header:settings-button"
          />
        </span>
      </div>
    </div>
  );
};
