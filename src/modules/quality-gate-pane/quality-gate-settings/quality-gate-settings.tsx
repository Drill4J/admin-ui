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
import { Icons, Tooltip } from '@drill4j/ui-kit';
import { Field } from 'react-final-form';

import { Fields } from 'forms/fields';
import { ConditionSettingByType } from 'types/quality-gate-type';
import { parseCoverage, inputLengthRestriction } from 'utils';
import { ThresholdValueField } from './threshold-value-field';

import styles from './quality-gate-settings.module.scss';

interface Props {
  className?: string;
  conditionSettingByType: ConditionSettingByType;
}

const qualityGateSettings = BEM(styles);

export const QualityGateSettings = qualityGateSettings(
  ({ className, conditionSettingByType }: Props) => (
    <div className={className}>
      <Conditions>
        <GridWrapper>
          <Field
            name="coverage.enabled"
            type="checkbox"
            component={Checkbox}
          />
          <Field
            name="coverage.condition.value"
            component={ThresholdValueField}
            disabled={!conditionSettingByType?.coverage?.enabled}
            parse={parseCoverage}
          >
            <Condtion data-test="quality-gate-settings:condtion:coverage">
              Build coverage
              <CondtionStatus data-test="quality-gate-settings:condtion-status:coverage">
                Minimum percentage of build covered by tests
              </CondtionStatus>
            </Condtion>
          </Field>
          <Percentage>%</Percentage>
        </GridWrapper>
        <GridWrapper>
          <Field
            name="risks.enabled"
            type="checkbox"
            component={Checkbox}
          />
          <Field
            name="risks.condition.value"
            component={ThresholdValueField}
            disabled={!conditionSettingByType?.risks?.enabled}
            parse={(value: string) => inputLengthRestriction(value, 7)}
          >
            <Condtion>
              <div className="d-flex align-items-center w-100" data-test="quality-gate-settings:condtion:risks">
                Risks
                <RisksInfoIcon
                  message={(
                    <div className="d-flex flex-column align-items-center w-100">
                      <span>Try to cover all of your risks in current build.</span>
                      <span>Uncovered risks won’t be counted in your next build.</span>
                    </div>
                  )}
                >
                  <Icons.Info width={12} height={12} data-test="quality-gate-settings:info-icon" />
                </RisksInfoIcon>
              </div>
              <CondtionStatus data-test="quality-gate-settings:condtion-status:risks">
                Maximum number of risks in the build
              </CondtionStatus>
            </Condtion>
          </Field>
        </GridWrapper>
        <GridWrapper>
          <Field
            name="tests.enabled"
            type="checkbox"
            component={Checkbox}
          />
          <Field
            name="tests.condition.value"
            component={ThresholdValueField}
            disabled={!conditionSettingByType?.tests?.enabled}
            parse={(value: string) => inputLengthRestriction(value, 7)}
          >
            <Condtion data-test="quality-gate-settings:condtion:tests">
              Suggested “Tests to run” executed
              <CondtionStatus data-test="quality-gate-settings:condtion-status:tests">
                Maximum number of tests to run in the build
              </CondtionStatus>
            </Condtion>
          </Field>
        </GridWrapper>
      </Conditions>
    </div>
  ),
);

const Conditions = qualityGateSettings.conditions('div');
const GridWrapper = qualityGateSettings.gridWrapper('div');
const Checkbox = qualityGateSettings.checkbox(Fields.Checkbox);
const Condtion = qualityGateSettings.condtion('div');
const CondtionStatus = qualityGateSettings.condtionStatus('div');
const Percentage = qualityGateSettings.percentage('div');
const RisksInfoIcon = qualityGateSettings.risksInfoIcon(Tooltip);
