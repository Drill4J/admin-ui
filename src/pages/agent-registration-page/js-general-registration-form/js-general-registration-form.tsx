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
import { styled } from 'twin.macro';

import { Fields } from 'forms';

const Content = styled.div`
  height: calc(100vh - 270px);
`;

export const JsGeneralRegistrationForm = () => (
  <>
    <GeneralAlerts type="INFO">Set up basic agent settings.</GeneralAlerts>
    <Content tw="flex flex-col items-center gap-y-6 pt-10 overflow-auto">
      <FormGroup tw="w-97" label="Agent ID">
        <Field name="id" component={Fields.Input} placeholder="Enter agent's ID" disabled />
      </FormGroup>
      <FormGroup tw="w-97" label="Agent version">
        <Field name="agentVersion" component={Fields.Input} placeholder="n/a" disabled />
      </FormGroup>
      <FormGroup tw="w-97" label="Service Group">
        <Field name="group" component={Fields.Input} placeholder="n/a" disabled />
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
        <Field name="environment" component={Fields.Input} placeholder="Specify an environment" />
      </FormGroup>
    </Content>
  </>
);
