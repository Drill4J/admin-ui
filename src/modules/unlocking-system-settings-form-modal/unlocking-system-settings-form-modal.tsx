/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
