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
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Modal, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  composeValidators,
  sizeLimit,
  required,
  handleFieldErrors,
} from 'forms';
import { useGeneralAlertMessage } from 'hooks';
import { ManagementNewSession } from './management-new-session';
import { useActiveSessions } from './use-active-sessions';
import {
  startServiceGroupSessions, startAgentSession,
} from './sessions-management-pane-api';
import { ManagementActiveSessions } from './management-active-sessions';
import { EmptyActiveSessionsStub } from './active-sessions-list/empty-active-sessions-stub';
import { ActiveSessionsList } from './active-sessions-list';
import { BulkOperationWarning } from './bulk-operation-warning';
import { ActionsPanel } from './actions-panel';
import { setIsNewSession, useSessionsPaneDispatch, useSessionsPaneState } from './store';

import styles from './sessions-management-pane.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const manageSessionsPane = BEM(styles);

const validateManageSessionsPane = composeValidators(
  required('sessionId', 'Session ID'),
  sizeLimit({
    name: 'sessionId', alias: 'Session ID', min: 1, max: 256,
  }),
);

export const SessionsManagementPane = manageSessionsPane(
  ({
    className, isOpen, onToggle,
  }: Props) => {
    const dispatch = useSessionsPaneDispatch();
    const { bulkOperation, isNewSession } = useSessionsPaneState();
    const { generalAlertMessage, showGeneralAlertMessage } = useGeneralAlertMessage();
    const {
      agentId = '', serviceGroupId = '', pluginId = '', buildVersion = '',
    } = useParams<{ agentId: string; serviceGroupId: string; pluginId: string; buildVersion: string}>();
    const agentType = serviceGroupId ? 'ServiceGroup' : 'Agent';
    const id = agentId || serviceGroupId;
    const activeSessions = useActiveSessions(agentType, id, buildVersion) || [];

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Form
            onSubmit={async (values: { sessionId: string; isRealtime: boolean; isGlobal: boolean }, form): Promise<unknown> => {
              try {
                const response = await (agentId
                  ? startAgentSession(agentId, pluginId)(values)
                  : startServiceGroupSessions(serviceGroupId, pluginId)(values));
                showGeneralAlertMessage({ type: 'SUCCESS', text: 'New session has been started successfully.' });
                form.change('sessionId', '');
                form.change('isGlobal', false);
                form.change('isRealtime', false);
                dispatch(setIsNewSession(false));
                return response;
              } catch (error) {
                if (error?.response?.data?.code === 409) {
                  const { data: { fieldErrors = [] } = {}, message: errorMessage = '' } = error?.response?.data || {};
                  errorMessage && showGeneralAlertMessage({
                    type: 'ERROR',
                    text: errorMessage || 'There is some issue with your action. Please try again.',
                  });

                  return handleFieldErrors(fieldErrors);
                }
                showGeneralAlertMessage({ type: 'ERROR', text: 'There is some issue with your action. Please try again.' });
                return error;
              }
            }}
            validate={validateManageSessionsPane}
            render={({
              invalid, handleSubmit, dirtySinceLastSubmit, submitting, hasValidationErrors,
            }) => (
              <>
                <Header data-test="sessions-management-pane:header">
                  {isNewSession ? 'Start New Session' : 'Sessions Management'}
                </Header>
                {generalAlertMessage?.type && (
                  <GeneralAlerts type={generalAlertMessage.type}>
                    {generalAlertMessage.text}
                  </GeneralAlerts>
                )}
                {isNewSession && <ManagementNewSession agentId={agentId} serviceGroupId={serviceGroupId} />}
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
                {!isNewSession && activeSessions.length === 0 && <EmptyActiveSessionsStub />}
                <Footer>
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
                      onToggle={onToggle}
                      handleSubmit={handleSubmit}
                    />
                  )}
                </Footer>
              </>
            )}
          />
        </div>
      </Modal>
    );
  },
);

const Header = manageSessionsPane.header('div');
const Footer = manageSessionsPane.footer('div');
