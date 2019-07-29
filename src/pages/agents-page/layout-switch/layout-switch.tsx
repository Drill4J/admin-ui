import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './layout-switch.module.scss';
import { Icons } from '../../../components';

interface Props {
  className?: string;
  onLeftClick: () => any;
  onRightClick: () => any;
  isLeftActive: boolean;
}

interface ItemProps {
  active?: boolean;
}

const layoutSwitch = BEM(styles);

export const LayoutSwitch = layoutSwitch(
  ({ className, isLeftActive, onLeftClick, onRightClick }: Props) => {
    return (
      <div className={className}>
        <LeftItem active={isLeftActive} onClick={onLeftClick}>
          <Icons.GridLayout />
        </LeftItem>
        <RightItem active={!isLeftActive} onClick={onRightClick}>
          <Icons.ListLayout />
        </RightItem>
      </div>
    );
  },
);

const LeftItem = layoutSwitch.leftItem(div({ onClick: () => {} } as ItemProps));
const RightItem = layoutSwitch.rightItem(div({ onClick: () => {} } as ItemProps));
