import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';
import {
  Panel, Button, Popup, OverflowText, GeneralAlerts,
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
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

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
            <ActionsPanel>
              <DeleteScopeButton
                type="primary"
                onClick={async () => {
                  await deleteScope(agentId, pluginId, {
                    onSuccess: () => {
                      showMessage({ type: 'SUCCESS', text: 'Scope has been deleted' });
                      onToggle(false);
                      scope?.id && pathname.includes(scope.id)
                        && push(`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`);
                    },
                    onError: setErrorMessage,
                  })(scope as ActiveScope);
                }}
                data-test="delete-scope-modal:confirm-delete-button"
              >
                Yes, Delete Scope
              </DeleteScopeButton>
              <Button
                type="secondary"
                size="large"
                onClick={() => onToggle(false)}
                data-test="delete-scope-modal:cancel-modal-button"
              >
                Cancel
              </Button>
            </ActionsPanel>
          </Content>
        </div>
      </Popup>
    );
  },
);

const Header = deleteScopeModal.header(OverflowText);
const Content = deleteScopeModal.content('div');
const Message = deleteScopeModal.message('div');
const ActionsPanel = deleteScopeModal.actionsPanel(Panel);
const DeleteScopeButton = deleteScopeModal.deleteScopeButton(Button);
