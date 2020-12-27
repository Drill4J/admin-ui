import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import {
  Panel, Icons, FormGroup, Button,
} from '@drill4j/ui-kit';

import {
  Fields, composeValidators, required, sizeLimit,
} from 'forms';
import { copyToClipboard } from 'utils';
import { Message } from 'types/message';
import { CommonEntity } from 'types/common-entity';
import { NotificationManagerContext } from 'notification-manager';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  serviceGroup: CommonEntity;
}

const generalSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  required('name', 'Service Group Name'),
  sizeLimit({ name: 'name', alias: 'Service Group Name' }),
  sizeLimit({ name: 'environment' }),
  sizeLimit({ name: 'description', min: 3, max: 256 }),
);

export const GeneralSettingsForm = generalSettingsForm(
  ({ className, serviceGroup }: Props) => {
    const { showMessage } = React.useContext(NotificationManagerContext);

    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, {
            onSuccess: (message: Message) => showMessage(message),
            onError: (message: Message) => showMessage(message),
          })}
          initialValues={serviceGroup}
          validate={validateSettings}
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
                  Basic service group settings.
                </Panel>
                <SaveChangesButton
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || pristine || invalid}
                  data-test="general-settings-form:save-changes-button"
                >
                  Save Changes
                </SaveChangesButton>
              </InfoPanel>
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
                <Description label="Description" optional>
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
const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const ServiceGroupName = generalSettingsForm.serviceGroupName(FormGroup);
const Description = generalSettingsForm.description(FormGroup);

async function saveChanges(
  {
    id, name, description, environment,
  }: CommonEntity,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (message: Message) => void;
    onError: (message: Message) => void;
  },
) {
  try {
    await axios.put(`/service-groups/${id}`, { name, description, environment });
    onSuccess({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError({
      type: 'ERROR',
      text: 'On-submit error. Server problem or operation could not be processed in real-time',
    });
  }
}
