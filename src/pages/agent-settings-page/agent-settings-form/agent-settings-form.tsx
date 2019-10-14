import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Icons } from '../../../components';
import { Fields, FormGroup } from '../../../forms';
import { copyToClipboard } from '../../../utils';
import { BuildVersion } from '../../../types/build-version';

import styles from './agent-settings-form.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersions: BuildVersion[];
}

const agentSettingsForm = BEM(styles);

export const AgentSettingsForm = agentSettingsForm(
  ({ className, agentId, buildVersions = [] }: Props) => (
    <div className={className}>
      <Section>General</Section>
      <FormGroup label="Agent name">
        <Field name="name" component={Fields.Input} placeholder="Give agent a name" />
      </FormGroup>
      <FormGroup label="IP Address">
        <Field name="ipAddress" component={Fields.Input} disabled />
      </FormGroup>
      <FormGroup
        label="Agent ID"
        actions={<CopyAgentId onClick={() => copyToClipboard(agentId)} />}
      >
        <Field name="id" component={Fields.Input} disabled />
      </FormGroup>
      <Group label="Group" optional>
        <Field name="group" component={Fields.Input} placeholder="Specify a group" />
      </Group>
      <Description label="Description">
        <Field name="description" component={Fields.Textarea} placeholder="Add a description" />
      </Description>
    </div>
  ),
);

const Section = agentSettingsForm.section(div({} as { withLine?: boolean }));
const Group = agentSettingsForm.group(FormGroup);
const CopyAgentId = agentSettingsForm.copyButton(Icons.Copy);
const Description = agentSettingsForm.description(FormGroup);
