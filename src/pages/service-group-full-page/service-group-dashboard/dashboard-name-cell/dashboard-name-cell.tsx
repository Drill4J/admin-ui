import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './dashboard-name-cell.module.scss';

interface Props {
  className?: string;
  name: string;
  additionalInformation?: string;
  onClick?: () => void;
}

const dashboardNameCell = BEM(styles);

export const DashboardNameCell = dashboardNameCell(
  ({
    className, name, additionalInformation, onClick,
  }: Props) => (
    <div className={className}>
      <NameCell onClick={onClick} data-test="dashboard-name-cell:name-cell">{name}</NameCell>
      <AdditionalInformation data-test="dashboard-name-cell:additional-information">
        {additionalInformation}
      </AdditionalInformation>
    </div>
  ),
);

const NameCell = dashboardNameCell.nameCell(div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; 'data-test'?: string }));
const AdditionalInformation = dashboardNameCell.additionalInformation(div({ 'data-test': '' } as {'data-test'?: string}));
