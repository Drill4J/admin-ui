import { Message } from 'types/message';
import { setSingleOperation, useSessionsPaneDispatch, useSessionsPaneState } from '../../../store';
import { OperationActionWarning } from '../../../operation-action-warning';
import { abortSession, finishSession } from '../../../sessions-management-pane-api';

interface Props {
  sessionId: string;
  pluginId: string;
  agentId: string;
  showGeneralAlertMessage: (message: Message) => void;
}

export const SingleOperationWarning = ({
  agentId, sessionId, pluginId, showGeneralAlertMessage,
}: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { singleOperation: { operationType } } = useSessionsPaneState();

  return (
    <>
      {operationType === 'abort' ? (
        <OperationActionWarning
          handleConfirm={() => {
            abortSession(agentId, pluginId, showGeneralAlertMessage)(sessionId);
            dispatch(setSingleOperation('abort', ''));
          }}
          handleDecline={() => dispatch(setSingleOperation(operationType, ''))}
          operationType="abort"
        >
          Are you sure you want to abort this session? All your progress will be lost.
        </OperationActionWarning>
      ) : (
        <OperationActionWarning
          handleConfirm={() => {
            finishSession(agentId, pluginId, showGeneralAlertMessage)(sessionId);
            dispatch(setSingleOperation('finish', ''));
          }}
          handleDecline={() => dispatch(setSingleOperation('finish', ''))}
          operationType="finish"
        >
          Are you sure you want to finish this session?
        </OperationActionWarning>
      )}
    </>
  );
};
