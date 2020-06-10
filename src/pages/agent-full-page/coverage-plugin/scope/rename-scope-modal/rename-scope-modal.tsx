import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import {
  Panel, Button, FormGroup, CancelButton, Popup, Icons,
} from '@drill4j/ui-kit';

import {
  Fields,
  composeValidators,
  sizeLimit,
  required,
} from 'forms';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { ActiveScope } from 'types/active-scope';
import { renameScope } from '../../api';
import { usePluginState } from '../../../store';

import styles from './rename-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

const renameScopeModal = BEM(styles);

const validateScope = composeValidators(
  required('name'),
  sizeLimit({ name: 'name', min: 1, max: 64 }),
);

export const RenameScopeModal = renameScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { agentId } = usePluginState();
    const { pluginId = '' } = useParams();
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Panel>Rename scope</Panel>}
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
          <Form
            onSubmit={(values) => renameScope(agentId, pluginId, {
              onSuccess: () => {
                showMessage({ type: 'SUCCESS', text: 'Scope name has been changed' });
                onToggle(false);
              },
              onError: setErrorMessage,
            })(values as ScopeSummary)}
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
                  <CancelButton size="large" onClick={() => onToggle(false)}>
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
