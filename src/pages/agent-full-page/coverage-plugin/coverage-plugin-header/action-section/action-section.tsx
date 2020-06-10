import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './action-section.module.scss';

interface Props {
  className?: string;
  label?: string;
  count?: number;
  onClick?: () => void;
  type?: 'error';
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(
  ({
    className, label, count = 0, onClick, type,
  }: Props) => (
    <div className={className}>
      <Action>
        <ActionName>{label}</ActionName>
        <Count
          onClick={onClick}
          type={count ? type : ''}
          clickable={Boolean(count)}
          data-test={`action-section:count:${label}`}
        >
          {`${count} `}
          {count > 0 && type === 'error' && <Icons.Warning />}
        </Count>
      </Action>
    </div>
  ),
);

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const Count = actionSection.count(
  span({ 'data-test': '', onClick: () => {} } as {
    'data-test'?: string;
    clickable?: boolean;
    onClick?: () => void;
  }),
);
