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
import { useEffect } from 'react';
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import {
  Modal, GeneralAlerts, Icons,
} from '@drill4j/ui-kit';
import 'twin.macro';

import {
  composeValidators,
  sizeLimit,
  required,
  handleFieldErrors,
} from 'forms';
import { useCloseModal, useGeneralAlertMessage } from 'hooks';
import { Stub } from 'components';
import { ManagementNewSession } from './management-new-session';
import { useActiveSessions } from './use-active-sessions';
import {
  startServiceGroupSessions, startAgentSession,
} from './sessions-management-pane-api';
import { ManagementActiveSessions } from './management-active-sessions';
import { ActiveSessionsList } from './active-sessions-list';
import { BulkOperationWarning } from './bulk-operation-warning';
import { ActionsPanel } from './actions-panel';
import { setIsNewSession, useSessionsPaneDispatch, useSessionsPaneState } from './store';

const validateManageSessionsPane = composeValidators(
  required('sessionId', 'Session ID'),
  sizeLimit({
    name: 'sessionId', alias: 'Session ID', min: 1, max: 256,
  }),
);

export const SessionsManagementPane = () => {
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation, isNewSession } = useSessionsPaneState();
  const { generalAlertMessage, showGeneralAlertMessage } = useGeneralAlertMessage();
  const {
    agentId = '', serviceGroupId = '', pluginId = '', buildVersion = '',
  } = useParams<{ agentId: string; serviceGroupId: string; pluginId: string; buildVersion: string}>();
  const agentType = serviceGroupId ? 'ServiceGroup' : 'Agent';
  const id = agentId || serviceGroupId;
  const activeSessions = useActiveSessions(agentType, id, buildVersion) || [];
  const hasGlobalSession = activeSessions.some(({ isGlobal }) => isGlobal);
  useEffect(() => showGeneralAlertMessage(null), [isNewSession]);
  const closeModal = useCloseModal('/session-management-pane');

  return (
    <Modal isOpen onToggle={closeModal}>
      <Form
        onSubmit={async (values: { sessionId: string; isRealtime: boolean; isGlobal: boolean }, form): Promise<unknown> => {
          try {
            const response = await (agentId
              ? startAgentSession(agentId, pluginId)(values)
              : startServiceGroupSessions(serviceGroupId, pluginId)(values));
            dispatch(setIsNewSession(false));
            form.change('sessionId', '');
            form.change('isGlobal', false);
            form.change('isRealtime', false);
            showGeneralAlertMessage({ type: 'SUCCESS', text: 'New session has been started successfully.' });
            return response;
          } catch (error) {
            if (error?.response?.data?.code === 409) {
              const { data: { fieldErrors = [] } = {}, message: errorMessage = '' } = error?.response?.data || {};
              errorMessage && showGeneralAlertMessage({
                type: 'ERROR',
                text: errorMessage || 'There is some issue with your action. Please try again later.',
              });

              return handleFieldErrors(fieldErrors);
            }
            showGeneralAlertMessage({ type: 'ERROR', text: 'There is some issue with your action. Please try again  later.' });
            return error;
          }
        }}
        validate={validateManageSessionsPane}
        render={({
          invalid, handleSubmit, dirtySinceLastSubmit, submitting, hasValidationErrors,
        }) => (
          <form onSubmit={handleSubmit} tw="flex flex-col h-full">
            <div
              tw="h-16 px-6 py-4 text-20 leading-32 text-monochrome-black border-b border-monochrome-medium-tint"
              data-test="sessions-management-pane:header"
            >
              {isNewSession ? 'Start New Session' : 'Sessions Management'}
            </div>
            {generalAlertMessage?.type && (
              <GeneralAlerts type={generalAlertMessage.type}>
                {generalAlertMessage.text}
              </GeneralAlerts>
            )}
            {isNewSession &&
            <ManagementNewSession agentId={agentId} serviceGroupId={serviceGroupId} hasGlobalSession={hasGlobalSession} />}
            {!isNewSession && activeSessions.length > 0 && (
              <>
                <ManagementActiveSessions activeSessions={activeSessions} />
                <ActiveSessionsList
                  agentType={agentType}
                  activeSessions={activeSessions}
                  showGeneralAlertMessage={showGeneralAlertMessage}
                />
              </>
            )}
            {!isNewSession && activeSessions.length === 0 && (
              <Stub
                icon={<Icons.Test width={120} height={134} viewBox="0 0 18 20" data-test="empty-active-sessions-stub:test-icon" />}
                title="There are no active sessions"
                message="You can use this menu to start a new one."
              />
            )}
            <div tw="min-h-80px mt-auto px-6 py-4 bg-monochrome-light-tint">
              {bulkOperation.isProcessing ? (
                <BulkOperationWarning
                  agentId={id}
                  agentType={agentType}
                  pluginId={pluginId}
                  showGeneralAlertMessage={showGeneralAlertMessage}
                />
              ) : (
                <ActionsPanel
                  activeSessions={activeSessions}
                  startSessionDisabled={(invalid && !dirtySinceLastSubmit) || hasValidationErrors || submitting}
                  onToggle={closeModal}
                  handleSubmit={handleSubmit}
                  submitting={submitting}
                />
              )}
            </div>
          </form>
        )}
      />
    </Modal>
  );
};
