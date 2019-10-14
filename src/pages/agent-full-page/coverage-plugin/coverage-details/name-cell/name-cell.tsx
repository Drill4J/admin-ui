import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { OverflowText } from '../../../../../components';

import styles from './name-cell.module.scss';

interface Props {
  className?: string;
  icon?: React.ReactNode;
  value?: string;
}

const nameCell = BEM(styles);

export const NameCell = nameCell(({ className, icon, value }: Props) => (
  <span className={className}>
    {icon && <Prefix>{icon}</Prefix>}
    <Content>{value}</Content>
  </span>
));

const Prefix = nameCell.prefix('div');
const Content = nameCell.content(OverflowText);
