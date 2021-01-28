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
import {
  Button, Popup, OverflowText, GeneralAlerts, LinkButton, Spinner,
} from '@drill4j/ui-kit';

import { useActiveSessions } from 'modules';
import { NotificationManagerContext } from 'notification-manager';
import { finishAllScopes } from './finish-all-scopes';

import styles from './finish-all-scopes-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  setIsSessionsManagementModalOpen: (value: boolean) => void;
  serviceGroupId: string;
  pluginId: string;
  agentsCount: number;
}

const finishAllScopesModal = BEM(styles);

export const FinishAllScopesModal = finishAllScopesModal(
  ({
    className, isOpen, onToggle, setIsSessionsManagementModalOpen, serviceGroupId, agentsCount, pluginId,
  }: Props) => {
    const { showMessage } = useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = useState('');
    const activeSessions = useActiveSessions('ServiceGroup', serviceGroupId) || [];
    const [loading, setLoading] = useState(false);

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<OverflowText>Finish All Scopes</OverflowText>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
          )}
          {activeSessions.length > 0 && (
            <GeneralAlerts type="WARNING">
              <div>
                At least one active session has been detected.<br />
                First, you need to finish it in&nbsp;
                <ManagementSessionsButton onClick={() => { setIsSessionsManagementModalOpen(true); onToggle(false); }}>
                  Sessions Management
                </ManagementSessionsButton>
              </div>
            </GeneralAlerts>
          )}
          <Content>
            <span>
              You are about to finish active scopes of all
              {` ${agentsCount} `}
              service group agents.
            </span>
            <Instructions>
              <div>All gathered data will be added to build stats</div>
              <div>Empty scopes will be deleted</div>
              <div>New scopes will be started automatically</div>
            </Instructions>
            <div className="d-flex align-items-center w-100 mt-6">
              <FinishScopeButton
                className="d-flex align-items-center gx-1"
                type="primary"
                disabled={activeSessions.length > 0}
                onClick={async () => {
                  setLoading(true);
                  await finishAllScopes(serviceGroupId, pluginId, {
                    onSuccess: () => {
                      showMessage({
                        type: 'SUCCESS',
                        text: 'All scopes have been successfully finished',
                      });
                      onToggle(false);
                    },
                    onError: setErrorMessage,
                  })({ prevScopeEnabled: true, savePrevScope: true });
                  setLoading(false);
                }}
              >
                {loading && <Spinner disabled />} Finish all scopes
              </FinishScopeButton>
              <Button type="secondary" size="large" onClick={() => onToggle(false)}>
                Cancel
              </Button>
            </div>
          </Content>
        </div>
      </Popup>
    );
  },
);

const Content = finishAllScopesModal.content('div');
const Instructions = finishAllScopesModal.instructions('div');
const FinishScopeButton = finishAllScopesModal.finishScopeButton(Button);
const ManagementSessionsButton = finishAllScopesModal.managementSessionsButton(LinkButton);
