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

import { convertToPercentage } from 'utils';

import styles from './cards.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  covered?: number;
  totalCount?: number;
  label: string;
  testContext?: string;
}

export const BuildMethodsCard = BEM(styles)(({
  className, children, covered = 0, totalCount = 0, label, testContext,
}: Props) => (
  <Panel className={className} direction="column" align="space-between">
    <Panel align="space-between">
      <Label data-test={`build-methods-card:label:${label}`}>{label}</Label>
      <TotalCount data-test={`build-methods-card:total-count:${label}`}>{totalCount}</TotalCount>
    </Panel>
    <Info>
      <Panel align="space-between">
        <Covered data-test={`build-methods-card:covered-count:${label}`}>{covered}</Covered>
        <span data-test={`build-methods-card:${testContext}`}>{children}</span>
      </Panel>
      <CoverageBar>
        <Progress style={{ width: `${convertToPercentage(covered, totalCount)}%` }} />
      </CoverageBar>
    </Info>
  </Panel>
));

const Covered = BEM(styles).covered('div');
const Info = BEM(styles).info('div');
const CoverageBar = BEM(styles).coverageBar('div');
const Progress = BEM(styles).progress('div');
const Label = BEM(styles).label('span');
const TotalCount = BEM(styles).totalCount('span');
