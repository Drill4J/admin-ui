import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';

import { Panel } from '../../../../layouts';
import {
  Button,
  Fields,
  FormGroup,
  composeValidators,
  sizeLimit,
  required,
} from '../../../../forms';
import { Popup, Icons } from '../../../../components';
import { NotificationManagerContext } from '../../../../notification-manager';
import { manageSession } from '../api';
import { usePluginState } from '../../store';

import styles from './manage-sessions-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const manageSessionsModal = BEM(styles);

const validateScope = composeValidators(required('sessionId'), sizeLimit('sessionId', 1, 256));

export const ManageSessionsModal = manageSessionsModal(({ className, isOpen, onToggle }: Props) => {
  const { agentId } = usePluginState();
  const { showMessage } = React.useContext(NotificationManagerContext);
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={<Panel>Manage sessions</Panel>}
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
        <ManageSessionsWarning>
          <ManageSessionsWarningIcon>
            <Icons.Warning />
          </ManageSessionsWarningIcon>
          IMPORTANT: Use this option only if there is no way to test your app manually via Drill4J
          browser extension.
        </ManageSessionsWarning>

        <Form
          onSubmit={(values: { sessionId?: string; type?: 'START' | 'STOP' }) =>
            manageSession(agentId, {
              onSuccess: () => {
                showMessage({
                  type: 'SUCCESS',
                  text: `Session has been ${values.type === 'START' ? 'started' : 'finished'}`,
                });
              },
              onError: setErrorMessage,
            })(values)
          }
          validate={validateScope as any}
          initialValues={{} as { sessionId?: string; type?: 'START' | 'STOP' }}
          render={({ handleSubmit, form }) => (
            <Content>
              <Info>Start new or finish already started session using its ID.</Info>
              <FormGroup label="Session ID">
                <Field name="sessionId" component={Fields.Input} placeholder="Enter session ID" />
              </FormGroup>
              <ActionsPanel>
                <ActionButton
                  type="primary"
                  onClick={() => {
                    form.change('type', 'START');
                    handleSubmit();
                  }}
                >
                  <Icons.Start />
                  Start session
                </ActionButton>
                <ActionButton
                  type="secondary"
                  onClick={() => {
                    form.change('type', 'STOP');
                    handleSubmit();
                  }}
                >
                  <Icons.Check height={12} width={16} />
                  Finish session
                </ActionButton>
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
});

const ManageSessionsWarning = manageSessionsModal.manageSessionsWarning(Panel);
const ManageSessionsWarningIcon = manageSessionsModal.manageSessionsWarningIcon('div');
const ErrorMessage = manageSessionsModal.errorMessage(Panel);
const ErrorMessageIcon = manageSessionsModal.errorMessageIcon(Icons.Warning);
const Content = manageSessionsModal.content('div');
const Info = manageSessionsModal.info('div');
const ActionsPanel = manageSessionsModal.actionsPanel(Panel);
const ActionButton = manageSessionsModal.actionButton(Button);
const CancelButton = manageSessionsModal.cancelButton(Button);