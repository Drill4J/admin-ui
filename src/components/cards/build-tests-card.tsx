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
import { Panel } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { TestTypeSummary } from 'types/test-type-summary';

import styles from './cards.module.scss';

interface Props {
  className?: string;
  label: string;
  testTypeSummary?: TestTypeSummary;
}

export const BuildTestsCard = BEM(styles)(({
  className, label, testTypeSummary,
}: Props) => {
  const { summary: { testCount = 0, coverage: { percentage = 0 } = {} } = {} } = testTypeSummary || {};
  return (
    <Panel className={className} direction="column" align="space-between">
      <Panel align="space-between">
        <Label data-test={`build-tests-card:label:${label}`}>{label}</Label>
        <TotalCount data-test={`build-tests-card:total-count:${label}`}>{testCount}</TotalCount>
      </Panel>
      <Percentage data-test={`build-tests-card:percentage:${label}`}>{percentFormatter(percentage)}%</Percentage>
    </Panel>
  );
});

const Label = BEM(styles).label('span');
const TotalCount = BEM(styles).totalCount('span');
const Percentage = BEM(styles).percentage('span');
