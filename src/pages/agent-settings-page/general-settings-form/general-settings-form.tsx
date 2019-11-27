import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { Panel } from '../../../layouts';
import { Icons } from '../../../components';
import { Fields, FormGroup, composeValidators, required, sizeLimit, Button } from '../../../forms';
import { copyToClipboard } from '../../../utils';
import { Agent } from '../../../types/agent';
import { Message } from '../../../types/message';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
  showMessage: (message: Message) => void;
}

const generalSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  required('name'),
  required('description'),
  sizeLimit('name'),
  sizeLimit('group'),
  sizeLimit('description', 3, 256),
);

export const GeneralSettingsForm = generalSettingsForm(
  ({ className, agent, showMessage }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, showMessage, setErrorMessage)}
          initialValues={agent}
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
                  <Icons.Info />
                  &nbsp;Basic agent settings
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
                <FormGroup label="IP Address">
                  <Field name="ipAddress" component={Fields.Input} disabled />
                </FormGroup>
                <FormGroup
                  label="Agent ID"
                  actions={<CopyAgentId onClick={() => copyToClipboard(String(agent.id))} />}
                >
                  <Field name="id" component={Fields.Input} disabled />
                </FormGroup>
                <FormGroup label="Service Group">
                  <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
                </FormGroup>
                <FormGroup label="Agent name">
                  <Field name="name" component={Fields.Input} placeholder="Give agent a name" />
                </FormGroup>
                <FormGroup label="Group" optional>
                  <Field name="group" component={Fields.Input} placeholder="Specify a group" />
                </FormGroup>
                <Description label="Description">
                  <Field
                    name="description"
                    component={Fields.Textarea}
                    placeholder="Add a description"
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
const SaveChangesButton = generalSettingsForm.saveChangesButton(Button);
const ErrorMessage = generalSettingsForm.errorMessage(Panel);
const ErrorMessageIcon = generalSettingsForm.errorMessageIcon(Icons.Warning);
const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const Description = generalSettingsForm.description(FormGroup);

async function saveChanges(
  agent: Agent,
  showMessage: (message: Message) => void,
  showError: (message: string) => void,
) {
  try {
    await axios.post(`/agent/${agent.id}`, agent);
    showError('');
    showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    showError(message);
  }
}
