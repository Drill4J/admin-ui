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
import { Field } from 'react-final-form';
import { FormGroup, GeneralAlerts } from '@drill4j/ui-kit';
import 'twin.macro';

import { Fields } from 'forms';

export const JavaGeneralSettingsForm = () => (
  <div tw="space-y-10">
    <GeneralAlerts type="INFO">
      Basic agent settings.
    </GeneralAlerts>
    <div tw="flex flex-col items-center gap-y-6">
      <FormGroup tw="w-97" label="Agent ID">
        <Field name="id" component={Fields.Input} disabled />
      </FormGroup>
      <FormGroup tw="w-97" label="Agent version">
        <Field name="agentVersion" component={Fields.Input} disabled />
      </FormGroup>
      <FormGroup tw="w-97" label="Service Group">
        <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
      </FormGroup>
      <FormGroup tw="w-97" label="Agent name">
        <Field name="name" component={Fields.Input} placeholder="Give agent a name" />
      </FormGroup>
      <FormGroup tw="w-97" label="Environment" optional>
        <Field
          name="environment"
          component={Fields.Input}
          placeholder="Specify an environment"
        />
      </FormGroup>
      <FormGroup tw="w-97" label="Description" optional>
        <Field
          name="description"
          component={Fields.Textarea}
          placeholder="Add agent's description"
        />
      </FormGroup>
    </div>
  </div>
);
