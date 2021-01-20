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
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { Icons, FormGroup, GeneralAlerts } from '@drill4j/ui-kit';

import { Fields } from 'forms';
import { copyToClipboard } from 'utils';
import { Agent } from 'types/agent';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  formValues: Agent;
}

const generalSettingsForm = BEM(styles);

export const GeneralSettingsForm = generalSettingsForm(({ className, formValues: { id = '', agentVersion = '' } }: Props) => {
  const { agentId = '' } = useParams<{ agentId: string }>();
  return (
    <div className={className}>
      <GeneralAlerts type="INFO">
        Set up basic agent settings.
      </GeneralAlerts>
      <Content>
        <FormGroup
          label="Agent ID"
          actions={<CopyAgentId onClick={() => copyToClipboard(id)} />}
        >
          <Field name="id" component={Fields.Input} placeholder="Enter agent's ID" disabled={Boolean(agentId)} />
        </FormGroup>
        <FormGroup
          label="Agent version"
          actions={<CopyAgentId onClick={() => copyToClipboard(agentVersion)} />}
        >
          <Field name="agentVersion" component={Fields.Input} placeholder="n/a" disabled />
        </FormGroup>
        <FormGroup label="Service Group">
          <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
        </FormGroup>
        <AgentName label="Agent name">
          <Field name="name" component={Fields.Input} placeholder="Enter agent's name" />
        </AgentName>
        <FormGroup label="Environment" optional>
          <Field
            name="environment"
            component={Fields.Input}
            placeholder="Specify an environment"
          />
        </FormGroup>
        <Description label="Description" optional>
          <Field
            name="description"
            component={Fields.Textarea}
            placeholder="Add agent's description"
          />
        </Description>
      </Content>
    </div>
  );
});

const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const Description = generalSettingsForm.description(FormGroup);
const AgentName = generalSettingsForm.agentName(FormGroup);
