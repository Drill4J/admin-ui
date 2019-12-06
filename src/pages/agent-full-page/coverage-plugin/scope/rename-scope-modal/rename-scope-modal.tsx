import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';

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
import { renameScope } from '../../api';
import { usePluginState } from '../../../store';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './rename-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ScopeSummary | null;
}

const renameScopeModal = BEM(styles);

const validateScope = composeValidators(
  required('name'),
  sizeLimit({ name: 'name', min: 1, max: 64 }),
);

export const RenameScopeModal = renameScopeModal(
  ({ className, isOpen, onToggle, scope }: Props) => {
    const { agentId } = usePluginState();
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Panel>Rename scope</Panel>}
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
            onSubmit={(values) =>
              renameScope(agentId, {
                onSuccess: () => {
                  showMessage({ type: 'SUCCESS', text: 'Scope name has been changed' });
                  onToggle(false);
                },
                onError: setErrorMessage,
              })(values as ScopeSummary)
            }
            validate={validateScope as any}
            initialValues={scope || {}}
            render={({ handleSubmit }) => (
              <Content>
                <FormGroup label="Scope Name">
                  <Field name="name" component={Fields.Input} placeholder="e.g. Automation Tests" />
                </FormGroup>
                <ActionsPanel>
                  <RenameScopeButton type="primary" onClick={handleSubmit as any}>
                    Save
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
