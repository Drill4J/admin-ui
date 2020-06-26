import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import {
  Panel, Button, FormGroup, Popup, GeneralAlerts,
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
        header={<Panel>Rename Scope</Panel>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
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
                  <Button type="primary" size="large" onClick={handleSubmit as any}>
                    Save
                  </Button>
                  <Button type="secondary" size="large" onClick={() => onToggle(false)}>
                    Cancel
                  </Button>
                </ActionsPanel>
              </Content>
            )}
          />
        </div>
      </Popup>
    );
  },
);

const Content = renameScopeModal.content('div');
const ActionsPanel = renameScopeModal.actionsPanel(Panel);
