import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './name-cell.module.scss';

interface Props {
  className?: string;
  item?: { [key: string]: string | number };
  pathKey: string;
}

const nameCell = BEM(styles);

export const NameCell = nameCell(
  ({ className, pathKey, item: { name, [pathKey]: path } = {} }: Props) => (
    <span className={className}>
      <ClassName>{name}</ClassName>
      <ClassPath>{path}</ClassPath>
    </span>
  ),
);

const ClassName = nameCell.className('span');
const ClassPath = nameCell.classPath('span');
