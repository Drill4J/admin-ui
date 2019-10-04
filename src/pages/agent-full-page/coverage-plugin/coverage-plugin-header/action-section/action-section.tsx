import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './action-section.module.scss';

interface Props {
  className?: string;
  label?: string;
  count?: number;
  onClick?: () => void;
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(({ className, label, count, onClick }: Props) => {
  return (
    <div className={className}>
      <Action>
        <ActionName>{label}</ActionName>
        <Count onClick={onClick}>{count}</Count>
      </Action>
    </div>
  );
});

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const Count = actionSection.count('span');
