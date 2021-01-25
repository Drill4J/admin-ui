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
import { Panel, Tooltip } from '@drill4j/ui-kit';

import styles from './saved-time-section.module.scss';

interface Props {
  className?: string;
  percentage?: number;
  previousBuildAutoTestsCount: number;
  message: React.ReactNode;
  children: React.ReactNode;
  label: React.ReactNode;
}

const savedTimeSection = BEM(styles);

export const SavedTimeSection = savedTimeSection(
  ({
    className, label, percentage, message, children, previousBuildAutoTestsCount,
  }: Props) => (
    <div className={className}>
      <Content data-test={`information-section:${label}`}>
        <Tooltip
          message={message && <Message>{message}</Message>}
        >
          <Title>{label}</Title>
          <Value verticalAlign="center">
            <Duration>{previousBuildAutoTestsCount ? children : 'n/a'}</Duration>
            {typeof percentage === 'number' && <Percentage>{percentage}%</Percentage>}
          </Value>
        </Tooltip>
      </Content>
    </div>
  ),
);

const Content = savedTimeSection.content('div');
const Title = savedTimeSection.title('div');
const Duration = savedTimeSection.duration('span');
const Percentage = savedTimeSection.percentage('span');
const Value = savedTimeSection.value(Panel);
const Message = savedTimeSection.message(Panel);
