import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';

import { ActiveSession } from 'types/active-session';
import { Message } from 'types/message';
import { SessionInfo } from '../session-info';
import { useSessionsPaneState } from '../../store';

import styles from './service-group-sessions.module.scss';

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
  showGeneralAlertMessage: (message: Message) => void;
}

const serviceGroupSessions = BEM(styles);

export const ServiceGroupSessions = serviceGroupSessions(({ className, activeSessions, showGeneralAlertMessage }: Props) => {
  const serviceGroupAgentsIds = Array.from(new Set(activeSessions.map(session => session.agentId)));
  const { bulkOperation, singleOperation } = useSessionsPaneState();

  return (
    <div className={className}>
      {serviceGroupAgentsIds.map((agentId) => (
        <div key={agentId}>
          <ServiceGroupAgentPanel
            data-test="service-group-sessions:service-group-agent-panel"
            disabled={Boolean(singleOperation.id) || bulkOperation.isProcessing}
          >
            <Icons.Agent data-test="service-group-sessions:agent-icon" />
            <AgentTitle data-test="service-group-sessions:agent-title">Agent:</AgentTitle>
            {agentId}
          </ServiceGroupAgentPanel>
          {activeSessions.filter(({ agentId: sessionAgentId }) => sessionAgentId === agentId)
            .map(({ id: sessionId, testType }) => (
              <SessionInfo
                key={sessionId}
                sessionId={sessionId}
                testType={testType}
                agentId={agentId}
                showGeneralAlertMessage={showGeneralAlertMessage}
              />
            ))}
        </div>
      ))}
    </div>
  );
});

const ServiceGroupAgentPanel = serviceGroupSessions.serviceGroupAgentPanel(Panel);
const AgentTitle = serviceGroupSessions.agentTitle('span');
