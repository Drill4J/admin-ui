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
import { Icons, Tooltip } from '@drill4j/ui-kit';
import { Field } from 'react-final-form';
import { styled } from 'twin.macro';

import { Fields } from 'forms/fields';
import { ConditionSettingByType } from 'types/quality-gate-type';
import { parseCoverage, inputLengthRestriction } from 'utils';
import { ThresholdValueField } from './threshold-value-field';

interface Props {
  conditionSettingByType: ConditionSettingByType;
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 244px 60px 16px;
  grid-template-rows: max-content;
`;

export const QualityGateSettings = ({ conditionSettingByType }: Props) => (
  <div tw="h-48 pr-6 pl-6 space-y-6 mt-6">
    <GridWrapper>
      <Field
        tw="self-start mt-2"
        name="coverage.enabled"
        type="checkbox"
        component={Fields.Checkbox}
      />
      <Field
        name="coverage.condition.value"
        component={ThresholdValueField}
        disabled={!conditionSettingByType?.coverage?.enabled}
        parse={parseCoverage}
      >
        <div tw="text-14 leading-16 text-monochrome-black" data-test="quality-gate-settings:condtion:coverage">
          Build coverage
          <div tw="text-10 leading-16 text-monochrome-default" data-test="quality-gate-settings:condtion-status:coverage">
            Minimum percentage of build covered by tests
          </div>
        </div>
      </Field>
      <div tw="justify-self-end mt-2 text-14 leading-16 text-monochrome-default">%</div>
    </GridWrapper>
    <GridWrapper>
      <Field
        tw="self-start mt-2"
        name="risks.enabled"
        type="checkbox"
        component={Fields.Checkbox}
      />
      <Field
        name="risks.condition.value"
        component={ThresholdValueField}
        disabled={!conditionSettingByType?.risks?.enabled}
        parse={(value: string) => inputLengthRestriction(value, 7)}
      >
        <div tw="text-14 leading-16 text-monochrome-black">
          <div className="flex items-center gap-x-2 w-full" data-test="quality-gate-settings:condtion:risks">
            Risks
            <Tooltip
              message={(
                <div className="flex flex-col items-center w-full">
                  <span>Try to cover all of your risks in current build.</span>
                  <span>Uncovered risks won’t be counted in your next build.</span>
                </div>
              )}
            >
              <Icons.Info tw="text-monochrome-default" width={12} height={12} data-test="quality-gate-settings:info-icon" />
            </Tooltip>
          </div>
          <div tw="text-10 leading-16 text-monochrome-default" data-test="quality-gate-settings:condtion-status:risks">
            Maximum number of risks in the build
          </div>
        </div>
      </Field>
    </GridWrapper>
    <GridWrapper>
      <Field
        tw="self-start mt-2"
        name="tests.enabled"
        type="checkbox"
        component={Fields.Checkbox}
      />
      <Field
        name="tests.condition.value"
        component={ThresholdValueField}
        disabled={!conditionSettingByType?.tests?.enabled}
        parse={(value: string) => inputLengthRestriction(value, 7)}
      >
        <div tw="text-14 leading-16 text-monochrome-black" data-test="quality-gate-settings:condtion:tests">
          Suggested “Tests to run” executed
          <div tw="text-10 leading-16 text-monochrome-default" data-test="quality-gate-settings:condtion-status:tests">
            Maximum number of tests to run in the build
          </div>
        </div>
      </Field>
    </GridWrapper>
  </div>
);
