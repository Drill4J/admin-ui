import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { FormGroup } from '../../../components';
import { Fields } from '../../../forms';
import { BuildVersion } from '../../../types/build-version';

import styles from './agent-settings-form.module.scss';

const agentSettingsForm = BEM(styles);

export const AgentSettingsForm = agentSettingsForm(({ className, buildVersions = [] }) => {
  return (
    <div className={className}>
      <Section>General</Section>
      <FormGroup label="Agent name">
        <Field name="name" component={Fields.Input} />
      </FormGroup>
      <FormGroup label="IP Address">
        <Field name="ipAddress" component={Fields.Input} disabled />
      </FormGroup>
      <FormGroup label="Agent ID">
        <Field name="id" component={Fields.Input} disabled />
      </FormGroup>
      <Group label="Group" optional>
        <Field name="group" component={Fields.Input} />
      </Group>
      <Description label="Description">
        <Field name="description" component={Fields.Textarea} placeholder="Add a description" />
      </Description>
      <Section withLine>Build Info</Section>
      <BuildVerison label="Agent Build Version">
        <Field
          name="buildVersion"
          component={Fields.Dropdown}
          placeholder="Select a build"
          options={buildVersions.map(({ id, name }: BuildVersion) => ({
            label: name,
            value: id,
          }))}
        />
      </BuildVerison>
      <FormGroup label="Build Alias">
        <Field name="buildVersionAlias" component={Fields.Input} />
      </FormGroup>
    </div>
  );
});

const Section = agentSettingsForm.section(div({} as { withLine?: boolean }));
const Group = agentSettingsForm.group(FormGroup);
const Description = agentSettingsForm.description(FormGroup);
const BuildVerison = agentSettingsForm.buildVersion(FormGroup);
