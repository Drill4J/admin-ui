import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { TestTypeSummary } from 'types/test-type-summary';
import { useCoveragePluginState } from '../../../store';

import styles from './coverage-distribution.module.scss';

interface Props {
  className?: string;
  coverageByTestType: TestTypeSummary[];
  showRecording?: boolean;
}

const coverageDistribution = BEM(styles);

export const CoverageDistribution = coverageDistribution(
  ({ className, coverageByTestType, showRecording }: Props) => {
    const { activeSessions: { testTypes = [] } = {} } = showRecording
      ? useCoveragePluginState()
      : {};
    return (
      <div className={className}>
        <DistributionContainer>
          {coverageByTestType.map(({ type = '', summary }) => (
            <CoverageItem key={type}>
              <Panel align="space-between">
                <Panel>
                  <Icons.Test height={16} width={16} />
                  <ItemName>{type.toLowerCase()}</ItemName>
                  {showRecording && testTypes.includes(type as 'AUTO' | 'MANUAL') && (
                    <RecordingWrapper>
                      <RecordingIcon />
                      <RecordingText>Rec</RecordingText>
                    </RecordingWrapper>
                  )}
                </Panel>
                <TestsCount>{summary.testCount}</TestsCount>
              </Panel>
              <Panel>
                <Panel>
                  <Icons.Function height={16} width={16} />
                  <ItemName>Methods covered</ItemName>
                </Panel>
                <TestTypeCoverage>
                  {`(${percentFormatter(summary.coverage?.percentage || 0)}%)`}
                </TestTypeCoverage>
              </Panel>
            </CoverageItem>
          ))}
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
