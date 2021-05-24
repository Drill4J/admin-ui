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
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Button, Inputs, Popup, OverflowText, GeneralAlerts, Spinner,
} from '@drill4j/ui-kit';
import 'twin.macro';

import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { finishScope } from '../../api';
import { ScopeSummary } from './scope-summary';
import { usePluginState } from '../../../store';
import { openModal, useCoveragePluginDispatch, useCoveragePluginState } from '../../store';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

export const FinishScopeModal = ({ isOpen, onToggle, scope }: Props) => {
  const dispatch = useCoveragePluginDispatch();
  const { showMessage } = useContext(NotificationManagerContext);
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();
  const { agentId, buildVersion } = usePluginState();
  const [errorMessage, setErrorMessage] = useState('');
  const [ignoreScope, setIgnoreScope] = useState(false);
  const [loading, setLoading] = useState(false);
  const testsCount = scope
    ? (scope.coverage.byTestType || []).reduce((acc, { summary: { testCount = 0 } }) => acc + testCount, 0)
    : 0;
  const { pluginId = '' } = useParams<{ pluginId: string }>();
  const { push, location: { pathname = '' } } = useHistory();
  const isScopeInfoPage = scope?.id && pathname.includes(scope.id);

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={(
        <div tw="w-98">
          <OverflowText data-test="finish-scope-modal:header">{`Finish Scope ${scope && scope.name}`}</OverflowText>
        </div>
      )}
      type="info"
      closeOnFadeClick
    >
      <div tw="w-108">
        {errorMessage && (
          <GeneralAlerts type="ERROR">
            {errorMessage}
          </GeneralAlerts>
        )}
        {testTypes.length > 0 && (
          <GeneralAlerts type="WARNING">
            <div>
              At least one active session has been detected.<br />
              First, you need to finish it in&nbsp;
              <Link
                tw="link font-bold text-14"
                to={`${pathname}/session-management-pane`}
                onClick={() => dispatch(openModal())}
              >
                Sessions Management
              </Link>
            </div>
          </GeneralAlerts>
        )}
        {Boolean(!testsCount && !testTypes.length) && (
          <GeneralAlerts type="WARNING">
            Scope is empty and will be deleted after finishing.
          </GeneralAlerts>
        )}
        <div tw="m-6">
          <ScopeSummary scope={scope as ActiveScope} testsCount={testsCount} />
          <Inputs.Checkbox
            tw="mt-6 mb-9"
            checked={ignoreScope}
            onChange={() => setIgnoreScope(!ignoreScope)}
            label="Ignore scope in build stats"
            disabled={!testsCount || testTypes.length > 0}
          />
          <div className="flex items-center gap-x-4 w-full mt-9">
            {!testTypes.length ? (
              <>
                <Button
                  className={`flex justify-center items-center gap-x-1 ${testsCount ? 'w-30' : 'w-40'}`}
                  type="primary"
                  size="large"
                  disabled={testTypes.length > 0 || loading}
                  onClick={async () => {
                    setLoading(true);
                    await finishScope(agentId, pluginId, {
                      onSuccess: () => {
                        showMessage({ type: 'SUCCESS', text: 'Scope has been finished' });
                        onToggle(false);
                      },
                      onError: setErrorMessage,
                    })({ prevScopeEnabled: !ignoreScope, savePrevScope: true });
                    isScopeInfoPage && !scope?.sessionsFinished &&
                        push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/methods`);
                    setLoading(false);
                  }}
                  data-test="finish-scope-modal:finish-scope-button"
                >
                  {loading && <Spinner disabled />}
                  {!loading && Boolean(testsCount) && 'Finish Scope' }
                  {!loading && !testsCount && 'Finish and Delete' }
                </Button>
                <Button
                  type="secondary"
                  size="large"
                  onClick={() => onToggle(false)}
                  data-test="finish-scope-modal:cancel-modal-button"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="secondary"
                size="large"
                onClick={() => onToggle(false)}
                data-test="finish-scope-modal:cancel-modal-button"
              >
                Ok, got it
              </Button>
            )}
          </div>
        </div>
      </div>
    </Popup>
  );
};
