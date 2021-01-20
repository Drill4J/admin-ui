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
