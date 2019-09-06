import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { Popup, Icons, OverflowText } from '../../../../../components';
import { NotificationManagerContext } from '../../../../../notification-manager';
import { deleteScope } from '../../api';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../store';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './delete-scope-modal.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ScopeSummary | null;
}

const deleteScopeModal = BEM(styles);

export const DeleteScopeModal = withRouter(
  deleteScopeModal(
    ({ className, isOpen, onToggle, scope, location: { pathname }, history }: Props) => {
      const { agentId } = usePluginState();
      const { showMessage } = React.useContext(NotificationManagerContext);
      const [errorMessage, setErrorMessage] = React.useState('');

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
          header={
            <OverflowText>{`${testsCount ? 'Delete' : 'Cancel'} scope ${scope &&
              scope.name}`}</OverflowText>
          }
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
            {scope && scope.active && <ActiveSessionsPanel />}
            <Content>
              <Message>
                {`You are about to ${
                  scope && scope.active ? 'cancel an active scope' : 'delete a non-empty scope'
                }. Are you sure you want to proceed? All scope
              data will be lost.`}
              </Message>
              <ActionsPanel>
                <DeleteScopeButton
                  type="primary"
                  onClick={async () => {
                    await deleteScope(agentId, {
                      onSuccess: () => {
                        showMessage({ type: 'SUCCESS', text: 'Scope has been deleted' });
                        onToggle(false);
                        scopeId && history.goBack();
                      },
                      onError: setErrorMessage,
                    })(scope as ScopeSummary);
                  }}
                >
                  {scope && scope.active ? 'Yes, Cancel Scope' : 'Yes, Delete Scope'}
                </DeleteScopeButton>
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

const ErrorMessage = deleteScopeModal.errorMessage(Panel);
const ErrorMessageIcon = deleteScopeModal.errorMessageIcon(Icons.Warning);
const Content = deleteScopeModal.content('div');
const Message = deleteScopeModal.message('div');
const ActionsPanel = deleteScopeModal.actionsPanel(Panel);
const DeleteScopeButton = deleteScopeModal.deleteScopeButton(Button);
const CancelButton = deleteScopeModal.cancelButton(Button);
