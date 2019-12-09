import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { MethodsSidebar } from '../../methods-sidebar';
import { MethodsInfo } from '../../../../../types/methods-info';

import styles from './methods-section.module.scss';

interface Props {
  className?: string;
  title: string;
  methodsInfo?: MethodsInfo;
  additionalInfo?: React.ReactNode;
}

const methodsSection = BEM(styles);

export const MethodsSection = methodsSection(
  ({
    className,
    title,
    methodsInfo: { totalCount = 0, coveredCount = 0, methods } = {},
    additionalInfo,
  }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
      <div className={className}>
        <Total
          data-test={`methods-section:total:${title.toLowerCase()}`}
          onClick={() => totalCount && setIsSidebarOpen(true)}
          clickable={Boolean(totalCount)}
        >
          {totalCount}
        </Total>
        <AdditionalInfo>
          {!additionalInfo ? (
            <>
              <AdditionalInfoItem>
                <AdditionalInfoItemHeader>Covered</AdditionalInfoItemHeader>
                <AdditionalInfoItemValue
                  data-test={`methods-section:covered:${title.toLowerCase()}`}
                >
                  {coveredCount}
                </AdditionalInfoItemValue>
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                <AdditionalInfoItemHeader>Not covered</AdditionalInfoItemHeader>
                <AdditionalInfoItemValue
                  data-test={`methods-section:not-covered:${title.toLowerCase()}`}
                >
                  {totalCount - coveredCount}
                </AdditionalInfoItemValue>
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                <AdditionalInfoItemHeader>Excluded</AdditionalInfoItemHeader>
                <AdditionalInfoItemValue
                  data-test={`methods-section:excluded:${title.toLowerCase()}`}
                >
                  {0}
                </AdditionalInfoItemValue>
              </AdditionalInfoItem>
            </>
          ) : (
            additionalInfo
          )}
        </AdditionalInfo>
        {isSidebarOpen && (
          <MethodsSidebar
            isOpen={isSidebarOpen}
            onToggle={setIsSidebarOpen}
            title={`${title.toLowerCase()} methods`}
            methodsDetails={methods}
          />
        )}
      </div>
    );
  },
);

const Total = methodsSection.total(
  span({ 'data-test': '', onClick: () => {} } as {
    'data-test'?: string;
    clickable?: boolean;
    onClick: () => void;
  }),
);
const AdditionalInfo = methodsSection.additionalInfo('div');
const AdditionalInfoItem = methodsSection.additionalInfoItem('div');
const AdditionalInfoItemHeader = methodsSection.additionalInfoItemHeader('div');
const AdditionalInfoItemValue = methodsSection.additionalInfoItemValue('div');
