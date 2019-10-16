import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import styles from './action-section.module.scss';
import { Icons } from '../../../../../components';

interface Props {
  className?: string;
  label?: string;
  count?: number;
  onClick?: () => void;
  type?: 'error';
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(
  ({ className, label, count = 0, onClick, type }: Props) => {
    return (
      <div className={className}>
        <Action>
          <ActionName>{label}</ActionName>
          <Count onClick={onClick} type={count ? type : ''} clickable={Boolean(count)}>
            {`${count} `}
            {count > 0 && type === 'error' && <Icons.Warning />}
          </Count>
        </Action>
      </div>
    );
  },
);

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const Count = actionSection.count(
  span({ onClick: () => {} } as { clickable?: boolean; onClick?: () => void }),
);
