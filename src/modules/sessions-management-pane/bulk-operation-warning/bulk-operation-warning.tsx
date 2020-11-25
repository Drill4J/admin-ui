import * as React from 'react';

import { Message } from 'types/message';
import { useSessionsPaneDispatch, useSessionsPaneState, setBulkOperation } from '../store';
import { OperationActionWarning } from '../operation-action-warning';
import { abortAllSession, finishAllSession } from '../sessions-management-pane-api';

interface Props {
  agentType: string;
  pluginId: string;
  agentId: string;
  showGeneralAlertMessage: (message: Message) => void;
}

export const BulkOperationWarning = ({
  agentId, agentType, pluginId, showGeneralAlertMessage,
}: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation: { operationType } } = useSessionsPaneState();

  return (
    <>
      {operationType === 'abort' ? (
        <OperationActionWarning
          handleConfirm={() => {
            abortAllSession({ agentType, pluginId, agentId }, showGeneralAlertMessage);
            dispatch(setBulkOperation('abort', false));
          }}
          handleDecline={() => dispatch(setBulkOperation(operationType, false))}
          operationType="abort"
        >
          Are you sure you want to abort all sessions? All your progress will be lost.
        </OperationActionWarning>
      ) : (
        <OperationActionWarning
          handleConfirm={() => {
            finishAllSession({ agentType, pluginId, agentId }, showGeneralAlertMessage);
            dispatch(setBulkOperation('finish', false));
          }}
          handleDecline={() => dispatch(setBulkOperation('finish', false))}
          operationType="finish"
        >
          Are you sure you want to finish all sessions?
        </OperationActionWarning>
      )}
    </>
  );
};
