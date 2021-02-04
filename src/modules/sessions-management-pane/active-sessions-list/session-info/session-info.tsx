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
import { BEM } from '@redneckz/react-bem-helper';
import {
  Button, LinkButton, OverflowText, Icons,
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
            <div className="d-flex justify-content-between align-items-center w-full">
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
            </div>
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
