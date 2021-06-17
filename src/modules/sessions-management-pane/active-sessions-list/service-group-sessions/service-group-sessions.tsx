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
import { Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';
import { ActiveSession } from 'types/active-session';
import { Message } from 'types/message';
import { SessionInfo } from '../session-info';
import { useSessionsPaneState } from '../../store';

interface Props {
  activeSessions: ActiveSession[];
  showGeneralAlertMessage: (message: Message) => void;
}

const ServiceGroupAgentPanel = styled.div`
  ${tw`flex items-center pt-5 pr-6 pb-1 ml-6`}
  ${tw`text-12 leading-24 text-monochrome-black border-b border-monochrome-medium-tint`}
  ${({ disabled }: { disabled: boolean }) => disabled && tw`opacity-20`}
`;

export const ServiceGroupSessions = ({ activeSessions, showGeneralAlertMessage }: Props) => {
  const serviceGroupAgentsIds = Array.from(new Set(activeSessions.map(session => session.agentId)));
  const { bulkOperation } = useSessionsPaneState();

  return (
    <div>
      {serviceGroupAgentsIds.map((agentId) => (
        <div key={agentId}>
          <ServiceGroupAgentPanel
            data-test="service-group-sessions:service-group-agent-panel"
            disabled={bulkOperation.isProcessing}
          >
            <Icons.Agent data-test="service-group-sessions:agent-icon" />
            <span
              tw="mx-2 text-12 leading-24 font-bold text-monochrome-black align-middle"
              data-test="service-group-sessions:agent-name"
            >
              {agentId}
            </span>
          </ServiceGroupAgentPanel>
          {activeSessions.filter(({ agentId: sessionAgentId }) => sessionAgentId === agentId)
            .map(({
              id: sessionId, testType, isGlobal, isRealtime,
            }) => (
              <SessionInfo
                key={sessionId}
                sessionId={sessionId}
                testType={testType}
                isGlobal={isGlobal}
                isRealtime={isRealtime}
                agentId={agentId}
                showGeneralAlertMessage={showGeneralAlertMessage}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
