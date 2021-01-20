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
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './condition.module.scss';

interface Props {
  className?: string;
  passed: boolean;
  type: 'coverage' | 'risks' | 'testsToRun';
  children: React.ReactNode;
  thresholdValue: string;
}

const condition = BEM(styles);

export const Condition = condition(
  ({
    className, passed, type, children, thresholdValue,
  }: Props) => {
    const title = {
      coverage: 'Build coverage',
      risks: 'Risks',
      testsToRun: 'Suggested “Tests to run” executed',
    };
    return (
      <div className={className}>
        {passed ? <Passed width={16} height={16} /> : <Failed width={16} height={16} />}
        <Content>
          {title[type]}
          {children}
        </Content>
        <ThresholdValue data-test={`quality-gate-status:condition:${type}`}>
          {type === 'coverage' ? `${percentFormatter(Number(thresholdValue))}%` : thresholdValue }
        </ThresholdValue>
      </div>
    );
  },
);

const Passed = condition.passed(Icons.Checkbox);
const Failed = condition.failed(Icons.Warning);
const Content = condition.content('div');
const ThresholdValue = condition.thresholdValue('span');
