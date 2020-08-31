import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Fields } from 'forms';
import { ActiveSession } from 'types/active-session';
import { Message } from 'types/message';
import { EmptyActiveSessionsStub } from './empty-active-sessions-stub';
import { SessionInfo } from './session-info';
import { ServiceGroupSessions } from './service-group-sessions';

import styles from './manage-active-sessions.module.scss';

interface Props {
  className?: string;
  agentType: string;
  activeSessions: ActiveSession[];
  showGeneralAlertMessage: (message: Message) => void;
}

const manageActiveSessions = BEM(styles);

export const ManageActiveSessions = manageActiveSessions(
  ({
    className, agentType, activeSessions, showGeneralAlertMessage,
  }: Props) => {
    const [abortingSessionIdByAgentId, setAbortingSessionIdByAgentId] = React.useState<string>('');
    return (
      <div className={className}>
        {activeSessions.length > 0
          ? (
            <>
              <SearchPanel data-test="manage-active-sessions:search-panel">
                <span>
                  Active Sessions
                  <Count>
                    {activeSessions.length}
                  </Count>
                </span>
                <form>
                  <Field
                    name="id"
                    component={Fields.Search}
                    placeholder="Search session by ID"
                    disabled
                  />
                </form>
              </SearchPanel>
              {agentType === 'Agent'
                ? activeSessions.map(({ id: sessionId, testType, agentId }) => (
                  <SessionInfo
                    key={sessionId}
                    sessionId={sessionId}
                    agentId={agentId}
                    testType={testType}
                    abortingSessionIdByAgentId={abortingSessionIdByAgentId}
                    setAbortingSessionIdByAgentId={setAbortingSessionIdByAgentId}
                    showGeneralAlertMessage={showGeneralAlertMessage}
                  />
                ))
                : (
                  <ServiceGroupSessions
                    activeSessions={activeSessions}
                    abortingSessionIdByAgentId={abortingSessionIdByAgentId}
                    setAbortingSessionIdByAgentId={setAbortingSessionIdByAgentId}
                    showGeneralAlertMessage={showGeneralAlertMessage}
                  />
                )}
            </>
          )
          : <EmptyActiveSessionsStub />}
      </div>
    );
  },
);

const SearchPanel = manageActiveSessions.searchPanel('div');
const Count = manageActiveSessions.count('span');
