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
