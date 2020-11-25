import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './row-expander.module.scss';

interface Props {
  className?: string;
  expanded?: boolean;
  onClick: () => void;
}

const rowExpander = BEM(styles);

export const RowExpander = rowExpander(({
  className, expanded, onClick,
}: Props) => (
  <div className={className} onClick={onClick}>
    <IconWrapper expanded={expanded}>
      <Icons.Expander />
    </IconWrapper>
  </div>
));

const IconWrapper = rowExpander.icon(div({} as { expanded?: boolean; }));
