import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';

import styles from './action-section.module.scss';

interface Props {
  className?: string;
  label?: React.ReactNode;
  count?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(
  ({
    className, label, count, onClick,
  }: Props) => (
    <div className={className}>
      <Action data-test={`action-section:action:${label}`}>
        <ActionName>{label}</ActionName>
        {count ? (
          <Count onClick={onClick} data-test={`action-section:count:${label}`}>
            {count}
            <LinkIcon width={8} height={8} />
          </Count>
        ) : <ZeroValue data-test={`action-section:count:${label}`}>{count}</ZeroValue>}
      </Action>
    </div>
  ),
);

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const Count = actionSection.count(Panel);
const LinkIcon = actionSection.linkIcon(Icons.Expander);
const ZeroValue = actionSection.zeroValue('div');
