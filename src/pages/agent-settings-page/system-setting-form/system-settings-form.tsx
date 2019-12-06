import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Field, Form } from 'react-final-form';
import axios from 'axios';

import { Panel } from '../../../layouts';
import { Icons, Tooltip } from '../../../components';
import { Fields, requiredArray, Button, FormGroup } from '../../../forms';
import { Agent } from '../../../types/agent';
import { Message } from '../../../types/message';
import { parsePackges, formatPackages } from '../../../utils';
import { UnlockingSystemSettingsFormModal } from './unlocking-system-settings-form-modal';

import styles from './system-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
  showMessage: (message: Message) => void;
}

const systemSettingsForm = BEM(styles);

const validateSettings = requiredArray('packagesPrefixes');

export const SystemSettingsForm = systemSettingsForm(
  ({
    className,
    agent: { id, packagesPrefixes = [], sessionIdHeaderName },
    showMessage,
  }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [unlocked, setUnlocked] = React.useState(false);
    const [isUnlockingModalOpened, setIsUnlockingModalOpened] = React.useState(false);
    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, showMessage, setErrorMessage)}
          initialValues={{ id, packagesPrefixes, sessionIdHeaderName }}
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
                  Information related to your application / project
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
                <FieldName>
                  Project Package(s)
                  <BlockerStatus
                    unlocked={unlocked}
                    onClick={() => {
                      unlocked ? setUnlocked(false) : setIsUnlockingModalOpened(true);
                    }}
                  >
                    {unlocked ? (
                      <Icons.Unlocked />
                    ) : (
                      <Tooltip
                        message={
                          <SecuredMessage direction="column">
                            <span>Secured from editing.</span>
                            <span> Click to unlock.</span>
                          </SecuredMessage>
                        }
                      >
                        <Icons.Locked />
                      </Tooltip>
                    )}
                  </BlockerStatus>
                </FieldName>
                <Panel verticalAlign="start">
                  <Field
                    name="packagesPrefixes"
                    component={ProjectPackages}
                    parse={parsePackges}
                    format={formatPackages}
                    placeholder="Package name 1&#10;Package name 2&#10;Package name 3&#10;and so on."
                    disabled={!unlocked}
                  />
                  {unlocked && (
                    <Instruction>
                      Make sure you add application packages only, otherwise agent's performance
                      will be affected. Use new line as a separator.
                    </Instruction>
                  )}
                </Panel>
                <HeaderMapping label="Header Mapping" optional>
                  <Field
                    name="sessionIdHeaderName"
                    component={Fields.Input}
                    placeholder="Enter session header name"
                  />
                </HeaderMapping>
                {isUnlockingModalOpened && (
                  <UnlockingSystemSettingsFormModal
                    isOpen={isUnlockingModalOpened}
                    onToggle={setIsUnlockingModalOpened}
                    setUnlocked={setUnlocked}
                  />
                )}
              </Content>
            </>
          )}
        />
      </div>
    );
  },
);

const InfoPanel = systemSettingsForm.infoPanel(Panel);
const InfoIcon = systemSettingsForm.infoIcon(Icons.Info);
const SaveChangesButton = systemSettingsForm.saveChangesButton(Button);
const ErrorMessage = systemSettingsForm.errorMessage(Panel);
const ErrorMessageIcon = systemSettingsForm.errorMessageIcon(Icons.Warning);
const Content = systemSettingsForm.content('div');
const FieldName = systemSettingsForm.fieldName(Panel);
const BlockerStatus = systemSettingsForm.blockerStatus(
  div({ onClick: () => {} } as { unlocked: boolean; onClick: () => void }),
);
const SecuredMessage = systemSettingsForm.securedMessage(Panel);
const Instruction = systemSettingsForm.instructions('div');
const ProjectPackages = systemSettingsForm.projectPackages(Fields.Textarea);
const HeaderMapping = systemSettingsForm.headerMapping(FormGroup);

async function saveChanges(
  { id, packagesPrefixes = [], sessionIdHeaderName }: Agent,
  showMessage: (message: Message) => void,
  showError: (message: string) => void,
) {
  try {
    await axios.post(`/agents/${id}/system-settings`, {
      packagesPrefixes: packagesPrefixes.filter(Boolean),
      sessionIdHeaderName,
    });
    showError('');
    showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch ({ response: { data: { message } = {} } = {} }) {
    showError(message || 'Internal service error');
  }
}
