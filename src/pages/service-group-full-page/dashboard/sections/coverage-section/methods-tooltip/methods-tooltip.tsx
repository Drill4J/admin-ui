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
import { Count } from 'types/count';

import styles from './methods-tooltip.module.scss';

const methodsTooltip = BEM(styles);

interface Props {
  className?: string;
  coveredMethods: Count;
}

export const MethodsTooltip = methodsTooltip(({ className, coveredMethods: { covered = 0, total = 0 } }: Props) => (
  <div className={className}>
    <div className="d-flex align-items-center w-100">
      <div>covered methods: {covered}/{total}</div>
      <Percent>{percentFormatter((covered / total) * 100)}%</Percent>
    </div>
  </div>
));

const Percent = methodsTooltip.percent('div');
