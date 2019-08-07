import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { CardSection } from '../../card';
import { MethodsModal } from '../../methods-modal';
import { MethodsInfo } from '../../../../../types/methods-info';

import styles from './methods-section.module.scss';

interface Props {
  className?: string;
  title: string;
  methodsInfo?: MethodsInfo;
}

const methodsSection = BEM(styles);

export const MethodsSection = methodsSection(
  ({
    className,
    title,
    methodsInfo: { totalCount = 0, coveredCount = 0, methods } = {},
  }: Props) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
      <div className={className}>
        <CardSection header={title}>
          <Total onClick={() => totalCount && setIsModalOpen(true)} clickable={Boolean(totalCount)}>
            {totalCount}
          </Total>
          <AdditionalInfo>
            <AdditionalInfoItem>
              <AdditionalInfoItemHeader>Missed</AdditionalInfoItemHeader>
              <AdditionalInfoItemValue>{totalCount - coveredCount}</AdditionalInfoItemValue>
            </AdditionalInfoItem>
            <AdditionalInfoItem>
              <AdditionalInfoItemHeader>Covered</AdditionalInfoItemHeader>
              <AdditionalInfoItemValue>{coveredCount}</AdditionalInfoItemValue>
            </AdditionalInfoItem>
            <AdditionalInfoItem>
              <AdditionalInfoItemHeader>Ignored</AdditionalInfoItemHeader>
              <AdditionalInfoItemValue>{0}</AdditionalInfoItemValue>
            </AdditionalInfoItem>
          </AdditionalInfo>
        </CardSection>
        {isModalOpen && (
          <MethodsModal
            isOpen={isModalOpen}
            onToggle={setIsModalOpen}
            title={`${title.toLowerCase()} methods`}
            methodsDetails={methods}
          />
        )}
      </div>
    );
  },
);

const Total = methodsSection.total(
  span({ onClick: () => {} } as { clickable?: boolean; onClick: () => void }),
);
const AdditionalInfo = methodsSection.additionalInfo('div');
const AdditionalInfoItem = methodsSection.additionalInfoItem('div');
const AdditionalInfoItemHeader = methodsSection.additionalInfoItemHeader('div');
const AdditionalInfoItemValue = methodsSection.additionalInfoItemValue('div');
