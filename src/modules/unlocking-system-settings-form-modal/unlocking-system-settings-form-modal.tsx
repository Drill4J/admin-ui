import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Popup, NegativeActionButton } from '@drill4j/ui-kit';

import styles from './unlocking-system-settings-form-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  setUnlocked: (value: boolean) => void;
}

const unlockingSystemSettingsFormModal = BEM(styles);

export const UnlockingSystemSettingsFormModal = unlockingSystemSettingsFormModal(
  ({
    className, isOpen, onToggle, setUnlocked,
  }: Props) => (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header="Unlocking Secured Field"
      type="error"
      closeOnFadeClick
    >
      <div className={className}>
        <Content>
          <Message>
            Please be aware that any change to the package list will result in a
            <strong> complete loss of gathered data </strong>
            in plugins that have been using these packages.
          </Message>
          <ActionsPanel>
            <NegativeActionButton
              size="large"
              onClick={() => {
                setUnlocked(true);
                onToggle(false);
              }}
            >
              Unlock and Proceed
            </NegativeActionButton>
            <Button type="secondary" size="large" onClick={() => onToggle(false)}>
              Cancel
            </Button>
          </ActionsPanel>
        </Content>
      </div>
    </Popup>
  ),
);

const Content = unlockingSystemSettingsFormModal.content('div');
const Message = unlockingSystemSettingsFormModal.message('span');
const ActionsPanel = unlockingSystemSettingsFormModal.actionsPanel('div');
