import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { Panel } from 'layouts';
import { Popup, Icons } from 'components';
import { Button } from 'forms';
import { NotificationManagerContext } from 'notification-manager';
import { Message } from 'types/message';

import styles from './unregister-agent-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
}

const unregisterAgentModal = BEM(styles);

export const UnregisterAgentModal = unregisterAgentModal(
  ({ className, isOpen, onToggle, agentId }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={
          <Panel>
            <HeaderIcon height={20} width={20} />
            Unregister the agent
          </Panel>
        }
        type="error"
        closeOnFadeClick={true}
      >
        <div className={className}>
          {errorMessage && (
            <ErrorMessage>
              <ErrorMessageIcon />
              {errorMessage}
            </ErrorMessage>
          )}
          <Content>
            <Notification>
              Are you sure you want to unregister the agent? All gathered data and settings will be
              lost.
            </Notification>
            <Panel>
              <UnregisterButton
                type="primary"
                onClick={() => unregisterAgent(agentId, onToggle, showMessage, setErrorMessage)}
              >
                Yes, unregister this agent
              </UnregisterButton>
              <CancelButton type="secondary" onClick={() => onToggle(false)}>
                Cancel
              </CancelButton>
            </Panel>
          </Content>
        </div>
      </Popup>
    );
  },
);

const HeaderIcon = unregisterAgentModal.headerIcon(Icons.Warning);
const ErrorMessage = unregisterAgentModal.errorMessage(Panel);
const ErrorMessageIcon = unregisterAgentModal.errorMessageIcon(Icons.Warning);
const Content = unregisterAgentModal.content('div');
const Notification = unregisterAgentModal.notification('div');
const UnregisterButton = unregisterAgentModal.unregisterButton(Button);
const CancelButton = unregisterAgentModal.cancelButton(Button);

async function unregisterAgent(
  agentId: string,
  closeModal: (value: boolean) => void,
  showMessage: (message: Message) => void,
  setErrorMessage: (error: string) => void,
) {
  try {
    await axios.post(`/agents/${agentId}/unregister`);
    showMessage({ type: 'SUCCESS', text: 'Agent has been deactivated' });
    closeModal(false);
  } catch ({ response: { data: { message } = {} } = {} }) {
    setErrorMessage(message);
  }
}
