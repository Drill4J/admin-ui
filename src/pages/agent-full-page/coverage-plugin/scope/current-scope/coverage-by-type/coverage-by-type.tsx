import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../../layouts';
import { percentFormatter } from '../../../../../../utils';

import styles from './coverage-by-type.module.scss';

interface Props {
  className?: string;
  testType: string;
  coverage: number;
  testCount: number;
  recording?: boolean;
}

const coverageByType = BEM(styles);

export const CoverageByType = coverageByType(
  ({ className, testType, coverage, testCount, recording }: Props) => (
    <div className={className}>
      <Panel>
        <TestTypeIcon type={testType} />
        <TestName>{testType}</TestName>
      </Panel>
      <Panel>
        <Coverage>{percentFormatter(coverage)}%</Coverage>
        {recording && (
          <>
            <RecordingIcon />
            <RecordingText>Rec</RecordingText>
          </>
        )}
      </Panel>

      <TestsCount>{testCount} tests</TestsCount>
    </div>
  ),
);

const TestTypeIcon = coverageByType.testTypeIcon(div({} as { type: string }));
const TestName = coverageByType.testName('div');
const RecordingIcon = coverageByType.recordingIcon('span');
const RecordingText = coverageByType.recordingText('span');
const Coverage = coverageByType.coverage('div');
const TestsCount = coverageByType.testsCount('div');
