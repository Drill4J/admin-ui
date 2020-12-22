import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Legend, Panel, Tooltip } from '@drill4j/ui-kit';

import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { TestsInfo } from 'types/tests-info';
import { percentFormatter } from 'utils';
import { useElementSize } from 'hooks';

import styles from './active-build-tests-info.module.scss';

interface Props {
  className?: string;
  testsInfo: TestsInfo;
}

const activeBuildTestsInfo = BEM(styles);

export const ActiveBuildTestsInfo = activeBuildTestsInfo(({ className, testsInfo }: Props) => {
  const {
    AUTO: {
      summary: {
        testCount: autoTestsCount = 0,
        coverage: { percentage: autoTestsPercentage = 0 } = {},
      } = {},
    } = {},
    MANUAL: {
      summary: {
        testCount: manualTestsCount = 0,
        coverage: { percentage: manualTestsPercentage = 0 } = {},
      } = {},
    } = {},
  } = testsInfo;
  const testsExecuted = autoTestsCount + manualTestsCount;
  const ref = React.useRef<HTMLDivElement>(null);
  const { width } = useElementSize(ref);
  const autoTestsBarWidth = (autoTestsCount / testsExecuted) * width;
  const manualTestsBarWidth = (manualTestsCount / testsExecuted) * width;
  const minBarWidth = 4;

  return (
    <div className={className} ref={ref}>
      <Panel align="space-between">
        <Title data-test="active-build-tests-info:title">TESTS EXECUTION</Title>
        <Legend legendItems={[
          { label: 'Auto', color: DATA_VISUALIZATION_COLORS.AUTO },
          { label: 'Manual', color: DATA_VISUALIZATION_COLORS.MANUAL },
        ]}
        />
      </Panel>
      <Info>
        <ExecutedTests data-test="active-build-tests-info:executed-tests">{testsExecuted}</ExecutedTests>
        &nbsp;tests executed in build
      </Info>
      <ExecutedTestsBar data-test="active-build-tests-info:executed-tests-bar">
        <div style={{ position: 'absolute' }}>
          {Boolean(autoTestsCount) && (
            <Tooltip
              message={
                `${autoTestsCount} Auto tests covered ${percentFormatter(autoTestsPercentage)}% of application in the current build`
              }
            >
              <TestsBar
                type="auto"
                style={{
                  width: `${Math.max(autoTestsBarWidth > minBarWidth
                    ? autoTestsBarWidth
                    : autoTestsBarWidth - (minBarWidth - manualTestsBarWidth), minBarWidth)}px`,
                }}
              />
            </Tooltip>
          )}
          {Boolean(manualTestsCount) && (
            <Tooltip
              message={
                `${manualTestsCount} Manual tests covered ${percentFormatter(manualTestsPercentage)}% of application in the current build`
              }
            >
              <TestsBar
                type="manual"
                style={{
                  width: `${Math.max(manualTestsBarWidth > minBarWidth
                    ? manualTestsBarWidth
                    : manualTestsBarWidth - (minBarWidth - autoTestsBarWidth), minBarWidth)}px`,
                }}
              />
            </Tooltip>
          )}
        </div>
      </ExecutedTestsBar>
    </div>
  );
});

const Title = activeBuildTestsInfo.title('div');
const TestsBar = activeBuildTestsInfo.testsBar('div');
const Info = activeBuildTestsInfo.info('div');
const ExecutedTests = activeBuildTestsInfo.executedTests('div');
const ExecutedTestsBar = activeBuildTestsInfo.executedTestsBar('div');
