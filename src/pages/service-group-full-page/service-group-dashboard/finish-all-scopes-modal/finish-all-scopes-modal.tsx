import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Button } from 'forms';
import { Popup, Icons, OverflowText } from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { finishAllScopes } from './finish-all-scopes';

import styles from './finish-all-scopes-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  serviceGroupId: string;
  agentsCount: number;
}

const finishAllScopesModal = BEM(styles);

export const FinishAllScopesModal = finishAllScopesModal(
  ({ className, isOpen, onToggle, serviceGroupId, agentsCount }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<OverflowText>Finish all scopes</OverflowText>}
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
          <Content>
            <span>
              You are about to finish active scopes of all {agentsCount} service group agents.
            </span>
            <Instructions>
              <div>• All gathered data will be added to build stats</div>
              <div>• New scopes will start automatically</div>
            </Instructions>
            <ActionsPanel>
              <FinishScopeButton
                type="primary"
                onClick={async () => {
                  await finishAllScopes(serviceGroupId, {
                    onSuccess: () => {
                      showMessage({ type: 'SUCCESS', text: 'Scope has been finished' });
                      onToggle(false);
                    },
                    onError: setErrorMessage,
                  })({ prevScopeEnabled: true, savePrevScope: true });
                }}
              >
                Finish all scopes
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
);

const ErrorMessage = finishAllScopesModal.errorMessage(Panel);
const ErrorMessageIcon = finishAllScopesModal.errorMessageIcon(Icons.Warning);
const Content = finishAllScopesModal.content('div');
const Instructions = finishAllScopesModal.instructions('div');
const ActionsPanel = finishAllScopesModal.actionsPanel(Panel);
const FinishScopeButton = finishAllScopesModal.finishScopeButton(Button);
const CancelButton = finishAllScopesModal.cancelButton(Button);
