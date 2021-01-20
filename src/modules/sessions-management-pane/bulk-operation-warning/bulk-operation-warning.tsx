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
