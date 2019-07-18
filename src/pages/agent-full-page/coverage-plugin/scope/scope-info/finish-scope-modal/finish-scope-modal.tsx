import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { Panel } from '../../../../../../layouts';
import { Button, Inputs } from '../../../../../../forms';
import { Popup, Icons, OverflowText } from '../../../../../../components';
import { NotificationManagerContext } from '../../../../../../notification-manager';
import { ScopeSummary } from './scope-summary';
import { Message } from '../../../../../../types/message';
import { ScopeSummary as ScopeSummaryType } from '../../../../../../types/scope-summary';

import styles from './finish-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
  scope: ScopeSummaryType | null;
}

const finishScopeModal = BEM(styles);

export const FinishScopeModal = finishScopeModal(
  ({ className, isOpen, onToggle, agentId, scope }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [ignoreScope, setIgnoreScope] = React.useState(false);

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
          <Content>
            <ScopeSummary scope={scope} />
            <IgnoreScope>
              <Inputs.Checkbox
                selected={ignoreScope}
                onClick={() => setIgnoreScope(!ignoreScope)}
                label="Ignore scope in build stats"
                withoutMargin
              />
            </IgnoreScope>
            <ActionsPanel>
              <FinishScopeButton
                type="primary"
                onClick={() =>
                  finishScope({ agentId, ignoreScope }, onToggle, showMessage, setErrorMessage)
                }
              >
                Finish Scope
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

const ErrorMessage = finishScopeModal.errorMessage(Panel);
const ErrorMessageIcon = finishScopeModal.errorMessageIcon(Icons.Warning);
const Content = finishScopeModal.content('div');
const IgnoreScope = finishScopeModal.ignoreScope('div');
const ActionsPanel = finishScopeModal.actionsPanel(Panel);
const FinishScopeButton = finishScopeModal.finishScopeButton(Button);
const CancelButton = finishScopeModal.cancelButton(Button);

async function finishScope(
  { agentId, ignoreScope }: { agentId?: string; ignoreScope?: boolean },
  closeModal: (value: boolean) => void,
  showMessage: (message: Message) => void,
  setErrorMessage: (error: string) => void,
) {
  try {
    await axios.post(`/agents/${agentId}/coverage/dispatch-action`, {
      type: 'SWITCH_ACTIVE_SCOPE',
      payload: { savePrevScope: !ignoreScope, scopeName: '' },
    });
    showMessage({ type: 'SUCCESS', text: 'Scope is finished' });
    closeModal(false);
  } catch (error) {
    setErrorMessage(error.message);
  }
}
