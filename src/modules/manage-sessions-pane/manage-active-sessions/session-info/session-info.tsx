import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Panel, Button, LinkButton, OverflowText, NegativeActionButton,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { finishSession, abortSession } from 'modules/manage-sessions-pane/manage-sessions-pane-api';
import { Message } from 'types/message';

import styles from './session-info.module.scss';

interface Props {
  className?: string;
  testType: string;
  sessionId: string;
  agentId: string;
  abortingSessionIdByAgentId: string;
  setAbortingSessionIdByAgentId: React.Dispatch<React.SetStateAction<string>>;
  showGeneralAlertMessage: (message: Message) => void;
}

const sessionInfo = BEM(styles);

export const SessionInfo = sessionInfo(
  ({
    className, testType, sessionId, agentId, abortingSessionIdByAgentId, setAbortingSessionIdByAgentId, showGeneralAlertMessage,
  }: Props) => {
    const { pluginId = '' } = useParams<{ pluginId: string;}>();
    const abortingSessionIsProcessing = abortingSessionIdByAgentId === sessionId + agentId;
    const disabled = Boolean(abortingSessionIdByAgentId && !abortingSessionIsProcessing);
    return (
      <div className={className}>
        {abortingSessionIsProcessing ? (
          <SessionAbort data-test="session-info:session-abort">
            <span>
              Are you sure you want to abort this session? All your progress will be lost.
            </span>
            <ActionsPanel>
              <Button
                type="secondary"
                size="small"
                onClick={() => setAbortingSessionIdByAgentId('')}
                data-test="session-info:no-button"
              >
                No
              </Button>
              <NegativeActionButton
                size="small"
                onClick={() => {
                  abortSession(agentId, pluginId, showGeneralAlertMessage)(sessionId);
                  setAbortingSessionIdByAgentId('');
                }}
                data-test="session-info:yes-button"
              >
                Yes
              </NegativeActionButton>
            </ActionsPanel>
          </SessionAbort>
        )
          : (
            <>
              <Panel align="space-between">
                <SessionId disabled={disabled} data-test="session-info:session-id">{sessionId}</SessionId>
                <ActionsPanel>
                  <LinkButton
                    size="small"
                    onClick={() => { setAbortingSessionIdByAgentId(sessionId + agentId); }}
                    disabled={disabled}
                    data-test="session-info:abort-button"
                  >
                    Abort
                  </LinkButton>
                  <Button
                    type="secondary"
                    size="small"
                    onClick={() => finishSession(agentId, pluginId, showGeneralAlertMessage)(sessionId)}
                    disabled={disabled}
                    data-test="session-info:finish-button"
                  >
                    Finish
                  </Button>
                </ActionsPanel>
              </Panel>
              <TestType disabled={disabled} data-test="session-info:test-type">{testType}</TestType>
            </>
          )}
      </div>
    );
  },
);

const SessionAbort = sessionInfo.sessionAbort(Panel);
const SessionId = sessionInfo.sessionId(OverflowText);
const ActionsPanel = sessionInfo.actionsPanel('div');
const TestType = sessionInfo.testType('span');
