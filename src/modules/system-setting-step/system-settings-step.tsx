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
import { FormGroup } from '@drill4j/ui-kit';

import { Fields } from 'forms';
import { parsePackages, formatPackages } from 'utils';

import styles from './system-settings-step.module.scss';

interface Props {
  className?: string;
  infoPanel?: React.ReactNode;
}

const systemSettingsStep = BEM(styles);

export const SystemSettingsStep = systemSettingsStep(({ className, infoPanel }: Props) => (
  <div className={className}>
    {infoPanel}
    <Content>
      <FieldName>Project Package(s)</FieldName>
      <div className="d-flex align-items-start w-100">
        <PackagesTextarea>
          <Field
            name="systemSettings.packages"
            component={ProjectPackages}
            parse={parsePackages}
            format={formatPackages}
            placeholder="e.g. com/example/mypackage&#10;foo/bar/baz&#10;and so on."
          />
        </PackagesTextarea>
        <Instruction>
          Make sure you add application packages only, otherwise agent&apos;s performance will be affected.
          Use new line as a separator, &quot;!&quot; before package/class for excluding and use &quot;/&quot; in a package path.
        </Instruction>
      </div>
      <HeaderMapping label="Header Mapping" optional>
        <Field
          name="systemSettings.sessionIdHeaderName"
          component={Fields.Input}
          placeholder="Enter session header name"
          label="Session header name"
        />
      </HeaderMapping>
      <TargetHost label="Target host" optional>
        <Field
          name="systemSettings.targetHost"
          component={Fields.Input}
          placeholder="Specify your target application host"
        />
      </TargetHost>
    </Content>
  </div>
));

const Content = systemSettingsStep.content('div');
const FieldName = systemSettingsStep.fieldName('div');
const PackagesTextarea = systemSettingsStep.packagesTextarea('div');
const ProjectPackages = systemSettingsStep.projectPackages(Fields.Textarea);
const Instruction = systemSettingsStep.instructions('div');
const HeaderMapping = systemSettingsStep.headerMapping(FormGroup);
const TargetHost = systemSettingsStep.targetHost(FormGroup);
