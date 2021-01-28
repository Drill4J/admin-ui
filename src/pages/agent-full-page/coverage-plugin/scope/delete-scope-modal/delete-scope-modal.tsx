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
import { useHistory, useParams } from 'react-router-dom';
import {
  Button, Popup, OverflowText, GeneralAlerts, Spinner,
} from '@drill4j/ui-kit';

import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { deleteScope } from '../../api';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../../store';

import styles from './delete-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

const deleteScopeModal = BEM(styles);

export const DeleteScopeModal = deleteScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { agentId, buildVersion } = usePluginState();
    const { pluginId = '' } = useParams<{ pluginId: string }>();
    const { push, location: { pathname = '' } } = useHistory();
    const { showMessage } = useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Header>{`Delete Scope ${scope?.name}`}</Header>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
          )}
          {scope && scope.active && (
            <ActiveSessionsPanel>
              If you delete the scope now, these sessions will not be saved.
            </ActiveSessionsPanel>
          )}
          <Content>
            <Message>
              {`You are about to ${
                scope && scope.active ? 'delete an active scope' : 'delete a non-empty scope'
              }. Are you sure you want to proceed? All scope
              data will be lost.`}
            </Message>
            <div className="d-flex align-items-center w-100 mt-6">
              <DeleteScopeButton
                className="d-flex align-items-center gx-1"
                type="primary"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await deleteScope(agentId, pluginId, {
                    onSuccess: () => {
                      showMessage({ type: 'SUCCESS', text: 'Scope has been deleted' });
                      onToggle(false);
                      scope?.id && pathname.includes(scope.id)
                        && push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`);
                    },
                    onError: setErrorMessage,
                  })(scope as ActiveScope);
                  setLoading(false);
                }}
                data-test="delete-scope-modal:confirm-delete-button"
              >
                {loading && <Spinner disabled />} Yes, Delete Scope
              </DeleteScopeButton>
              <Button
                type="secondary"
                size="large"
                onClick={() => onToggle(false)}
                data-test="delete-scope-modal:cancel-modal-button"
              >
                Cancel
              </Button>
            </div>
          </Content>
        </div>
      </Popup>
    );
  },
);

const Header = deleteScopeModal.header(OverflowText);
const Content = deleteScopeModal.content('div');
const Message = deleteScopeModal.message('div');
const DeleteScopeButton = deleteScopeModal.deleteScopeButton(Button);
