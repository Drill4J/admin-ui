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
import { nanoid } from 'nanoid';
import { Icons } from '@drill4j/ui-kit';

import styles from './recommended-actions.module.scss';

interface Props {
  className?: string;
  recommendations?: string[];
}

const recommendedActions = BEM(styles);

export const RecommendedActions = recommendedActions(
  ({ className, recommendations = [] }: Props) => (
    <div className={className}>
      <Title>Recommended actions</Title>
      <Content>
        {recommendations.map((action: string) => (
          <ActionName key={nanoid()}>
            <ActionIcon height={16} width={16} />
            {action}
          </ActionName>
        ))}
      </Content>
    </div>
  ),
);

const Title = recommendedActions.title('div');
const Content = recommendedActions.content('div');
const ActionIcon = recommendedActions.actionIcon(Icons.Checkbox);
const ActionName = recommendedActions.actionName('span');
