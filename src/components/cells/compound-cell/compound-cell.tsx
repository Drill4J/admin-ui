import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText } from '@drill4j/ui-kit';

import styles from './compound-cell.module.scss';

interface Props {
  className?: string;
  cellName: string;
  cellAdditionalInfo?: string;
  icon?: React.ReactNode;
}

const compoundCell = BEM(styles);

export const CompoundCell = compoundCell(({
  className, icon, cellName, cellAdditionalInfo,
}: Props) => (
  <div className={className}>
    <div>{icon}</div>
    <CellContent>
      <CellName data-test="compound-cell:name" title={cellName}>{cellName}</CellName>
      <CellAdditionalInfo
        data-test="compound-cell:additional-info"
        title={cellAdditionalInfo}
      >
        {cellAdditionalInfo}
      </CellAdditionalInfo>
    </CellContent>
  </div>
));

const CellContent = compoundCell.cellContent('div');
const CellName = compoundCell.cellName(OverflowText);
const CellAdditionalInfo = compoundCell.cellAdditionalInfo(OverflowText);
