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
import {
  Button, LinkButton, Icons,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { capitalize } from 'utils';
import { Message } from 'types/message';
import { useSessionsPaneDispatch, useSessionsPaneState, setSingleOperation } from '../../store';
import { SingleOperationWarning } from './single-operation-warning';

interface Props {
  testType: string;
  isGlobal: boolean;
  isRealtime: boolean;
  sessionId: string;
  agentId: string;
  showGeneralAlertMessage: (message: Message) => void;
}

const AdditionalSessionInfo = styled.div`
  ${tw`flex mt-1 gap-2 `}
  ${tw`text-monochrome-default`}
  ${({ disabled }: { disabled: boolean }) => disabled && tw`opacity-20`}
`;

const SessionId = styled.div`
  ${tw`font-bold text-14 leading-20 text-ellipsis`}
  ${({ disabled }: { disabled: boolean }) => disabled && tw`opacity-20`}
`;

export const SessionInfo = ({
  testType, isGlobal, isRealtime, sessionId, agentId, showGeneralAlertMessage,
}: Props) => {
  const { pluginId = '' } = useParams<{ pluginId: string }>();
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation, singleOperation: { id } } = useSessionsPaneState();
  const operationIsProcessing = Boolean(id === sessionId + agentId);
  const disabled = Boolean(id) || bulkOperation.isProcessing;

  return (
    <div tw="h-16 py-3 px-6 border-b border-monochrome-medium-tint text-12 leading-16 text-monochrome-black">
      {operationIsProcessing ? (
        <SingleOperationWarning
          pluginId={pluginId}
          sessionId={sessionId}
          agentId={agentId}
          showGeneralAlertMessage={showGeneralAlertMessage}
        />
      ) : (
        <>
          <div className="flex justify-between items-center w-full">
            <SessionId disabled={disabled} data-test="session-info:session-id" title={sessionId}>{sessionId}</SessionId>
            <div tw="flex gap-4">
              <LinkButton
                size="small"
                onClick={() => dispatch(setSingleOperation('abort', sessionId + agentId))}
                disabled={disabled}
                data-test="session-info:abort-button"
              >
                Abort
              </LinkButton>
              <Button
                secondary
                size="small"
                onClick={() => dispatch(setSingleOperation('finish', sessionId + agentId))}
                disabled={disabled}
                data-test="session-info:finish-button"
              >
                Finish
              </Button>
            </div>
          </div>
          <AdditionalSessionInfo disabled={disabled}>
            {isGlobal
              ? <div tw="flex"><Icons.Global />&nbsp;Global</div>
              : <span tw="text-12 leading-16 text-monochrome-default" data-test="session-info:test-type">{capitalize(testType)}</span>}
            {isRealtime && <div tw="flex"><Icons.RealTime />&nbsp;Real-time</div>}
          </AdditionalSessionInfo>
        </>
      )}
    </div>
  );
};
