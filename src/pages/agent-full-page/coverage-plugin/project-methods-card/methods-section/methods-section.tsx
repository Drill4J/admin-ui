import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { CardSection } from '../../card';

import styles from './methods-section.module.scss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  totalCount: number;
  coveredMethodsCount: number;
  missedMethodsCount: number;
  excludedMethodsCount: number;
  onTotalClick?: () => void;
}

const methodsSection = BEM(styles);

export const MethodsSection = methodsSection(
  ({
    className,
    header,
    totalCount,
    coveredMethodsCount,
    missedMethodsCount,
    excludedMethodsCount,
    onTotalClick,
  }: Props) => (
    <div className={className}>
      <CardSection header={header}>
        <Total onClick={() => onTotalClick && onTotalClick()} clickable={Boolean(onTotalClick)}>
          {totalCount}
        </Total>
        <AdditionalInfo>
          <AdditionalInfoItem>
            <AdditionalInfoItemHeader>Covered</AdditionalInfoItemHeader>
            {coveredMethodsCount}
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <AdditionalInfoItemHeader>Missed</AdditionalInfoItemHeader>
            {missedMethodsCount}
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <AdditionalInfoItemHeader>Excluded</AdditionalInfoItemHeader>
            {excludedMethodsCount}
          </AdditionalInfoItem>
        </AdditionalInfo>
      </CardSection>
    </div>
  ),
);

const Total = methodsSection.total(
  div({ onClick: () => {} } as { clickable?: boolean; onClick: () => void }),
);
const AdditionalInfo = methodsSection.additionalInfo('div');
const AdditionalInfoItem = methodsSection.additionalInfoItem('div');
const AdditionalInfoItemHeader = methodsSection.additionalInfoItemHeader('div');
