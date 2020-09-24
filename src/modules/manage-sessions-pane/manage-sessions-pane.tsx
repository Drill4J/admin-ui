import * as React from 'react';
import { Form } from 'react-final-form';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Modal, Button, Icons, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  composeValidators,
  sizeLimit,
  required,
} from 'forms';
import { useGeneralAlertMessage } from 'hooks';
import { useParams } from 'react-router-dom';
import { ManageActiveSessions } from './manage-active-sessions';
import { ManageNewSession } from './manage-new-session';
import { useActiveSessions } from './use-active-sessions';
import { startServiceGroupSessions, startAgentSession } from './manage-sessions-pane-api';

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
    const [isNewSession, setIsNewSession] = React.useState(false);
    const { generalAlertMessage, showGeneralAlertMessage } = useGeneralAlertMessage();
    const {
      agentId = '', serviceGroupId = '', pluginId = '', buildVersion = '',
    } = useParams<{ agentId: string; serviceGroupId: string; pluginId: string; buildVersion: string}>();
    const agentType = serviceGroupId ? 'ServiceGroup' : 'Agent';
    const id = agentId || serviceGroupId;
    const activeSessions = useActiveSessions(agentType, id, buildVersion) || [];
    return (
      <Modal
        isOpen={isOpen}
        onToggle={onToggle}
      >
        <div className={className}>
          <Form
            onSubmit={(values: { sessionId: string; }) => (agentId
              ? startAgentSession(agentId, pluginId, showGeneralAlertMessage)(values)
              : startServiceGroupSessions(serviceGroupId, pluginId, showGeneralAlertMessage)(values))}
            validate={validateManageSessionsPane as any}
            render={({ invalid, handleSubmit, form }) => (
              <>
                <Header data-test="manage-sessions-pane:header">
                  {isNewSession ? 'Start New Session' : 'Manage Sessions' }
                </Header>
                {generalAlertMessage?.type && (
                  <GeneralAlerts type={generalAlertMessage.type}>
                    {generalAlertMessage.text}
                  </GeneralAlerts>
                )}
                {isNewSession
                  ? <ManageNewSession agentId={agentId} serviceGroupId={serviceGroupId} />
                  : (
                    <ManageActiveSessions
                      agentType={agentType}
                      activeSessions={activeSessions}
                      showGeneralAlertMessage={showGeneralAlertMessage}
                    />
                  )}
                <ActionsPanel>
                  {isNewSession ? (
                    <Button
                      type="primary"
                      size="large"
                      disabled={invalid}
                      onClick={() => { handleSubmit(); form.change('sessionId', ''); setIsNewSession(false); }}
                      data-test="manage-sessions-pane:start-session-button"
                    >
                      Start Session
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => setIsNewSession(true)}
                      data-test="manage-sessions-pane:start-new-session-button"
                    >
                      Start New Session
                    </Button>
                  )}
                  {activeSessions.length > 0 && isNewSession && (
                    <Button
                      type="secondary"
                      size="large"
                      onClick={() => setIsNewSession(false)}
                      data-test="manage-sessions-pane:back-button"
                    >
                      <Icons.Expander width={8} height={14} rotate={180} />
                      <span>Back</span>
                    </Button>
                  )}
                  <Button
                    type="secondary"
                    size="large"
                    onClick={() => onToggle(false)}
                    data-test="manage-sessions-pane:cancel-button"
                  >
                    Cancel
                  </Button>
                </ActionsPanel>
              </>
            )}
          />
        </div>
      </Modal>
    );
  },
);

const Header = manageSessionsPane.header('div');
const ActionsPanel = manageSessionsPane.actionsPanel('div');
