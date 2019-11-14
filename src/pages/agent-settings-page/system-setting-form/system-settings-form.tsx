import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Field, Form } from 'react-final-form';
import axios from 'axios';

import { Panel } from '../../../layouts';
import { Icons } from '../../../components';
import { Fields, requiredArray, Button } from '../../../forms';
import { Agent } from '../../../types/agent';
import { Message } from '../../../types/message';
import { parsePackges, formatPackages } from '../../../utils';

import styles from './system-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
  showMessage: (message: Message) => void;
}

const systemSettingsForm = BEM(styles);

const validateSettings = requiredArray('packagesPrefixes');

export const SystemSettingsForm = systemSettingsForm(
  ({ className, agent: { id, packagesPrefixes = [] }, showMessage }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, showMessage, setErrorMessage)}
          initialValues={{ id, packagesPrefixes }}
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
                  <Icons.Warning />
                  &nbsp;Information related to your application / project
                </Panel>
                <SaveChangesButton
                  type="primary"
                  onClick={handleSubmit}
                  disabled={submitting || pristine || invalid}
                  data-test="system-settings-form:save-changes-button"
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
                <div>
                  <FieldName>Project Package(s)</FieldName>
                  <Instruction>
                    Make sure you add application packages only, otherwise agent's performance will
                    be affected. Use new line as a separator.
                  </Instruction>
                </div>
                <Field
                  name="packagesPrefixes"
                  component={ProjectPackages}
                  parse={parsePackges}
                  format={formatPackages}
                  placeholder="Package name 1&#10;Package name 2&#10;Package name 3&#10;and so on."
                />
              </Content>
            </>
          )}
        />
      </div>
    );
  },
);

const InfoPanel = systemSettingsForm.infoPanel(Panel);
const SaveChangesButton = systemSettingsForm.saveChangesButton(Button);
const ErrorMessage = systemSettingsForm.errorMessage(Panel);
const ErrorMessageIcon = systemSettingsForm.errorMessageIcon(Icons.Warning);
const Content = systemSettingsForm.content('div');
const FieldName = systemSettingsForm.fieldName('div');
const Instruction = systemSettingsForm.instructions('div');
const ProjectPackages = systemSettingsForm.projectPackages(Fields.Textarea);

async function saveChanges(
  { id, packagesPrefixes = [] }: Agent,
  showMessage: (message: Message) => void,
  showError: (message: string) => void,
) {
  try {
    await axios.post(`/agents/${id}/set-packages`, {
      packagesPrefixes: packagesPrefixes.filter(Boolean),
    });
    showError('');
    showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    showError(message);
  }
}
