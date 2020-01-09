import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { Fields, FormGroup, composeValidators, required, sizeLimit, Button } from 'forms';
import { copyToClipboard } from 'utils';
import { Message } from 'types/message';
import { CommonEntity } from 'types/common-entity';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  serviceGroup: CommonEntity;
  showMessage: (message: Message) => void;
}

const generalSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  required('name', 'Service Group Name'),
  sizeLimit({ name: 'name', alias: 'Service Group Name' }),
  sizeLimit({ name: 'environment' }),
  sizeLimit({ name: 'description', min: 3, max: 256 }),
);

export const GeneralSettingsForm = generalSettingsForm(
  ({ className, serviceGroup, showMessage }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <div className={className}>
        <Form
          onSubmit={(values) =>
            saveChanges(values, {
              onSuccess: (message: Message) => {
                showMessage(message);
              },
              onError: setErrorMessage,
            })
          }
          initialValues={serviceGroup}
          validate={validateSettings as any}
          render={({
            handleSubmit,
            submitting,
            pristine,
            invalid,
          }: {
            handleSubmit: () => void;
            submitting: boolean;
            pristine: boolean;
            invalid: boolean;
          }) => (
            <>
              <InfoPanel align="space-between">
                <Panel>
                  <InfoIcon />
                  Basic service group settings
                </Panel>
                <SaveChangesButton
                  type="primary"
                  onClick={handleSubmit}
                  disabled={submitting || pristine || invalid}
                  data-test="general-settings-form:save-changes-button"
                >
                  Save changes
                </SaveChangesButton>
              </InfoPanel>
              {errorMessage && (
                <ErrorMessage>
                  <ErrorMessageIcon />
                  {errorMessage}
                </ErrorMessage>
              )}
              <Content>
                <FormGroup
                  label="Service Group ID"
                  actions={<CopyAgentId onClick={() => copyToClipboard(String(serviceGroup.id))} />}
                >
                  <Field name="id" component={Fields.Input} disabled />
                </FormGroup>
                <FormGroup label="Environment" optional>
                  <Field
                    name="environment"
                    component={Fields.Input}
                    placeholder="Specify an environment"
                  />
                </FormGroup>
                <ServiceGroupName label="Service Group Name">
                  <Field
                    name="name"
                    component={Fields.Input}
                    placeholder="Give Service Group a name"
                  />
                </ServiceGroupName>

                <Description label="Description">
                  <Field
                    name="description"
                    component={Fields.Textarea}
                    placeholder="Add Service Group's description"
                  />
                </Description>
              </Content>
            </>
          )}
        />
      </div>
    );
  },
);

const InfoPanel = generalSettingsForm.infoPanel(Panel);
const InfoIcon = generalSettingsForm.infoIcon(Icons.Info);
const SaveChangesButton = generalSettingsForm.saveChangesButton(Button);
const ErrorMessage = generalSettingsForm.errorMessage(Panel);
const ErrorMessageIcon = generalSettingsForm.errorMessageIcon(Icons.Warning);
const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const ServiceGroupName = generalSettingsForm.serviceGroupName(FormGroup);
const Description = generalSettingsForm.description(FormGroup);

async function saveChanges(
  serviceGroup: CommonEntity,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (message: Message) => void;
    onError: (message: string) => void;
  },
) {
  try {
    await axios.put(`/service-group/${serviceGroup.id}`, serviceGroup);
    onSuccess && onSuccess({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'Internal service error');
  }
}
