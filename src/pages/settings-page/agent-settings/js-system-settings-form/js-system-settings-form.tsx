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
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import {
  Button, GeneralAlerts, Icons, Spinner, Tooltip,
} from '@drill4j/ui-kit';
import 'twin.macro';

import {
  composeValidators, Fields, required,
} from 'forms';
import { NotificationManagerContext } from 'notification-manager';
import { Agent } from 'types/agent';
import { useFormHandleSubmit } from 'hooks';

interface Props {
  agent: Agent;
  setPristineSettings: (pristine: boolean) => void;
}

export const JsSystemSettingsForm = ({ agent, setPristineSettings }: Props) => {
  const { id = '' } = useParams<{ id: string }>();
  const { showMessage } = useContext(NotificationManagerContext);

  return (
    <Form
      onSubmit={async ({ systemSettings: { targetHost } = {} }: Agent) => {
        try {
          await axios.put(`/agents/${id}/system-settings`, { targetHost });
          showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
        } catch ({ response: { data: { message } = {} } = {} }) {
          showMessage({
            type: 'ERROR',
            text: 'On-submit error. Server problem or operation could not be processed in real-time',
          });
        }
      }}
      initialValues={agent}
      validate={composeValidators(
        !agent.group && required('systemSettings.targetHost', 'Target Host'),
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
              Information related to your application / project.
            </GeneralAlerts>
            <div tw="flex flex-col items-center gap-y-6">
              <div tw="w-97 space-y-2">
                <div tw="flex items-center gap-x-2">
                  <span tw="font-bold text-14 leading-20 text-monochrome-black">Target Host</span>
                  <Tooltip message="Specify URL where your application is located">
                    <Icons.Info tw="text-monochrome-default" />
                  </Tooltip>
                </div>
                <Field
                  name="systemSettings.targetHost"
                  component={Fields.Input}
                  placeholder="http://example.com"
                />
              </div>
              <div tw="w-97 mt-4">
                <Button
                  className="flex justify-center items-center gap-x-1 w-32"
                  primary
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || invalid || pristine}
                  data-test="js-system-settings-form:save-changes-button"
                >
                  {submitting ? <Spinner disabled /> : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    />

  );
};
