import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import {
  Panel, Button, CancelButton, Popup, Icons,
} from '@drill4j/ui-kit';

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
        header={(
          <Panel>
            <HeaderIcon>
              <Icons.Warning height={20} width={20} />
            </HeaderIcon>
            &nbsp; Cancel registration
          </Panel>
        )}
        type="error"
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Message>
              Are you sure you want to cancel registration? All your progress will be lost.
            </Message>
            <ActionsPanel>
              <AcceptButton type="primary" onClick={() => push('/agents')}>
                Yes, cancel registration
              </AcceptButton>
              <CancelButton size="large" onClick={() => onToggle(false)}>
                No, take me back
              </CancelButton>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  });

const HeaderIcon = cancelAgentRegistrationModal.headerIcon('div');
const Content = cancelAgentRegistrationModal.content('div');
const Message = cancelAgentRegistrationModal.message('span');
const ActionsPanel = cancelAgentRegistrationModal.actionsPanel(Panel);
const AcceptButton = cancelAgentRegistrationModal.acceptButton(Button);
