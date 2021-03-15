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
  ${tw`h-9`}
  ${tw`text-12 leading-24 text-monochrome-black border-b border-monochrome-medium-tint`}
  ${({ disabled }: { disabled: boolean }) => disabled && tw`opacity-20`}
`;

export const ServiceGroupSessions = ({ activeSessions, showGeneralAlertMessage }: Props) => {
  const serviceGroupAgentsIds = Array.from(new Set(activeSessions.map(session => session.agentId)));
  const { bulkOperation, singleOperation } = useSessionsPaneState();

  return (
    <div>
      {serviceGroupAgentsIds.map((agentId) => (
        <div key={agentId}>
          <ServiceGroupAgentPanel
            className="flex items-center w-full px-6 py-1"
            data-test="service-group-sessions:service-group-agent-panel"
            disabled={Boolean(singleOperation.id) || bulkOperation.isProcessing}
          >
            <Icons.Agent data-test="service-group-sessions:agent-icon" />
            <span
              tw="mx-2 text-monochrome-default"
              data-test="service-group-sessions:agent-title"
            >
              Agent:
            </span>
            {agentId}
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
