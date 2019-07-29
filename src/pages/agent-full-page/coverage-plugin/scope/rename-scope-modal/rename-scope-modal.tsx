import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { Panel } from '../../../../../layouts';
import {
  Button,
  Fields,
  FormGroup,
  composeValidators,
  sizeLimit,
  required,
} from '../../../../../forms';
import { Popup, Icons } from '../../../../../components';
import { NotificationManagerContext } from '../../../../../notification-manager';
import { Message } from '../../../../../types/message';

import styles from './rename-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
}

const renameScopeModal = BEM(styles);

const validateScope = composeValidators(required('scopeName'), sizeLimit('scopeName', 1, 64));

export const RenameScopeModal = renameScopeModal(
  ({ className, isOpen, onToggle, agentId }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Panel>Set scope name</Panel>}
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
          <Form
            onSubmit={(values) => createNewScope(values, onToggle, showMessage, setErrorMessage)}
            validate={validateScope as any}
            initialValues={{ agentId }}
            render={({ handleSubmit }) => (
              <Content>
                <FormGroup label="Scope Name">
                  <Field
                    name="scopeName"
                    component={Fields.Input}
                    placeholder="e.g. Automation Tests"
                  />
                </FormGroup>
                <ActionsPanel>
                  <RenameScopeButton type="primary" onClick={handleSubmit as any}>
                    Continue
                  </RenameScopeButton>
                  <CancelButton type="secondary" onClick={() => onToggle(false)}>
                    Cancel
                  </CancelButton>
                </ActionsPanel>
              </Content>
            )}
          />
        </div>
      </Popup>
    );
  },
);

const ErrorMessage = renameScopeModal.errorMessage(Panel);
const ErrorMessageIcon = renameScopeModal.errorMessageIcon(Icons.Warning);
const Content = renameScopeModal.content('div');
const ActionsPanel = renameScopeModal.actionsPanel(Panel);
const RenameScopeButton = renameScopeModal.renameScopeButton(Button);
const CancelButton = renameScopeModal.cancelButton(Button);

async function createNewScope(
  { scopeName, agentId }: { scopeName?: string; agentId?: string },
  closeModal: (value: boolean) => void,
  showMessage: (message: Message) => void,
  setErrorMessage: (error: string) => void,
) {
  try {
    await axios.post(`/agents/${agentId}/coverage/dispatch-action`, {
      type: 'RENAME_ACTIVE_SCOPE',
      payload: { scopeName },
    });
    showMessage({ type: 'SUCCESS', text: 'Scope name is changed' });
    closeModal(false);
  } catch (error) {
    setErrorMessage(error.message);
  }
}
