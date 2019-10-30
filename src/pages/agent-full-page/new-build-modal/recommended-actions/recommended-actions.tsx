import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './recommended-actions.module.scss';
import { Icons } from '../../../../../../components';

interface Props {
  className?: string;
  newBuild?: any;
}

const recommendedActions = BEM(styles);

export const RecommendedActions = recommendedActions(
  ({ className, newBuild: { actions } }: Props) => {
    return (
      <div className={className}>
        <Title>Recommended actions</Title>
        <Content>
          {actions.map((action: any, i: number) => (
            <ActionName key={i}>
              <IconsWrapper>
                <Icons.Checkbox height={16} width={16} />
              </IconsWrapper>
              {action}
            </ActionName>
          ))}
        </Content>
      </div>
    );
  },
);

const Title = recommendedActions.title('div');
const Content = recommendedActions.content('div');
const IconsWrapper = recommendedActions.iconsWrapper('div');
const ActionName = recommendedActions.actionName('span');
