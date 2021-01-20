/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
