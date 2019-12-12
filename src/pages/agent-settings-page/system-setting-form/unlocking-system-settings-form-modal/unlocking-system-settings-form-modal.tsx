import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Button } from 'forms';
import { Popup, Icons } from 'components';

import styles from './unlocking-system-settings-form-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  setUnlocked: (value: boolean) => void;
}

const unlockingSystemSettingsFormModal = BEM(styles);

export const UnlockingSystemSettingsFormModal = unlockingSystemSettingsFormModal(
  ({ className, isOpen, onToggle, setUnlocked }: Props) => {
    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={
          <Panel>
            <HeaderIcon>
              <Icons.Warning />
            </HeaderIcon>
            &nbsp; Unlocking secured field
          </Panel>
        }
        type="error"
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Message>
              Please be aware that any change to the package list will result in a
              <strong> complete loss of gathered data</strong> in plugins that have been using these
              packages.
            </Message>
            <ActionsPanel>
              <AcceptButton
                type="secondary"
                onClick={() => {
                  setUnlocked(true);
                  onToggle(false);
                }}
              >
                Unlock and proceed
              </AcceptButton>
              <CancelButton type="primary" onClick={() => onToggle(false)}>
                Cancel
              </CancelButton>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  },
);

const HeaderIcon = unlockingSystemSettingsFormModal.headerIcon('div');
const Content = unlockingSystemSettingsFormModal.content('div');
const Message = unlockingSystemSettingsFormModal.message('span');
const ActionsPanel = unlockingSystemSettingsFormModal.actionsPanel(Panel);
const AcceptButton = unlockingSystemSettingsFormModal.acceptButton(Button);
const CancelButton = unlockingSystemSettingsFormModal.cancelButton(Button);
