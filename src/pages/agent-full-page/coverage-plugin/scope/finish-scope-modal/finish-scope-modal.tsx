import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Button, Inputs, CancelButton, Popup, Icons, OverflowText,
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
      ? Object.values(scope.coverage.byTestType || {}).reduce((acc, { testCount }) => acc + testCount, 0)
      : 0;
    const { pluginId = '', scopeId = '' } = useParams();
    const { push } = useHistory();

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<OverflowText>{`Finish scope ${scope && scope.name}`}</OverflowText>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <ErrorMessage>
              <ErrorMessageIcon />
              {errorMessage}
            </ErrorMessage>
          )}
          <ActiveSessionsPanel />
          {!testsCount && (
            <EmptyScopeWarning>
              <EmptyScopeWarningIcon />
              Scope is empty and will be deleted after finishing.
            </EmptyScopeWarning>
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
                  !testsCount
                      && scopeId
                      && push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`);
                }}
              >
                {testsCount ? 'Finish Scope' : 'Finish and Delete'}
              </Button>
              <CancelButton size="large" onClick={() => onToggle(false)}>
                Cancel
              </CancelButton>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  },
);

const ErrorMessage = finishScopeModal.errorMessage(Panel);
const ErrorMessageIcon = finishScopeModal.errorMessageIcon(Icons.Warning);
const EmptyScopeWarning = finishScopeModal.emptyScopeWarning(Panel);
const EmptyScopeWarningIcon = finishScopeModal.emptyScopeWarningIcon(Icons.Warning);
const Content = finishScopeModal.content('div');
const IgnoreScope = finishScopeModal.ignoreScope(Inputs.Checkbox);
const ActionsPanel = finishScopeModal.actionsPanel(Panel);
