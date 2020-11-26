import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Panel, Button, Popup, OverflowText, GeneralAlerts, LinkButton,
} from '@drill4j/ui-kit';

import { useActiveSessions } from 'modules';
import { NotificationManagerContext } from 'notification-manager';
import { finishAllScopes } from './finish-all-scopes';

import styles from './finish-all-scopes-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  setIsSessionsManagementModalOpen: (value: boolean) => void;
  serviceGroupId: string;
  pluginId: string;
  agentsCount: number;
}

const finishAllScopesModal = BEM(styles);

export const FinishAllScopesModal = finishAllScopesModal(
  ({
    className, isOpen, onToggle, setIsSessionsManagementModalOpen, serviceGroupId, agentsCount, pluginId,
  }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');
    const activeSessions = useActiveSessions('ServiceGroup', serviceGroupId) || [];

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<OverflowText>Finish All Scopes</OverflowText>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
          )}
          {activeSessions.length > 0 && (
            <GeneralAlerts type="WARNING">
              <div>
                At least one active session has been detected.<br />
                First, you need to finish it in&nbsp;
                <ManagementSessionsButton onClick={() => { setIsSessionsManagementModalOpen(true); onToggle(false); }}>
                  Sessions Management
                </ManagementSessionsButton>
              </div>
            </GeneralAlerts>
          )}
          <Content>
            <span>
              You are about to finish active scopes of all
              {` ${agentsCount} `}
              service group agents.
            </span>
            <Instructions>
              <div>All gathered data will be added to build stats</div>
              <div>Empty scopes will be deleted</div>
              <div>New scopes will be started automatically</div>
            </Instructions>
            <ActionsPanel>
              <FinishScopeButton
                type="primary"
                disabled={activeSessions.length > 0}
                onClick={async () => {
                  await finishAllScopes(serviceGroupId, pluginId, {
                    onSuccess: () => {
                      showMessage({
                        type: 'SUCCESS',
                        text: 'All scopes have been successfully finished',
                      });
                      onToggle(false);
                    },
                    onError: setErrorMessage,
                  })({ prevScopeEnabled: true, savePrevScope: true });
                }}
              >
                Finish all scopes
              </FinishScopeButton>
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

const Content = finishAllScopesModal.content('div');
const Instructions = finishAllScopesModal.instructions('div');
const ActionsPanel = finishAllScopesModal.actionsPanel(Panel);
const FinishScopeButton = finishAllScopesModal.finishScopeButton(Button);
const ManagementSessionsButton = finishAllScopesModal.managementSessionsButton(LinkButton);
