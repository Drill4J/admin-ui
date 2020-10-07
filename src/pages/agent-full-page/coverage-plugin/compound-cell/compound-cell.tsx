import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText } from '@drill4j/ui-kit';

import styles from './compound-cell.module.scss';

interface Props {
  className?: string;
  item?: { [key: string]: string | number };
  pathKey: string;
  nameKey: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary';
}

const compoundCell = BEM(styles);

export const CompoundCell = compoundCell(
  ({
    className,
    pathKey,
    nameKey = 'name',
    icon,
    item: { [nameKey]: name, [pathKey]: path } = {},
  }: Props) => (
    <span className={className}>
      {icon && <Prefix>{icon}</Prefix>}
      <Content>
        <ClassName title={String(name)}>{name}</ClassName>
        <ClassPath title={String(path)}>{path}</ClassPath>
      </Content>
    </span>
  ),
);

const Prefix = compoundCell.prefix('div');
const Content = compoundCell.content('div');
const ClassName = compoundCell.className(OverflowText);
const ClassPath = compoundCell.classPath(OverflowText);
