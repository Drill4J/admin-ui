import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../../layouts';
import { percentFormatter } from '../../../../../../utils';
import { CoverageByType } from '../../../../../../types/coverage-by-type';
import { TestTypes } from '../../../../../../types/test-types';

import styles from './tests-tooltip.module.scss';

interface Props {
  className?: string;
  coverageByType: CoverageByType;
}

const testsTooltip = BEM(styles);

export const TestsTooltip = testsTooltip(({ className, coverageByType }: Props) => {
  return (
    <div className={className}>
      {Object.keys(coverageByType).map((testType) => (
        <CoverageTypeItem align="space-between" key={testType}>
          <Panel>
            <CoverageTypeIcon type={testType as TestTypes} />
            {`${testType.toLowerCase()} (${coverageByType[testType].testCount})`}
          </Panel>
          <CoverageTypeValue>
            {percentFormatter(coverageByType[testType].coverage)}%
          </CoverageTypeValue>
        </CoverageTypeItem>
      ))}
    </div>
  );
});

const CoverageTypeItem = testsTooltip.coverageTypeItem(Panel);
const CoverageTypeIcon = testsTooltip.coverageTypeIcon(span({} as { type?: TestTypes }));
const CoverageTypeValue = testsTooltip.value('span');
