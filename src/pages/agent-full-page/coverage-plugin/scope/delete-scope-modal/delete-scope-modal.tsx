import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';

import { Panel } from 'layouts';
import { Button, CancelButton } from 'forms';
import { Popup, Icons, OverflowText } from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { deleteScope } from '../../api';
import { ActiveSessionsPanel } from '../active-sessions-panel';
import { usePluginState } from '../../../store';

import styles from './delete-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ScopeSummary | null;
}

const deleteScopeModal = BEM(styles);

export const DeleteScopeModal = deleteScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { agentId, buildVersion } = usePluginState();
    const { pluginId = '', scopeId = '' } = useParams();
    const { push } = useHistory();
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    const testsCount = scope
      ? Object.values(scope.coveragesByType).reduce((acc, { testCount }) => acc + testCount, 0)
      : 0;

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={(
          <OverflowText>
            {`${testsCount ? 'Delete' : 'Cancel'} scope ${scope
              && scope.name}`}
          </OverflowText>
        )}
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
                  await deleteScope(agentId, pluginId, {
                    onSuccess: () => {
                      showMessage({ type: 'SUCCESS', text: 'Scope has been deleted' });
                      onToggle(false);
                      scopeId
                          && push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`);
                    },
                    onError: setErrorMessage,
                  })(scope as ScopeSummary);
                }}
              >
                {scope && scope.active ? 'Yes, Cancel Scope' : 'Yes, Delete Scope'}
              </DeleteScopeButton>
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

const ErrorMessage = deleteScopeModal.errorMessage(Panel);
const ErrorMessageIcon = deleteScopeModal.errorMessageIcon(Icons.Warning);
const Content = deleteScopeModal.content('div');
const Message = deleteScopeModal.message('div');
const ActionsPanel = deleteScopeModal.actionsPanel(Panel);
const DeleteScopeButton = deleteScopeModal.deleteScopeButton(Button);
