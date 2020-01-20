import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Panel } from '../../../layouts';
import { Icons } from '../../../components';
import { Fields, FormGroup } from '../../../forms';
import { parsePackges, formatPackages } from '../../../utils';

import styles from './system-settings-form.module.scss';

interface Props {
  className?: string;
}

const systemSettingsForm = BEM(styles);

export const SystemSettingsForm = systemSettingsForm(({ className }: Props) => (
  <div className={className}>
    <InfoPanel align="space-between">
      <Panel>
        <InfoIcon />
          Information related to your application / project
      </Panel>
    </InfoPanel>
    <Content>
      <FieldName>Project Package(s)</FieldName>
      <Panel verticalAlign="start">
        <PackagesTextarea>
          <Field
            name="packagesPrefixes"
            component={ProjectPackages}
            parse={parsePackges}
            format={formatPackages}
            placeholder="Package name 1&#10;Package name 2&#10;Package name 3&#10;and so on."
          />
        </PackagesTextarea>
        <Instruction>
            Make sure you add application packages only, otherwise agent&apos;s performance will be
            affected. Use new line as a separator.
        </Instruction>
      </Panel>
      <HeaderMapping label="Header Mapping" optional>
        <Field
          name="sessionIdHeaderName"
          component={Fields.Input}
          placeholder="Enter session header name"
          label="Session header name"
        />
      </HeaderMapping>
    </Content>
  </div>
));

const InfoPanel = systemSettingsForm.infoPanel(Panel);
const InfoIcon = systemSettingsForm.infoIcon(Icons.Info);
const Content = systemSettingsForm.content('div');
const FieldName = systemSettingsForm.fieldName('div');
const PackagesTextarea = systemSettingsForm.packagesTextarea('div');
const ProjectPackages = systemSettingsForm.projectPackages(Fields.Textarea);
const Instruction = systemSettingsForm.instructions('div');
const HeaderMapping = systemSettingsForm.headerMapping(FormGroup);
