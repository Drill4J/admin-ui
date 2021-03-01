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
import { Field, Form } from 'react-final-form';
import {
  Button, FormGroup, GeneralAlerts, Spinner,
} from '@drill4j/ui-kit';
import 'twin.macro';

import {
  composeValidators, Fields, required, sizeLimit,
} from 'forms';
import { Agent } from 'types/agent';
import { NotificationManagerContext } from 'notification-manager';
import { useFormHandleSubmit } from 'hooks';

interface Props {
  agent: Agent;
  setPristineSettings: (pristine: boolean) => void;
}

export const GeneralSettingsForm = ({ agent, setPristineSettings }: Props) => {
  const { id = '' } = useParams<{ id: string }>();
  const { showMessage } = useContext(NotificationManagerContext);

  return (
    <Form
      onSubmit={async ({ name, description, environment }: Agent) => {
        try {
          await axios.patch(`/agents/${id}/info`, { name, description, environment });
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
        required('name'),
        sizeLimit({ name: 'name' }),
        sizeLimit({ name: 'environment' }),
        sizeLimit({ name: 'description', min: 3, max: 256 }),
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
              Basic agent settings.
            </GeneralAlerts>
            <div tw="flex flex-col items-center gap-y-6">
              <FormGroup tw="w-97" label="Agent ID">
                <Field name="id" component={Fields.Input} disabled />
              </FormGroup>
              <FormGroup tw="w-97" label="Agent version">
                <Field name="agentVersion" component={Fields.Input} placeholder="n/a" disabled />
              </FormGroup>
              <FormGroup tw="w-97" label="Service Group">
                <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
              </FormGroup>
              <FormGroup tw="w-97" label="Agent name">
                <Field name="name" component={Fields.Input} placeholder="Enter agent's name" />
              </FormGroup>
              <FormGroup tw="w-97" label="Description" optional>
                <Field
                  tw="h-20"
                  name="description"
                  component={Fields.Textarea}
                  placeholder="Add agent's description"
                />
              </FormGroup>
              <FormGroup tw="w-97" label="Environment" optional>
                <Field
                  name="environment"
                  component={Fields.Input}
                  placeholder="Specify an environment"
                />
              </FormGroup>
              <div tw="w-97 mt-4">
                <Button
                  className="flex justify-center items-center gap-x-1 w-32"
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || invalid || pristine}
                  data-test="general-settings-form:save-changes-button"
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
