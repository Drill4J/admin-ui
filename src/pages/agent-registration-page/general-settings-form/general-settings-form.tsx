import React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';
import {
  Icons, FormGroup, GeneralAlerts,
} from '@drill4j/ui-kit';

import { Fields } from 'forms';
import { copyToClipboard } from 'utils';
import { Agent } from 'types/agent';

import styles from './general-settings-form.module.scss';

interface Props {
  className?: string;
  formValues: Agent;
}

const generalSettingsForm = BEM(styles);

export const GeneralSettingsForm = generalSettingsForm(({ className, formValues: { id = '', agentVersion = '' } }: Props) => (
  <div className={className}>
    <GeneralAlerts type="INFO">
      Set up basic agent settings
    </GeneralAlerts>
    <Content>
      <FormGroup
        label="Agent ID"
        actions={<CopyAgentId onClick={() => copyToClipboard(id)} />}
      >
        <Field name="id" component={Fields.Input} disabled />
      </FormGroup>
      <FormGroup
        label="Agent version"
        actions={<CopyAgentId onClick={() => copyToClipboard(agentVersion)} />}
      >
        <Field name="agentVersion" component={Fields.Input} disabled />
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
      <Description label="Description">
        <Field
          name="description"
          component={Fields.Textarea}
          placeholder="Add agent's description"
        />
      </Description>
    </Content>
  </div>
));

const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const Description = generalSettingsForm.description(FormGroup);
const AgentName = generalSettingsForm.agentName(FormGroup);
