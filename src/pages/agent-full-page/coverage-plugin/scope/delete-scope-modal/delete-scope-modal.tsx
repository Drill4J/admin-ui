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
import { usePluginState } from '../../../store';
import { openModal, useCoveragePluginDispatch, useCoveragePluginState } from '../../store';

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
    const { activeSessions: { testTypes = [] } } = useCoveragePluginState();
    const dispatch = useCoveragePluginDispatch();

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
          <div className="mt-4 mx-6 mb-6">
            <div className="fs-14 lh-20">
              {scope && scope.active && !testTypes.length && (
                <span>You are about to delete an active scope. Are you sure you <br />
                  want to proceed? All scope data will be lost.
                </span>
              )}
              {scope && scope.active && Boolean(testTypes.length) && (
                <span>You are about to delete an active scope, but at least one active<br />
                  session has been detected. First, you need to finish it in <br />
                  <SessionManagementLink
                    className=""
                    onClick={() => dispatch(openModal('SessionsManagementModal', null))}
                  >
                    Sessions Management
                  </SessionManagementLink>
                </span>
              )}
              { scope && !scope.active && (
                <span>You are about to delete a non-empty scope. Are you sure you want<br />
                  to proceed? All scope data will be lost.
                </span>
              )}
            </div>
            <div className="d-flex align-items-center gx-4 w-100 mt-6">
              {scope && scope.active && Boolean(testTypes.length)
                ? (
                  <Button
                    onClick={() => onToggle(false)}
                    type="secondary"
                    size="large"
                  >
                    Ok, got it
                  </Button>
                )
                : (
                  <>
                    <DeleteScopeButton
                      className="d-flex align-items-center gx-1 px-4"
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
                  </>
                )}
            </div>
          </div>
        </div>
      </Popup>
    );
  },
);

const Header = deleteScopeModal.header(OverflowText);
const SessionManagementLink = deleteScopeModal.sessionManagementLink('span');
const DeleteScopeButton = deleteScopeModal.deleteScopeButton(Button);
