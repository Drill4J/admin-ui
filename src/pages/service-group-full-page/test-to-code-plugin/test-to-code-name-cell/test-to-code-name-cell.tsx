import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './test-to-code-name-cell.module.scss';

interface Props {
  className?: string;
  name: string;
  additionalInformation?: string;
  onClick?: () => void;
}

const testToCodeNameCell = BEM(styles);

export const TestToCodeNameCell = testToCodeNameCell(
  ({
    className, name, additionalInformation, onClick,
  }: Props) => (
    <div className={className}>
      <NameCell onClick={onClick} data-test="test-to-code-name-cell:name-cell">{name}</NameCell>
      <AdditionalInformation data-test="test-to-code-name-cell:additional-information">
        {additionalInformation}
      </AdditionalInformation>
    </div>
  ),
);

const NameCell = testToCodeNameCell.nameCell(div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; 'data-test'?: string }));
const AdditionalInformation = testToCodeNameCell.additionalInformation(div({ 'data-test': '' } as {'data-test'?: string}));
