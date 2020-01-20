import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Field, withTypes } from 'react-final-form';

import { Panel } from 'layouts';
import {
  Button,
  CancelButton,
  Fields,
  FormGroup,
  composeValidators,
  sizeLimit,
  required,
} from 'forms';
import { Popup, Icons } from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { BuildVersion } from 'types/build-version';
import { renameBuildVersion } from '../../api';

import styles from './rename-build-version-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentId: string;
  buildVersion: BuildVersion;
}

const renameBuildVersionModal = BEM(styles);

const { Form } = withTypes<BuildVersion>();

const validateAlias = composeValidators(
  required('name'),
  sizeLimit({ name: 'name', min: 1, max: 64 }),
);

export const RenameBuildVersionModal = renameBuildVersionModal(
  ({
    className, isOpen, onToggle, agentId, buildVersion,
  }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Panel>Rename build</Panel>}
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
            onSubmit={(values) => renameBuildVersion(agentId, {
              onSuccess: () => {
                showMessage({ type: 'SUCCESS', text: 'Build name has been changed' });
                onToggle(false);
              },
              onError: setErrorMessage,
            })(values)}
            validate={validateAlias as any}
            initialValues={buildVersion || {}}
            render={({ handleSubmit }) => (
              <Content>
                <FormGroup label="Build Name">
                  <Field name="name" component={Fields.Input} />
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

const ErrorMessage = renameBuildVersionModal.errorMessage(Panel);
const ErrorMessageIcon = renameBuildVersionModal.errorMessageIcon(Icons.Warning);
const Content = renameBuildVersionModal.content('div');
const ActionsPanel = renameBuildVersionModal.actionsPanel(Panel);
const RenameScopeButton = renameBuildVersionModal.renameScopeButton(Button);
