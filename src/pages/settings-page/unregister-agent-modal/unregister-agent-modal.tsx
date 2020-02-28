import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Panel } from 'layouts';
import { Popup, Icons } from 'components';
import { Button, CancelButton } from 'forms';
import { NotificationManagerContext } from 'notification-manager';

import styles from './unregister-agent-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
}

const unregisterAgentModal = BEM(styles);

export const UnregisterAgentModal = unregisterAgentModal(({
  className, isOpen, onToggle, agentId,
}: Props) => {
  const { showMessage } = React.useContext(NotificationManagerContext);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { push } = useHistory();

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={(
        <Panel>
          <HeaderIcon height={20} width={20} />
            Unregister the agent
        </Panel>
      )}
      type="error"
      closeOnFadeClick
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
              onClick={() => unregisterAgent(agentId, {
                onSuccess: () => {
                  showMessage({ type: 'SUCCESS', text: 'Agent has been deactivated' });
                  push('/agents');
                },
                onError: setErrorMessage,
              })}
            >
                Yes, unregister this agent
            </UnregisterButton>
            <CancelButton size="large" onClick={() => onToggle(false)}>
                Cancel
            </CancelButton>
          </Panel>
        </Content>
      </div>
    </Popup>
  );
});

const HeaderIcon = unregisterAgentModal.headerIcon(Icons.Warning);
const ErrorMessage = unregisterAgentModal.errorMessage(Panel);
const ErrorMessageIcon = unregisterAgentModal.errorMessageIcon(Icons.Warning);
const Content = unregisterAgentModal.content('div');
const Notification = unregisterAgentModal.notification('div');
const UnregisterButton = unregisterAgentModal.unregisterButton(Button);

async function unregisterAgent(
  agentId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (error: string) => void },
) {
  try {
    await axios.delete(`/agents/${agentId}`);
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'Internal service error');
  }
}
