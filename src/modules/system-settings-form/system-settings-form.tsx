/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useContext, useState } from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  Icons, Tooltip, Button, FormGroup, Spinner,
} from '@drill4j/ui-kit';
import { Field, Form } from 'react-final-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  Fields, requiredArray, composeValidators, sizeLimit,
} from 'forms';
import { UnlockingSystemSettingsFormModal } from 'modules';
import { parsePackages, formatPackages } from 'utils';
import { Agent } from 'types/agent';
import { Message } from 'types/message';
import { SystemSettings } from 'types/system-settings';
import { NotificationManagerContext } from 'notification-manager';

import styles from './system-settings-form.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

const systemSettingsForm = BEM(styles);

const validateSettings = composeValidators(
  requiredArray('packages', 'Path prefix is required.'),
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
    agent: {
      id, systemSettings,
    },
  }: Props) => {
    const [unlocked, setUnlocked] = useState(false);
    const [isUnlockingModalOpened, setIsUnlockingModalOpened] = useState(false);
    const { showMessage } = useContext(NotificationManagerContext);
    const { type: agentType } = useParams<{ type: 'service-group' | 'agent' }>();

    return (
      <div className={className}>
        <Form
          onSubmit={saveChanges({
            onSuccess: (message) => {
              showMessage(message);
              setUnlocked(false);
            },
            onError: (message) => showMessage(message),
            agentType,
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
              <InfoPanel className="d-flex justify-content-between items-center px-6">
                <div className="d-flex items-center">
                  <InfoIcon />
                  Information related to your application / project.
                </div>
                <SaveChangesButton
                  className="d-flex items-center gx-1"
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || pristine || invalid}
                  data-test="system-settings-form:save-changes-button"
                >
                  {submitting && <Spinner disabled />} Save Changes
                </SaveChangesButton>
              </InfoPanel>
              <Content>
                <FieldName className="d-flex items-center w-full mb-2">
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
                          <SecuredMessage className="d-flex flex-column items-center w-full">
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
                <div className="d-flex align-items-start w-full mb-4">
                  <PackagesTextarea>
                    <Field
                      name="packages"
                      component={ProjectPackages}
                      parse={parsePackages}
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
                </div>
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

const InfoPanel = systemSettingsForm.infoPanel('div');
const InfoIcon = systemSettingsForm.infoIcon(Icons.Info);
const SaveChangesButton = systemSettingsForm.saveChangesButton(Button);
const Content = systemSettingsForm.content('div');
const FieldName = systemSettingsForm.fieldName('div');
const BlockerStatus = systemSettingsForm.blockerStatus(
  div({ onClick: () => {} } as { unlocked: boolean; onClick: () => void }),
);
const SecuredMessage = systemSettingsForm.securedMessage('div');
const PackagesTextarea = systemSettingsForm.packagesTextarea('div');
const Instruction = systemSettingsForm.instructions('div');
const ProjectPackages = systemSettingsForm.projectPackages(Fields.Textarea);
const HeaderMapping = systemSettingsForm.headerMapping(FormGroup);
const TargetHost = systemSettingsForm.targetHost(FormGroup);

function saveChanges({
  onSuccess,
  onError,
  agentType,
}: {
  onSuccess: (message: Message) => void;
  onError: (message: Message) => void;
  agentType: 'service-group' | 'agent';
}) {
  return async ({
    id, packages = [], sessionIdHeaderName, targetHost,
  }: { id?: string } & SystemSettings) => {
    try {
      await axios.put(`/${agentType === 'agent' ? 'agents' : 'service-groups'}/${id}/system-settings`, {
        packages: packages.filter(Boolean),
        sessionIdHeaderName,
        targetHost,
      });
      onSuccess({ type: 'SUCCESS', text: 'New settings have been saved' });
    } catch ({ response: { data: { message } = {} } = {} }) {
      onError({
        type: 'ERROR',
        text: 'On-submit error. Server problem or operation could not be processed in real-time',
      });
    }
  };
}
