import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Panel } from '@drill4j/ui-kit';

import { TestsToRunSummary } from 'types/tests-to-run-summary';
import { convertToPercentage, getDuration, percentFormatter } from 'utils';
import { GetSuggestedTestsModal } from './get-suggested-tests-modal';
import { SavedTimeSection } from './saved-time-section';

import styles from './tests-to-run-header.module.scss';

interface AgentInfo {
  agentType: string;
  buildVersion: string;
  previousBuildVersion: string;
  activeBuildVersion: string;
}
interface Props {
  className?: string;
  agentInfo: AgentInfo;
  previousBuildAutoTestsCount: number;
  previousBuildTestsDuration: number;
  summaryTestsToRun: TestsToRunSummary;
}

const testsToRunHeader = BEM(styles);

export const TestsToRunHeader = testsToRunHeader(({
  className, agentInfo, previousBuildAutoTestsCount, previousBuildTestsDuration, summaryTestsToRun,
}: Props) => {
  const {
    stats: { duration: currentDuration = 0, parentDuration = 0, total: totalTestsToRun = 0 } = {},
    statsByType: { AUTO: { total: totalAutoTestsToRun = 0, completed: completedAutoTestsToRun = 0 } = {} } = {},
  } = summaryTestsToRun;
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const {
    buildVersion, previousBuildVersion, activeBuildVersion, agentType,
  } = agentInfo;
  const totalDuration = getDuration(previousBuildTestsDuration);
  const estimatedTimeSaved = getDuration(previousBuildTestsDuration - parentDuration);
  const totalTimeSaved = getDuration(previousBuildTestsDuration - currentDuration);

  return (
    <>
      <div className={className}>
        <Panel align="space-between">
          <div>
            <Title data-test="tests-to-run-header:title">
              Tests to Run
              <Count>{totalTestsToRun}</Count>
            </Title>
            <SubTitle data-test="tests-to-run-header:subtitle">
              Build:
              <CurrentBuildVersion data-test="tests-to-run-header:current-build-version">{buildVersion}</CurrentBuildVersion>
              <ComparedBuildVersion data-test="tests-to-run-header:compared-build-version">
                (compared to Build {previousBuildVersion})
              </ComparedBuildVersion>
            </SubTitle>
          </div>
          <Actions>
            {activeBuildVersion === buildVersion && (
              <Button
                type="secondary"
                size="large"
                onClick={() => setModalIsOpen(true)}
                data-test="tests-to-run-header:get-suggested-tests-button"
                disabled={!totalTestsToRun}
              >
                Get Suggested Tests
              </Button>
            )}
            <SavedTimeSection
              previousBuildAutoTestsCount={previousBuildAutoTestsCount}
              label="total duration"
              message={getTotalDurationTooltipMessage(previousBuildAutoTestsCount)}
            >
              {totalDuration.hours}:{totalDuration.minutes}:{totalDuration.seconds}
            </SavedTimeSection>
            <SavedTimeSection
              previousBuildAutoTestsCount={previousBuildAutoTestsCount}
              label="estimated time saved"
              percentage={totalAutoTestsToRun
                ? percentFormatter(convertToPercentage(previousBuildTestsDuration - parentDuration, previousBuildTestsDuration))
                : undefined}
              message={previousBuildAutoTestsCount && getEstimatedTimeSavedTooltipMessage(totalAutoTestsToRun)}
            >
              {totalAutoTestsToRun
                ? `${estimatedTimeSaved.hours}:${estimatedTimeSaved.minutes}:${estimatedTimeSaved.seconds}`
                : '––:––:––'}
            </SavedTimeSection>
            <SavedTimeSection
              previousBuildAutoTestsCount={previousBuildAutoTestsCount}
              label="total time saved"
              percentage={totalAutoTestsToRun && totalAutoTestsToRun === completedAutoTestsToRun
                ? percentFormatter(convertToPercentage(previousBuildTestsDuration - currentDuration, previousBuildTestsDuration))
                : undefined}
              message={getTotalSavedTimeTooltipMessage(totalAutoTestsToRun - completedAutoTestsToRun)}
            >
              { totalAutoTestsToRun && totalAutoTestsToRun === completedAutoTestsToRun
                ? `${totalTimeSaved.hours}:${totalTimeSaved.minutes}:${totalTimeSaved.seconds}`
                : '––:––:––' }
            </SavedTimeSection>
          </Actions>
        </Panel>
      </div>
      {modalIsOpen && <GetSuggestedTestsModal isOpen={modalIsOpen} onToggle={setModalIsOpen} agentType={agentType} />}
    </>
  );
});

const Title = testsToRunHeader.title('div');
const Count = testsToRunHeader.count('div');
const SubTitle = testsToRunHeader.subTitle('div');
const Actions = testsToRunHeader.actions('div');
const CurrentBuildVersion = testsToRunHeader.currentBuildVersion('span');
const ComparedBuildVersion = testsToRunHeader.comparedBuildVersion('span');

function getTotalDurationTooltipMessage(previousBuildAutoTestsCount: number) {
  return previousBuildAutoTestsCount
    ? <span>Auto tests total duration</span>
    : <span>No data about Auto tests duration in the parent build</span>;
}

function getEstimatedTimeSavedTooltipMessage(autoTestsCount: number) {
  return autoTestsCount
    ? <span>The sum of the suggested Auto tests<br /> duration in the parent build</span>
    : <span>No suggested Auto tests to run in current build</span>;
}

function getTotalSavedTimeTooltipMessage(autoTestsToRunCount: number) {
  return autoTestsToRunCount ? (
    <span>Data about saved time will be displayed<br />when all Auto tests will have the state done </span>) : null;
}
