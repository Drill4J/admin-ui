import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './items-actions.module.scss';

interface Props {
  className?: string;
  itemsCount: number;
  actions: Array<{ label: string; onClick: () => void; count: number }>;
}

const itemsActions = BEM(styles);

export const ItemsActions = itemsActions(({ className, itemsCount, actions }: Props) =>
  itemsCount > 0 ? (
    <div className={className}>
      <ItemsCount>{`${itemsCount} selected`}</ItemsCount>
      {actions.map(
        ({ count, label, onClick }) =>
          count > 0 && (
            <Action key={label} onClick={onClick}>
              {label}
            </Action>
          ),
      )}
    </div>
  ) : null,
);

const ItemsCount = itemsActions.count('span');
const Action = itemsActions.action('span');
