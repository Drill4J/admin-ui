import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText } from '@drill4j/ui-kit';

import styles from './name-cell.module.scss';

interface Props {
  className?: string;
  icon?: React.ReactNode;
  value?: string;
  type?: 'primary' | 'secondary';
  testContext?: string;
}

const nameCell = BEM(styles);

export const NameCell = nameCell(({
  className, icon, value, testContext,
}: Props) => (
  <span className={className}>
    {icon && <Prefix>{icon}</Prefix>}
    <Content data-test={`name-cell:content:${testContext}`}>{value}</Content>
  </span>
));

const Prefix = nameCell.prefix('div');
const Content = nameCell.content(OverflowText);
