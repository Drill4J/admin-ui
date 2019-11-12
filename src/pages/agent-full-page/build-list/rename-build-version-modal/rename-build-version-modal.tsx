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
import { renameBuildVersion } from './rename-build-version';

import styles from './rename-build-version-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
  buildVersion: any;
}

const renameBuildVersionModal = BEM(styles);

const validateScope = composeValidators(required('alias'), sizeLimit('alias', 1, 64));

export const RenameBuildVersionModal = renameBuildVersionModal(
  ({ className, isOpen, onToggle, agentId, buildVersion }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Panel>Rename build</Panel>}
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
              renameBuildVersion(agentId, {
                onSuccess: () => {
                  showMessage({ type: 'SUCCESS', text: 'Build name has been changed' });
                  onToggle(false);
                },
                onError: setErrorMessage,
              })(values as any)
            }
            validate={validateScope as any}
            initialValues={buildVersion || {}}
            render={({ handleSubmit }) => (
              <Content>
                <FormGroup label="Build Name">
                  <Field name="alias" component={Fields.Input} />
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

const ErrorMessage = renameBuildVersionModal.errorMessage(Panel);
const ErrorMessageIcon = renameBuildVersionModal.errorMessageIcon(Icons.Warning);
const Content = renameBuildVersionModal.content('div');
const ActionsPanel = renameBuildVersionModal.actionsPanel(Panel);
const RenameScopeButton = renameBuildVersionModal.renameScopeButton(Button);
const CancelButton = renameBuildVersionModal.cancelButton(Button);
