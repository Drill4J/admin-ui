import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { EllipsisOverflowText } from '@drill4j/ui-kit';

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
      <AdditionalInformation data-test="test-to-code-name-cell:additional-information" title={additionalInformation}>
        {additionalInformation}
      </AdditionalInformation>
    </div>
  ),
);

const NameCell = testToCodeNameCell.nameCell(div(
  { onClick: () => {}, 'data-test': '', title: '' } as { onClick?: () => void; 'data-test'?: string; title?: string; },
));
const AdditionalInformation = testToCodeNameCell.additionalInformation(EllipsisOverflowText);
