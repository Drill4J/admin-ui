import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ActiveSession } from 'types/active-session';
import { Message } from 'types/message';
import { SessionInfo } from './session-info';
import { ServiceGroupSessions } from './service-group-sessions';

import styles from './active-sessions-list.module.scss';

interface Props {
  className?: string;
  agentType: string;
  activeSessions: ActiveSession[];
  showGeneralAlertMessage: (message: Message) => void;
}

const activeSessionsList = BEM(styles);

export const ActiveSessionsList = activeSessionsList(({
  className, agentType, activeSessions, showGeneralAlertMessage,
}: Props) => (
  <div className={className}>
    {agentType === 'Agent' ? (
      activeSessions.map(({
        id: sessionId, testType, agentId, isRealtime, isGlobal,
      }) => (
        <SessionInfo
          key={sessionId}
          sessionId={sessionId}
          agentId={agentId}
          testType={testType}
          isGlobal={isGlobal}
          isRealtime={isRealtime}
          showGeneralAlertMessage={showGeneralAlertMessage}
        />
      ))
    ) : (
      <ServiceGroupSessions activeSessions={activeSessions} showGeneralAlertMessage={showGeneralAlertMessage} />
    )}
  </div>
));
