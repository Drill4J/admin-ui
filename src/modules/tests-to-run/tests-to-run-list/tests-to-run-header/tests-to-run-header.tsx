/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, EllipsisOverflowText } from '@drill4j/ui-kit';

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
    stats: {
      duration: currentDuration = 0, parentDuration = 0, total: totalTestsToRun = 0, completed: completedTestsToRun = 0,
    } = {},
    statsByType: { AUTO: { total: totalAutoTestsToRun = 0, completed: completedAutoTestsToRun = 0 } = {} } = {},
  } = summaryTestsToRun;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    buildVersion, previousBuildVersion, activeBuildVersion, agentType,
  } = agentInfo;
  const totalDuration = getDuration(previousBuildTestsDuration);
  const estimatedTimeSaved = getDuration(previousBuildTestsDuration - parentDuration);
  const totalTimeSaved = getDuration((previousBuildTestsDuration - currentDuration) > 0 ? previousBuildTestsDuration - currentDuration : 0);

  return (
    <>
      <div className={className}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <Title data-test="tests-to-run-header:title">
              Tests to Run
              <Count>{totalTestsToRun - completedTestsToRun}</Count>
            </Title>
            <SubTitle data-test="tests-to-run-header:subtitle">
              Build:
              <CurrentBuildVersion
                data-test="tests-to-run-header:current-build-version"
                title={buildVersion}
              >
                {buildVersion}
              </CurrentBuildVersion>
              Compared to:
              <ComparedBuildVersion data-test="tests-to-run-header:compared-build-version" title={previousBuildVersion}>
                {previousBuildVersion}
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
              message={previousBuildAutoTestsCount ? getEstimatedTimeSavedTooltipMessage(totalAutoTestsToRun) : null}
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
        </div>
      </div>
      {modalIsOpen && <GetSuggestedTestsModal isOpen={modalIsOpen} onToggle={setModalIsOpen} agentType={agentType} />}
    </>
  );
});

const Title = testsToRunHeader.title('div');
const Count = testsToRunHeader.count('div');
const SubTitle = testsToRunHeader.subTitle('div');
const Actions = testsToRunHeader.actions('div');
const CurrentBuildVersion = testsToRunHeader.currentBuildVersion(EllipsisOverflowText);
const ComparedBuildVersion = testsToRunHeader.comparedBuildVersion(EllipsisOverflowText);

function getTotalDurationTooltipMessage(previousBuildAutoTestsCount: number) {
  return previousBuildAutoTestsCount
    ? <span>Auto Tests total duration in the parent build</span>
    : <span>No data about Auto Tests duration in the parent build</span>;
}

function getEstimatedTimeSavedTooltipMessage(autoTestsCount: number) {
  return autoTestsCount
    ? <span>Potentially saved time after running only<br />the suggested Auto Tests</span>
    : <span>No suggested Auto Tests to run in current build</span>;
}

function getTotalSavedTimeTooltipMessage(autoTestsToRunCount: number) {
  return autoTestsToRunCount ? (
    <span>Data about saved time will be displayed<br />when all Auto Tests will have the state done </span>) : null;
}
