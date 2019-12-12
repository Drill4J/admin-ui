import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { percentFormatter } from 'utils';
import { useCoveragePluginState } from '../../store';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestTypes } from 'types/test-types';

import styles from './coverages-by-type.module.scss';

interface Props {
  className?: string;
  coverageByType: { [testType: string]: TestTypeSummary };
  showRecording?: boolean;
  testContext?: string;
}

const coveragesByType = BEM(styles);

const coverageByTypeDefaults: { [testType: string]: TestTypeSummary } = {
  MANUAL: {
    testType: 'MANUAL',
    coverage: 0,
    testCount: 0,
  },
  AUTO: {
    testType: 'AUTO',
    coverage: 0,
    testCount: 0,
  },
  PERFORMANCE: {
    testType: 'PERFORMANCE',
    coverage: 0,
    testCount: 0,
  },
};

export const CoveragesByType = coveragesByType(
  ({ className, coverageByType, showRecording, testContext }: Props) => {
    const { activeSessions: { testTypes = [] } = {} } = showRecording
      ? useCoveragePluginState()
      : {};
    return (
      <div className={className}>
        <CoverageTypesContainer>
          {Object.values({ ...coverageByTypeDefaults, ...coverageByType }).map(
            ({ testType, coverage = 0, testCount = 0 }) => (
              <CoverageItem key={testType}>
                <TestTypeIcon type={testType} />
                <TestTypeName>{testType.toLocaleLowerCase()}</TestTypeName>
                <TestsCount
                  data-test={`coverage-by-type:test-count:${testContext}-${testType.toLowerCase()}`}
                >
                  ({testCount})
                </TestsCount>
                {showRecording && testTypes.includes(testType) && (
                  <RecordingWrapper>
                    <RecordingIcon />
                    <RecordingText>Rec</RecordingText>
                  </RecordingWrapper>
                )}
                <TestTypeCoverage
                  data-test={`coverage-by-type:test-type-coverage:${testContext}-${testType.toLowerCase()}`}
                >{`${percentFormatter(coverage)}%`}</TestTypeCoverage>
              </CoverageItem>
            ),
          )}
        </CoverageTypesContainer>
      </div>
    );
  },
);

const CoverageTypesContainer = coveragesByType.coverageTypesContaier('div');
const CoverageItem = coveragesByType.coverageItem('div');
const TestTypeIcon = coveragesByType.testTypeIcon(div({} as { type: TestTypes }));
const RecordingWrapper = coveragesByType.recordingWrapper(Panel);
const RecordingIcon = coveragesByType.recordingIcon('span');
const RecordingText = coveragesByType.recordingText('span');
const TestTypeName = coveragesByType.testTypeName('div');
const TestsCount = coveragesByType.testsCount('span');
const TestTypeCoverage = coveragesByType.testTypeCoverage('div');
