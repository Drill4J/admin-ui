import { BEM } from '@redneckz/react-bem-helper';
import {
  Panel, Button, LinkButton, OverflowText, Icons,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { capitalize } from 'utils';
import { Message } from 'types/message';
import { useSessionsPaneDispatch, useSessionsPaneState, setSingleOperation } from '../../store';
import { SingleOperationWarning } from './single-operation-warning';

import styles from './session-info.module.scss';

interface Props {
  className?: string;
  testType: string;
  isGlobal: boolean;
  isRealtime: boolean;
  sessionId: string;
  agentId: string;
  showGeneralAlertMessage: (message: Message) => void;
}

const sessionInfo = BEM(styles);

export const SessionInfo = sessionInfo(
  ({
    className, testType, isGlobal, isRealtime, sessionId, agentId, showGeneralAlertMessage,
  }: Props) => {
    const { pluginId = '' } = useParams<{ pluginId: string }>();
    const dispatch = useSessionsPaneDispatch();
    const { bulkOperation, singleOperation: { id } } = useSessionsPaneState();
    const operationIsProcessing = Boolean(id === sessionId + agentId);
    const disabled = Boolean(id) || bulkOperation.isProcessing;

    return (
      <div className={className}>
        {operationIsProcessing ? (
          <SingleOperationWarning
            pluginId={pluginId}
            sessionId={sessionId}
            agentId={agentId}
            showGeneralAlertMessage={showGeneralAlertMessage}
          />
        ) : (
          <>
            <Panel align="space-between">
              <SessionId disabled={disabled} data-test="session-info:session-id" title={sessionId}>{sessionId}</SessionId>
              <ActionsPanel>
                <LinkButton
                  size="small"
                  onClick={() => dispatch(setSingleOperation('abort', sessionId + agentId))}
                  disabled={disabled}
                  data-test="session-info:abort-button"
                >
                  Abort
                </LinkButton>
                <Button
                  type="secondary"
                  size="small"
                  onClick={() => dispatch(setSingleOperation('finish', sessionId + agentId))}
                  disabled={disabled}
                  data-test="session-info:finish-button"
                >
                  Finish
                </Button>
              </ActionsPanel>
            </Panel>
            <AdditionalSessionInfo disabled={disabled}>
              {isGlobal
                ? <SessionType><Icons.Global />&nbsp;Global</SessionType>
                : <TestType data-test="session-info:test-type">{capitalize(testType)}</TestType>}
              {isRealtime && <SessionType><Icons.RealTime />&nbsp;Real-time</SessionType>}
            </AdditionalSessionInfo>
          </>
        )}
      </div>
    );
  },
);

const SessionId = sessionInfo.sessionId(OverflowText);
const ActionsPanel = sessionInfo.actionsPanel('div');
const TestType = sessionInfo.testType('span');
const AdditionalSessionInfo = sessionInfo.additionalSessionInfo('div');
const SessionType = sessionInfo.sessionType('div');
