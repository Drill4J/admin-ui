import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { Fields, FormGroup, composeValidators, required, sizeLimit, Button } from 'forms';
import { copyToClipboard } from 'utils';
import { Message } from 'types/message';
import { Agent } from 'types/agent';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
  showMessage: (message: Message) => void;
}

const generalSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  required('name'),
  sizeLimit({ name: 'name' }),
  sizeLimit({ name: 'environment' }),
  sizeLimit({ name: 'description', min: 3, max: 256 }),
);

export const GeneralSettingsForm = generalSettingsForm(
  ({ className, agent, showMessage }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    return (
      <div className={className}>
        <Form
          onSubmit={saveChanges({
            onSuccess: () => {
              showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
            },
            onError: setErrorMessage,
          })}
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
                  <InfoIcon />
                  Basic agent settings
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
                  label="Agent ID"
                  actions={<CopyAgentId onClick={() => copyToClipboard(String(agent.id))} />}
                >
                  <Field name="id" component={Fields.Input} disabled />
                </FormGroup>
                <FormGroup label="Service Group">
                  <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
                </FormGroup>
                <FormGroup label="Environment" optional>
                  <Field
                    name="environment"
                    component={Fields.Input}
                    placeholder="Specify an environment"
                  />
                </FormGroup>
                <AgentName label="Agent name">
                  <Field name="name" component={Fields.Input} placeholder="Give agent a name" />
                </AgentName>
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
const InfoIcon = generalSettingsForm.infoIcon(Icons.Info);
const SaveChangesButton = generalSettingsForm.saveChangesButton(Button);
const ErrorMessage = generalSettingsForm.errorMessage(Panel);
const ErrorMessageIcon = generalSettingsForm.errorMessageIcon(Icons.Warning);
const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const AgentName = generalSettingsForm.agentName(FormGroup);
const Description = generalSettingsForm.description(FormGroup);

function saveChanges({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  return async (agent: Agent) => {
    try {
      await axios.post(`/agent/${agent.id}`, agent);
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
