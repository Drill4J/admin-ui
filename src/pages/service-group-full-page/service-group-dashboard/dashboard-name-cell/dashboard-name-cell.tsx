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
  ({ className, name, additionalInformation, onClick }: Props) => {
    return (
      <div className={className}>
        <NameCell onClick={onClick}>{name}</NameCell>
        <AdditionalInformation>{additionalInformation}</AdditionalInformation>
      </div>
    );
  },
);

const NameCell = dashboardNameCell.nameCell(div({ onClick: () => {} } as { onClick?: () => void }));
const AdditionalInformation = dashboardNameCell.additionalInformation('div');
