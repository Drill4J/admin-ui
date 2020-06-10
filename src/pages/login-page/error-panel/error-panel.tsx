import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './error-panel.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const errorPanel = BEM(styles);

export const ErrorPanel = errorPanel(({ className, children }: Props) => (
  <div className={className}>
    <Icon />
    {children}
  </div>
));

const Icon = errorPanel.icon(Icons.Warning);
