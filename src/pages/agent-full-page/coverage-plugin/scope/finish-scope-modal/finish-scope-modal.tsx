import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';

import { Panel } from 'layouts';
import { Button, Inputs, CancelButton } from 'forms';
import { Popup, Icons, OverflowText } from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary as ScopeSummaryType } from 'types/scope-summary';
import { finishScope } from '../../api';
import { ScopeSummary } from './scope-summary';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../../store';

import styles from './finish-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ScopeSummaryType | null;
}

const finishScopeModal = BEM(styles);

export const FinishScopeModal = finishScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const {
      agentId,
      buildVersion: { id: buildVersion },
    } = usePluginState();
    const [errorMessage, setErrorMessage] = React.useState('');
    const [ignoreScope, setIgnoreScope] = React.useState(false);

    const testsCount = scope
      ? Object.values(scope.coveragesByType).reduce((acc, { testCount }) => acc + testCount, 0)
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
            <ScopeSummary scope={scope} testsCount={testsCount} />
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
