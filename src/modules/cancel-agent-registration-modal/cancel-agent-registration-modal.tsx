import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import { Button, Popup } from '@drill4j/ui-kit';

import styles from './cancel-agent-registration-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  header: React.ReactNode;
  message: React.ReactNode;
}

const cancelAgentRegistrationModal = BEM(styles);

export const CancelAgentRegistrationModal =
  cancelAgentRegistrationModal(({
    className, isOpen, onToggle, header, message,
  }: Props) => {
    const { push } = useHistory();
    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={header}
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Message>
              {message}
            </Message>
            <ActionsPanel>
              <Button type="primary" size="large" onClick={() => push('/agents')}>
                Abort
              </Button>
              <Button type="secondary" size="large" onClick={() => onToggle(false)}>
                Cancel
              </Button>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  });

const Content = cancelAgentRegistrationModal.content('div');
const Message = cancelAgentRegistrationModal.message('span');
const ActionsPanel = cancelAgentRegistrationModal.actionsPanel('div');
