import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { MethodsSidebar } from '../../methods-sidebar';

import styles from './methods-section.module.scss';

interface Props {
  className?: string;
  title: string;
  methodsCount?: { total?: number; covered?: number};
  additionalInfo?: React.ReactNode;
  type: 'all' | 'modified' | 'new' | 'deleted';
}

const methodsSection = BEM(styles);

export const MethodsSection = methodsSection(
  ({
    className,
    title,
    methodsCount: { total = 0, covered = 0 } = {},
    additionalInfo,
    type,
  }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
      <div className={className}>
        <Total
          data-test={`methods-section:total:${title.toLowerCase()}`}
          onClick={() => total && setIsSidebarOpen(true)}
          clickable={Boolean(total)}
        >
          {total}
        </Total>
        <AdditionalInfo>
          {!additionalInfo ? (
            <>
              <AdditionalInfoItem>
                <AdditionalInfoItemHeader>Covered</AdditionalInfoItemHeader>
                <AdditionalInfoItemValue
                  data-test={`methods-section:covered:${title.toLowerCase()}`}
                >
                  {covered}
                </AdditionalInfoItemValue>
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                <AdditionalInfoItemHeader>Not covered</AdditionalInfoItemHeader>
                <AdditionalInfoItemValue
                  data-test={`methods-section:not-covered:${title.toLowerCase()}`}
                >
                  {total - covered}
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
            type={type}
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
