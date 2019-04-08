import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './name-cell.module.scss';

interface Props {
  className?: string;
  item?: { [key: string]: string | number };
  pathKey: string;
  withMargin?: boolean;
  icon?: React.ReactNode;
}

const nameCell = BEM(styles);

export const NameCell = nameCell(
  ({ className, pathKey, icon, item: { name, [pathKey]: path } = {} }: Props) => (
    <span className={className}>
      {icon && <Prefix>{icon}</Prefix>}
      <Content>
        <ClassName>{name}</ClassName>
        <ClassPath>{path}</ClassPath>
      </Content>
    </span>
  ),
);

const Prefix = nameCell.prefix('div');
const Content = nameCell.content('div');
const ClassName = nameCell.className('span');
const ClassPath = nameCell.classPath('span');
