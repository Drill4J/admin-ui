import * as React from 'react';
import { Form } from 'react-final-form';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Modal, GeneralAlerts,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import {
  composeValidators,
  sizeLimit,
  required,
  handleFieldErrors,
} from 'forms';
import { useGeneralAlertMessage } from 'hooks';
import { ManageNewSession } from './manage-new-session';
import { useActiveSessions } from './use-active-sessions';
import {
  startServiceGroupSessions, startAgentSession,
} from './manage-sessions-pane-api';
import { ManageActiveSessions } from './manage-active-sessions';
import { EmptyActiveSessionsStub } from './active-sessions-list/empty-active-sessions-stub';
import { ActiveSessionsList } from './active-sessions-list';
import { BulkOperationWarning } from './bulk-operation-warning';
import { ActionsPanel } from './actions-panel';
import { setIsNewSession, useSessionsPaneDispatch, useSessionsPaneState } from './store';

import styles from './manage-sessions-pane.module.scss';

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

export const ManageSessionsPane = manageSessionsPane(
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
            onSubmit={async (values: { sessionId: string; }, form): Promise<unknown> => {
              try {
                const response = await (agentId
                  ? startAgentSession(agentId, pluginId)(values)
                  : startServiceGroupSessions(serviceGroupId, pluginId)(values));
                showGeneralAlertMessage({ type: 'SUCCESS', text: 'New session has been started successfully.' });
                form.change('sessionId', '');
                dispatch(setIsNewSession(false));
                return response;
              } catch (error) {
                if (error?.response?.data?.code === 409) {
                  const { data: { fieldErrors = [] } = {} } = error?.response?.data || {};
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
                <Header data-test="manage-sessions-pane:header">
                  {isNewSession ? 'Start New Session' : 'Manage Sessions'}
                </Header>
                {generalAlertMessage?.type && (
                  <GeneralAlerts type={generalAlertMessage.type}>
                    {generalAlertMessage.text}
                  </GeneralAlerts>
                )}
                {isNewSession && <ManageNewSession agentId={agentId} serviceGroupId={serviceGroupId} />}
                {!isNewSession && activeSessions.length > 0 ? (
                  <>
                    <ManageActiveSessions activeSessions={activeSessions} />
                    <ActiveSessionsList
                      agentType={agentType}
                      activeSessions={activeSessions}
                      showGeneralAlertMessage={showGeneralAlertMessage}
                    />
                  </>
                ) : <EmptyActiveSessionsStub />}
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
