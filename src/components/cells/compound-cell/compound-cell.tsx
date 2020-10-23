import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText } from '@drill4j/ui-kit';

import styles from './compound-cell.module.scss';

interface Props {
  className?: string;
  cellName: string;
  cellAdditionalInfo?: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary';
}

const compoundCell = BEM(styles);

export const CompoundCell = compoundCell(({
  className, icon, cellName, cellAdditionalInfo,
}: Props) => (
  <div className={className}>
    <div>{icon}</div>
    <CellContent>
      <CellName title={cellName}>{cellName}</CellName>
      <CellAdditionalInfo title={cellAdditionalInfo}>{cellAdditionalInfo}</CellAdditionalInfo>
    </CellContent>
  </div>
));

const CellContent = compoundCell.cellContent('div');
const CellName = compoundCell.cellName(OverflowText);
const CellAdditionalInfo = compoundCell.cellAdditionalInfo(OverflowText);
