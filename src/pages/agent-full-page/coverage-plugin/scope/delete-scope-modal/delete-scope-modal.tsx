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
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Popup, GeneralAlerts, Spinner } from '@drill4j/ui-kit';
import 'twin.macro';

import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { deleteScope } from '../../api';
import { usePluginState } from '../../../store';
import { openModal, useCoveragePluginDispatch, useCoveragePluginState } from '../../store';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

export const DeleteScopeModal = ({ isOpen, onToggle, scope }: Props) => {
  const { agentId, buildVersion } = usePluginState();
  const { pluginId = '' } = useParams<{ pluginId: string }>();
  const {
    push,
    location: { pathname = '' },
  } = useHistory();
  const { showMessage } = useContext(NotificationManagerContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();
  const dispatch = useCoveragePluginDispatch();

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={<div tw="w-97 text-ellipsis">{`Delete Scope ${scope?.name}`}</div>}
      type="info"
      closeOnFadeClick
    >
      <div tw="w-108">
        {errorMessage && <GeneralAlerts type="ERROR">{errorMessage}</GeneralAlerts>}
        <div className="mt-4 mx-6 mb-6">
          <div className="text-14 leading-20">
            {scope && scope.active && !testTypes.length && (
              <span>
                You are about to delete an active scope. Are you sure you <br />
                want to proceed? All scope data will be lost.
              </span>
            )}
            {scope && scope.active && Boolean(testTypes.length) && (
              <span>
                You are about to delete an active scope, but at least one active
                <br />
                session has been detected. First, you need to finish it in <br />
                <Link
                  to={`${pathname}/session-management-pane`}
                  tw="link font-bold text-14"
                  onClick={() => dispatch(openModal(undefined, null))}
                >
                  Sessions Management
                </Link>
              </span>
            )}
            {scope && !scope.active && (
              <span>
                You are about to delete a non-empty scope. Are you sure you want to proceed? All
                scope data will be lost.
              </span>
            )}
          </div>
          <div className="flex items-center gap-x-4 w-full mt-6">
            {scope && scope.active && Boolean(testTypes.length) ? (
              <Button onClick={() => onToggle(false)} secondary size="large">
                Ok, got it
              </Button>
            ) : (
              <>
                <Button
                  className="flex justify-center items-center gap-x-1 px-4 w-43 h-8 text-14"
                  primary
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);
                    await deleteScope(agentId, pluginId, {
                      onSuccess: () => {
                        showMessage({ type: 'SUCCESS', text: 'Scope has been deleted' });
                        onToggle(false);
                        scope?.id &&
                          pathname.includes(scope.id) &&
                          push(
                            `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/methods`,
                          );
                      },
                      onError: setErrorMessage,
                    })(scope as ActiveScope);
                    setLoading(false);
                  }}
                  data-test="delete-scope-modal:confirm-delete-button"
                >
                  {loading ? <Spinner disabled /> : 'Yes, Delete Scope'}
                </Button>
                <Button
                  secondary
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
};
