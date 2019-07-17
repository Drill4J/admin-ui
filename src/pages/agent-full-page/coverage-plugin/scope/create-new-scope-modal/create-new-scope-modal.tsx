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
  required,
  sizeLimit,
} from '../../../../../forms';
import { Popup, Icons } from '../../../../../components';
import { NotificationManagerContext } from '../../../../../notification-manager';
import { Message } from '../../../../../types/message';

import styles from './create-new-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
}

const createNewScopeModal = BEM(styles);

const validateScope = composeValidators(required('scopeName'), sizeLimit('scopeName', 3, 64));

export const CreateNewScopeModal = createNewScopeModal(
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
                  <CreateScopeButton type="primary" onClick={handleSubmit as any}>
                    Continue
                  </CreateScopeButton>
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

const ErrorMessage = createNewScopeModal.errorMessage(Panel);
const ErrorMessageIcon = createNewScopeModal.errorMessageIcon(Icons.Warning);
const Content = createNewScopeModal.content('div');
const ActionsPanel = createNewScopeModal.actionsPanel(Panel);
const CreateScopeButton = createNewScopeModal.createScopeButton(Button);
const CancelButton = createNewScopeModal.cancelButton(Button);

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
