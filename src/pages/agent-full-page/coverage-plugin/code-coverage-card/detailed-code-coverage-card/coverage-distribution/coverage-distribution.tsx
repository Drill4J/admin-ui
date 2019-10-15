import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../../layouts';
import { Icons } from '../../../../../../components';
import { percentFormatter } from '../../../../../../utils';
import { useBuildVersion } from '../../../use-build-version';
import { TestTypeSummary } from '../../../../../../types/test-type-summary';

import styles from './coverage-distribution.module.scss';

interface Props {
  className?: string;
  coverageByType: { [testType: string]: TestTypeSummary };
  showRecording?: boolean;
}

const coverageDistribution = BEM(styles);

const coverageByTypeDefaults = {
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

export const CoverageDistribution = coverageDistribution(
  ({ className, coverageByType, showRecording }: Props) => {
    const { testTypes: activeSessionTestTypes = [] } = showRecording
      ? useBuildVersion<{ testTypes: string[] }>('/active-sessions') || {}
      : {};
    return (
      <div className={className}>
        <DistributionContainer>
          {Object.values({ ...coverageByTypeDefaults, ...coverageByType }).map(
            ({ testType, coverage = 0, testCount = 0 }) => (
              <CoverageItem key={testType}>
                <Panel align="space-between">
                  <Panel>
                    <Icons.Test height={16} width={16} />
                    <ItemName>{testType.toLocaleLowerCase()}</ItemName>
                    {showRecording && activeSessionTestTypes.includes(testType) && (
                      <RecordingWrapper>
                        <RecordingIcon />
                        <RecordingText>Rec</RecordingText>
                      </RecordingWrapper>
                    )}
                  </Panel>
                  <TestsCount>{testCount}</TestsCount>
                </Panel>
                <Panel>
                  <Panel>
                    <Icons.Function height={16} width={16} />
                    <ItemName>Methods covered</ItemName>
                  </Panel>
                  <TestTypeCoverage>({`${percentFormatter(coverage)}%`})</TestTypeCoverage>
                </Panel>
              </CoverageItem>
            ),
          )}
        </DistributionContainer>
      </div>
    );
  },
);

const DistributionContainer = coverageDistribution.distributionContainer('div');
const CoverageItem = coverageDistribution.coverageItem('div');
const RecordingWrapper = coverageDistribution.recordingWrapper(Panel);
const RecordingIcon = coverageDistribution.recordingIcon('span');
const RecordingText = coverageDistribution.recordingText('span');
const ItemName = coverageDistribution.itemName('div');
const TestsCount = coverageDistribution.testsCount('span');
const TestTypeCoverage = coverageDistribution.testTypeCoverage('div');