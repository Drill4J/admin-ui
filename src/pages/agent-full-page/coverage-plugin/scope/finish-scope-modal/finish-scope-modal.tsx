import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Button, Inputs } from '../../../../../forms';
import { Popup, Icons, OverflowText } from '../../../../../components';
import { NotificationManagerContext } from '../../../../../notification-manager';
import { finishScope } from '../../api';
import { ScopeSummary } from './scope-summary';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../store';
import { ScopeSummary as ScopeSummaryType } from '../../../../../types/scope-summary';

import styles from './finish-scope-modal.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ScopeSummaryType | null;
}

const finishScopeModal = BEM(styles);

export const FinishScopeModal = withRouter(
  finishScopeModal(
    ({ className, isOpen, onToggle, scope, history, location: { pathname } }: Props) => {
      const { showMessage } = React.useContext(NotificationManagerContext);
      const { agentId } = usePluginState();
      const [errorMessage, setErrorMessage] = React.useState('');
      const [ignoreScope, setIgnoreScope] = React.useState(false);

      const testsCount = scope
        ? Object.values(scope.coveragesByType).reduce((acc, { testCount }) => acc + testCount, 0)
        : 0;
      const { params: { scopeId = '' } = {} } =
        matchPath<{ scopeId: string }>(pathname, {
          path: '/:page/:agentId/:pluginId/:tab/:scopeId',
        }) || {};

      return (
        <Popup
          isOpen={isOpen}
          onToggle={onToggle}
          header={<OverflowText>{`Finish scope ${scope && scope.name}`}</OverflowText>}
          type="info"
          closeOnFadeClick={true}
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
              <IgnoreScope>
                <Inputs.Checkbox
                  selected={ignoreScope}
                  onClick={() => setIgnoreScope(!ignoreScope)}
                  label="Ignore scope in build stats"
                  withoutMargin
                  disabled={!Boolean(testsCount)}
                />
              </IgnoreScope>
              <ActionsPanel>
                <FinishScopeButton
                  type="primary"
                  onClick={async () => {
                    await finishScope(agentId, {
                      onSuccess: () => {
                        showMessage({ type: 'SUCCESS', text: 'Scope is finished' });
                        onToggle(false);
                      },
                      onError: setErrorMessage,
                    })({ prevScopeEnabled: !ignoreScope, savePrevScope: true });
                    !testsCount && scopeId && history.goBack();
                  }}
                >
                  {testsCount ? 'Finish Scope' : 'Finish and Delete'}
                </FinishScopeButton>
                <CancelButton type="secondary" onClick={() => onToggle(false)}>
                  Cancel
                </CancelButton>
              </ActionsPanel>
            </Content>
          </div>
        </Popup>
      );
    },
  ),
);

const ErrorMessage = finishScopeModal.errorMessage(Panel);
const ErrorMessageIcon = finishScopeModal.errorMessageIcon(Icons.Warning);
const EmptyScopeWarning = finishScopeModal.emptyScopeWarning(Panel);
const EmptyScopeWarningIcon = finishScopeModal.emptyScopeWarningIcon(Icons.Warning);
const Content = finishScopeModal.content('div');
const IgnoreScope = finishScopeModal.ignoreScope('div');
const ActionsPanel = finishScopeModal.actionsPanel(Panel);
const FinishScopeButton = finishScopeModal.finishScopeButton(Button);
const CancelButton = finishScopeModal.cancelButton(Button);
