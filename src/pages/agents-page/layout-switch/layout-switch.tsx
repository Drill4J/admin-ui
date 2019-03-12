import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './layout-switch.module.scss';
import { Icons } from '../../../components';

interface Props {
  className?: string;
}

interface ItemProps {
  active?: boolean;
}

const layoutSwitch = BEM(styles);

export const LayoutSwitch = layoutSwitch(({ className }: Props) => {
  return (
    <div className={className}>
      <LeftItem active>
        <Icons.GridLayout />
      </LeftItem>
      <RightItem>
        <Icons.ListLayout />
      </RightItem>
    </div>
  );
});

const LeftItem = layoutSwitch.leftItem(div({ active: false } as ItemProps));
const RightItem = layoutSwitch.rightItem(div({ active: false } as ItemProps));
