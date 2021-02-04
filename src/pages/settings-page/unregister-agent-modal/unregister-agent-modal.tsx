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
import { useContext, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Popup, Button, GeneralAlerts, Spinner,
} from '@drill4j/ui-kit';

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
  const { showMessage } = useContext(NotificationManagerContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { push } = useHistory();

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header="Unregister the Agent"
      closeOnFadeClick
    >
      <div className={className}>
        {errorMessage && (
          <GeneralAlerts type="ERROR">
            {errorMessage}
          </GeneralAlerts>
        )}
        <Content>
          <Notification>
            Are you sure you want to unregister the agent? All gathered data and settings will be
            lost.
          </Notification>
          <div className="flex gx-4 mt-6">
            <Button
              className="flex items-center gx-1"
              type="primary"
              size="large"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  await axios.delete(`/agents/${agentId}`);
                  showMessage({ type: 'SUCCESS', text: 'Agent has been deactivated' });
                  push('/agents');
                } catch ({ response: { data: { message } = {} } = {} }) {
                  setErrorMessage(message || 'Internal service error');
                }
                setLoading(false);
              }}
            >
              {loading && <Spinner disabled />}  Unregister
            </Button>
            <Button type="secondary" size="large" onClick={() => onToggle(false)}>
              Cancel
            </Button>
          </div>
        </Content>
      </div>
    </Popup>
  );
});

const Content = unregisterAgentModal.content('div');
const Notification = unregisterAgentModal.notification('div');
