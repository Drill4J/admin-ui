import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import { Button, Popup } from '@drill4j/ui-kit';

import styles from './cancel-agent-registration-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const cancelAgentRegistrationModal = BEM(styles);

export const CancelAgentRegistrationModal =
  cancelAgentRegistrationModal(({
    className, isOpen, onToggle,
  }: Props) => {
    const { push } = useHistory();
    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header="Abort Registration"
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Message>
              Are you sure you want to abort agent registration? All your progress will be lost.
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
