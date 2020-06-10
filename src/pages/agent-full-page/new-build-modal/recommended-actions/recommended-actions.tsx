import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import nanoid from 'nanoid';
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
