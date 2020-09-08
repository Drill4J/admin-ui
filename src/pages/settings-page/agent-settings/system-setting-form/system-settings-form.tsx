import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Field, Form } from 'react-final-form';
import axios from 'axios';
import {
  Panel, Icons, Tooltip, Button, FormGroup, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  Fields, requiredArray, composeValidators, sizeLimit,
} from 'forms';
import { UnlockingSystemSettingsFormModal } from 'modules';
import { parsePackges, formatPackages } from 'utils';
import { Agent } from 'types/agent';
import { Message } from 'types/message';
import { SystemSettings } from 'types/system-settings';

import styles from './system-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
  showMessage: (message: Message) => void;
}

const systemSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  requiredArray('packages', 'Package prefixes are required.'),
  sizeLimit({
    name: 'sessionIdHeaderName',
    alias: 'Session header name',
    min: 1,
    max: 256,
  }),
);

export const SystemSettingsForm = systemSettingsForm(
  ({
    className,
    agent: { id, systemSettings },
    showMessage,
  }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [unlocked, setUnlocked] = React.useState(false);
    const [isUnlockingModalOpened, setIsUnlockingModalOpened] = React.useState(false);
    return (
      <div className={className}>
        <Form
          onSubmit={saveChanges({
            onSuccess: () => {
              setErrorMessage('');
              showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
              setUnlocked(false);
            },
            onError: setErrorMessage,
          })}
          initialValues={{ id, ...systemSettings }}
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
                  Information related to your application / project.
                </Panel>
                <SaveChangesButton
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || pristine || invalid}
                  data-test="system-settings-form:save-changes-button"
                >
                  Save Changes
                </SaveChangesButton>
              </InfoPanel>
              {errorMessage && (
                <GeneralAlerts type="ERROR">
                  {errorMessage}
                </GeneralAlerts>
              )}
              <Content>
                <FieldName>
                  Project Package(s)
                  <BlockerStatus
                    unlocked={unlocked}
                    onClick={() => {
                      unlocked ? !invalid && setUnlocked(false) : setIsUnlockingModalOpened(true);
                    }}
                  >
                    {unlocked ? (
                      <Icons.Unlocked />
                    ) : (
                      <Tooltip
                        message={(
                          <SecuredMessage direction="column">
                            <span>Secured from editing.</span>
                            <span> Click to unlock.</span>
                          </SecuredMessage>
                        )}
                      >
                        <Icons.Locked />
                      </Tooltip>
                    )}
                  </BlockerStatus>
                </FieldName>
                <Panel verticalAlign="start">
                  <PackagesTextarea>
                    <Field
                      name="packages"
                      component={ProjectPackages}
                      parse={parsePackges}
                      format={formatPackages}
                      placeholder="e.g. com/example/mypackage&#10;foo/bar/baz&#10;and so on."
                      disabled={!unlocked}
                    />
                  </PackagesTextarea>
                  {unlocked && (
                    <Instruction>
                      Make sure you add application packages only, otherwise agent&apos;s performance will be affected.
                      Use new line as a separator, &quot;!&quot; before package/class for excluding and use &quot;/&quot; in a package path.
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
                <TargetHost label="Target Host" optional>
                  <Field
                    name="targetHost"
                    component={Fields.Input}
                    placeholder="Specify your target application host"
                  />
                </TargetHost>
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
const Content = systemSettingsForm.content('div');
const FieldName = systemSettingsForm.fieldName(Panel);
const BlockerStatus = systemSettingsForm.blockerStatus(
  div({ onClick: () => {} } as { unlocked: boolean; onClick: () => void }),
);
const SecuredMessage = systemSettingsForm.securedMessage(Panel);
const PackagesTextarea = systemSettingsForm.packagesTextarea('div');
const Instruction = systemSettingsForm.instructions('div');
const ProjectPackages = systemSettingsForm.projectPackages(Fields.Textarea);
const HeaderMapping = systemSettingsForm.headerMapping(FormGroup);
const TargetHost = systemSettingsForm.targetHost(FormGroup);

function saveChanges({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  return async ({
    id, packages = [], sessionIdHeaderName, targetHost,
  }: { id?: string} & SystemSettings) => {
    try {
      await axios.put(`/agents/${id}/system-settings`, {
        packages: packages.filter(Boolean),
        sessionIdHeaderName,
        targetHost,
      });
      onSuccess && onSuccess();
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError && onError(message || 'Internal service error');
    }
  };
}
