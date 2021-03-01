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

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Icons, Tooltip, GeneralAlerts, FormGroup, Spinner, Button,
} from '@drill4j/ui-kit';
import { Field, Form } from 'react-final-form';
import 'twin.macro';

import {
  composeValidators, Fields, requiredArray, sizeLimit,
} from 'forms';
import { UnlockingSystemSettingsFormModal } from 'modules';
import { parsePackages, formatPackages } from 'utils';
import { Agent } from 'types/agent';
import { useFormHandleSubmit } from 'hooks';
import { NotificationManagerContext } from 'notification-manager';

interface Props {
  agent: Agent;
  isServiceGroup?: boolean;
  setPristineSettings: (pristine: boolean) => void;
}

export const SystemSettingsForm = ({
  isServiceGroup, agent, setPristineSettings,
}: Props) => {
  const [unlockedPackages, setUnlockedPackages] = useState(false);
  const [isUnlockingModalOpened, setIsUnlockingModalOpened] = useState(false);
  const { showMessage } = useContext(NotificationManagerContext);
  const { id = '' } = useParams<{ id: string }>();

  return (
    <Form
      onSubmit={async ({ systemSettings: { sessionIdHeaderName, packages = [], targetHost } = {} }: Agent) => {
        try {
          const systemSettings = {
            packages: packages.filter(Boolean),
            sessionIdHeaderName,
            targetHost,
          };
          await axios.put(`/${isServiceGroup ? 'groups' : 'agents'}/${id}/system-settings`, systemSettings);
          showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
          setUnlockedPackages(false);
        } catch ({ response: { data: { message } = {} } = {} }) {
          showMessage({
            type: 'ERROR',
            text: 'On-submit error. Server problem or operation could not be processed in real-time',
          });
        }
      }}
      initialValues={agent}
      validate={composeValidators(
        requiredArray('systemSettings.packages', 'Path prefix is required.'),
        sizeLimit({
          name: 'systemSettings.sessionIdHeaderName',
          alias: 'Session header name',
          min: 1,
          max: 256,
        }),
      ) as any}
      render={(props) => {
        const ref = useFormHandleSubmit(props);
        const {
          handleSubmit, submitting, pristine, invalid,
        } = props || {};

        useEffect(() => {
          setPristineSettings(pristine);
        }, [pristine]);

        return (
          <form ref={ref} tw="space-y-10">
            <GeneralAlerts type="INFO">
              {isServiceGroup
                ? 'System settings are related only to Java agents.'
                : 'Information related to your application / project.'}
            </GeneralAlerts>
            <div tw="flex flex-col items-center gap-y-6">
              <div>
                <div tw="flex items-center gap-x-2 mb-2">
                  <span tw="font-bold text-14 leading-20 text-monochrome-black">Project Package(s)</span>
                  <div
                    className={`flex items-center ${unlockedPackages ? 'text-red-default' : 'text-monochrome-default'}`}
                    onClick={() => {
                      unlockedPackages ? !invalid && setUnlockedPackages(false) : setIsUnlockingModalOpened(true);
                    }}
                  >
                    {unlockedPackages ? (
                      <Icons.Unlocked />
                    ) : (
                      <Tooltip
                        message={(
                          <div tw="flex flex-col items-center w-full font-regular text-12 leading-16">
                            <span>Secured from editing.</span>
                            <span> Click to unlock.</span>
                          </div>
                        )}
                      >
                        <Icons.Locked />
                      </Tooltip>
                    )}
                  </div>
                </div>
                <Field
                  tw="w-97 h-20"
                  name="systemSettings.packages"
                  component={Fields.Textarea}
                  parse={parsePackages}
                  format={formatPackages}
                  placeholder="e.g. com/example/mypackage&#10;foo/bar/baz&#10;and so on."
                  disabled={!unlockedPackages}
                />
                {unlockedPackages && (
                  <div tw="w-97 text-12 leading-16 text-monochrome-default">
                    Make sure you add application packages only, otherwise agent&apos;s performance will be affected.
                    Use new line as a separator, &quot;!&quot; before package/class for excluding and
                    use &quot;/&quot; in a package path.
                  </div>
                )}
              </div>
              <FormGroup tw="w-97" label="Header Mapping" optional>
                <Field
                  name="systemSettings.sessionIdHeaderName"
                  component={Fields.Input}
                  placeholder="Enter session header name"
                />
              </FormGroup>
              <div tw="w-97 mt-4">
                <Button
                  className="flex justify-center items-center gap-x-1 w-32"
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || invalid || pristine}
                  data-test="system-settings-form:save-changes-button"
                >
                  {submitting ? <Spinner disabled /> : 'Save Changes'}
                </Button>
              </div>
              <UnlockingSystemSettingsFormModal
                isOpen={isUnlockingModalOpened}
                onToggle={setIsUnlockingModalOpened}
                setUnlocked={setUnlockedPackages}
              />
            </div>
          </form>
        );
      }}
    />
  );
};
