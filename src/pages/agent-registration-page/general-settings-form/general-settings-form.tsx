import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field } from 'react-final-form';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { Fields, FormGroup } from 'forms';
import { copyToClipboard } from 'utils';

import styles from './general-settings-form.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const generalSettingsForm = BEM(styles);

export const GeneralSettingsForm = withRouter(
  generalSettingsForm(
    ({
      className,
      match: {
        params: { agentId },
      },
    }: Props) => (
      <div className={className}>
        <InfoPanel align="space-between">
          <Panel>
            <InfoIcon />
              Set up basic agent settings
          </Panel>
        </InfoPanel>
        <Content>
          <FormGroup
            label="Agent ID"
            actions={<CopyAgentId onClick={() => copyToClipboard(String(agentId))} />}
          >
            <Field name="id" component={Fields.Input} disabled />
          </FormGroup>
          <FormGroup label="Service Group">
            <Field name="serviceGroup" component={Fields.Input} placeholder="n/a" disabled />
          </FormGroup>
          <FormGroup label="Environment" optional>
            <Field
              name="environment"
              component={Fields.Input}
              placeholder="Specify an environment"
            />
          </FormGroup>
          <AgentName label="Agent name">
            <Field name="name" component={Fields.Input} placeholder="Enter agent's name" />
          </AgentName>
          <Description label="Description">
            <Field
              name="description"
              component={Fields.Textarea}
              placeholder="Add agent's description"
            />
          </Description>
        </Content>
      </div>
    ),
  ),
);

const InfoPanel = generalSettingsForm.infoPanel(Panel);
const InfoIcon = generalSettingsForm.infoIcon(Icons.Info);
const Content = generalSettingsForm.content('div');
const CopyAgentId = generalSettingsForm.copyButton(Icons.Copy);
const Description = generalSettingsForm.description(FormGroup);
const AgentName = generalSettingsForm.agentName(FormGroup);
