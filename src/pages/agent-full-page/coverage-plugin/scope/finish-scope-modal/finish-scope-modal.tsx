import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Button, Inputs, Popup, OverflowText, GeneralAlerts,
} from '@drill4j/ui-kit';

import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { finishScope } from '../../api';
import { ScopeSummary } from './scope-summary';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../../store';

import styles from './finish-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

const finishScopeModal = BEM(styles);

export const FinishScopeModal = finishScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const { agentId, buildVersion } = usePluginState();
    const [errorMessage, setErrorMessage] = React.useState('');
    const [ignoreScope, setIgnoreScope] = React.useState(false);

    const testsCount = scope
      ? (scope.coverage.byTestType || []).reduce((acc, { summary: { testCount = 0 } }) => acc + testCount, 0)
      : 0;
    const { pluginId = '' } = useParams<{ pluginId: string }>();
    const { push, location: { pathname = '' } } = useHistory();

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<OverflowText>{`Finish Scope ${scope && scope.name}`}</OverflowText>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
          )}
          <ActiveSessionsPanel />
          {!testsCount && (
            <GeneralAlerts type="WARNING">
              Scope is empty and will be deleted after finishing.
            </GeneralAlerts>
          )}
          <Content>
            <ScopeSummary scope={scope as ActiveScope} testsCount={testsCount} />
            <IgnoreScope
              checked={ignoreScope}
              onChange={() => setIgnoreScope(!ignoreScope)}
              label="Ignore scope in build stats"
              disabled={!testsCount}
            />
            <ActionsPanel>
              <Button
                type="primary"
                size="large"
                onClick={async () => {
                  await finishScope(agentId, pluginId, {
                    onSuccess: () => {
                      showMessage({ type: 'SUCCESS', text: 'Scope has been finished' });
                      onToggle(false);
                    },
                    onError: setErrorMessage,
                  })({ prevScopeEnabled: !ignoreScope, savePrevScope: true });
                  !testsCount && scope?.id && pathname.includes(scope.id)
                    && push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`);
                }}
              >
                {testsCount ? 'Finish Scope' : 'Finish and Delete'}
              </Button>
              <Button type="secondary" size="large" onClick={() => onToggle(false)}>
                Cancel
              </Button>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  },
);

const Content = finishScopeModal.content('div');
const IgnoreScope = finishScopeModal.ignoreScope(Inputs.Checkbox);
const ActionsPanel = finishScopeModal.actionsPanel(Panel);
