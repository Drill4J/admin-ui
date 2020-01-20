import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { Button, CancelButton } from 'forms';
import { Popup, Icons } from 'components';

import styles from './cancel-agent-registration-modal.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const cancelAgentRegistrationModal = BEM(styles);

export const CancelAgentRegistrationModal = withRouter(
  cancelAgentRegistrationModal(({
    className, isOpen, onToggle, history: { push },
  }: Props) => (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={(
        <Panel>
          <HeaderIcon>
            <Icons.Warning height={20} width={20} />
          </HeaderIcon>
            &nbsp; Cancel agent registration
        </Panel>
      )}
      type="error"
      closeOnFadeClick
    >
      <div className={className}>
        <Content>
          <Message>
              Are you sure you want to cancel agent registration? All your progress will be lost.
          </Message>
          <ActionsPanel>
            <AcceptButton type="primary" onClick={() => push('/agents')}>
                Yes, cancel registration
            </AcceptButton>
            <CancelButton size="large" onClick={() => onToggle(false)}>
                Cancel
            </CancelButton>
          </ActionsPanel>
        </Content>
      </div>
    </Popup>
  )),
);

const HeaderIcon = cancelAgentRegistrationModal.headerIcon('div');
const Content = cancelAgentRegistrationModal.content('div');
const Message = cancelAgentRegistrationModal.message('span');
const ActionsPanel = cancelAgentRegistrationModal.actionsPanel(Panel);
const AcceptButton = cancelAgentRegistrationModal.acceptButton(Button);
