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
import { Button } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { TestsToRunSummary } from 'types/tests-to-run-summary';
import { convertToPercentage, getDuration, percentFormatter } from 'utils';
import { GetSuggestedTestsModal } from './get-suggested-tests-modal';
import { SavedTimeSection } from './saved-time-section';

interface AgentInfo {
  agentType: string;
  buildVersion: string;
  previousBuildVersion: string;
  activeBuildVersion: string;
}
interface Props {
  agentInfo: AgentInfo;
  previousBuildAutoTestsCount: number;
  previousBuildTestsDuration: number;
  summaryTestsToRun: TestsToRunSummary;
}

const SubTitle = styled.div`
  ${tw`grid mr-4 text-14 leading-24 font-bold text-monochrome-default`};
  grid-template-columns: max-content minmax(auto, max-content) max-content minmax(auto, max-content);
`;

export const TestsToRunHeader = ({
  agentInfo,
  previousBuildAutoTestsCount,
  previousBuildTestsDuration,
  summaryTestsToRun,
}: Props) => {
  const {
    stats: {
      duration: currentDuration = 0,
      parentDuration = 0,
      total: totalTestsToRun = 0,
      completed: completedTestsToRun = 0,
    } = {},
    statsByType: {
      AUTO: { total: totalAutoTestsToRun = 0, completed: completedAutoTestsToRun = 0 } = {},
    } = {},
  } = summaryTestsToRun;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { buildVersion, previousBuildVersion, activeBuildVersion, agentType } = agentInfo;
  const totalDuration = getDuration(previousBuildTestsDuration);
  const estimatedTimeSaved = getDuration(previousBuildTestsDuration - parentDuration);
  const totalTimeSaved = getDuration(
    previousBuildTestsDuration - currentDuration > 0
      ? previousBuildTestsDuration - currentDuration
      : 0,
  );

  return (
    <>
      <div tw="flex items-center h-20 border-b border-monochrome-medium-tint">
        <div tw="flex justify-between items-center w-full">
          <div>
            <div
              tw="flex gap-x-2 text-24 leading-36 font-light text-monochrome-black"
              data-test="tests-to-run-header:title"
            >
              Tests to Run
              <div tw="text-monochrome-default">{totalTestsToRun - completedTestsToRun}</div>
            </div>
            <SubTitle data-test="tests-to-run-header:subtitle">
              Build:
              <div
                tw="max-w-280px mr-2 ml-1 text-monochrome-black"
                className="text-ellipsis"
                data-test="tests-to-run-header:current-build-version"
                title={buildVersion}
              >
                {buildVersion}
              </div>
              Compared to:
              <div
                tw="max-w-280px ml-1 text-monochrome-black"
                className="text-ellipsis"
                data-test="tests-to-run-header:compared-build-version"
                title={previousBuildVersion}
              >
                {previousBuildVersion}
              </div>
            </SubTitle>
          </div>
          <div tw="flex items-center gap-6 mr-10">
            {activeBuildVersion === buildVersion && (
              <Button
                secondary
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
              percentage={
                totalAutoTestsToRun
                  ? percentFormatter(
                      convertToPercentage(
                        previousBuildTestsDuration - parentDuration,
                        previousBuildTestsDuration,
                      ),
                    )
                  : undefined
              }
              message={
                previousBuildAutoTestsCount
                  ? getEstimatedTimeSavedTooltipMessage(totalAutoTestsToRun)
                  : null
              }
            >
              {totalAutoTestsToRun
                ? `${estimatedTimeSaved.hours}:${estimatedTimeSaved.minutes}:${estimatedTimeSaved.seconds}`
                : '––:––:––'}
            </SavedTimeSection>
            <SavedTimeSection
              previousBuildAutoTestsCount={previousBuildAutoTestsCount}
              label="total time saved"
              percentage={
                totalAutoTestsToRun && totalAutoTestsToRun === completedAutoTestsToRun
                  ? percentFormatter(
                      convertToPercentage(
                        previousBuildTestsDuration - currentDuration,
                        previousBuildTestsDuration,
                      ),
                    )
                  : undefined
              }
              message={getTotalSavedTimeTooltipMessage(
                totalAutoTestsToRun - completedAutoTestsToRun,
              )}
            >
              {totalAutoTestsToRun && totalAutoTestsToRun === completedAutoTestsToRun
                ? `${totalTimeSaved.hours}:${totalTimeSaved.minutes}:${totalTimeSaved.seconds}`
                : '––:––:––'}
            </SavedTimeSection>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <GetSuggestedTestsModal
          isOpen={modalIsOpen}
          onToggle={setModalIsOpen}
          agentType={agentType}
        />
      )}
    </>
  );
};

function getTotalDurationTooltipMessage(previousBuildAutoTestsCount: number) {
  return previousBuildAutoTestsCount ? (
    <span>Auto Tests total duration in the parent build</span>
  ) : (
    <span>No data about Auto Tests duration in the parent build</span>
  );
}

function getEstimatedTimeSavedTooltipMessage(autoTestsCount: number) {
  return autoTestsCount ? (
    <span>
      Potentially saved time after running only
      <br />
      the suggested Auto Tests
    </span>
  ) : (
    <span>No suggested Auto Tests to run in current build</span>
  );
}

function getTotalSavedTimeTooltipMessage(autoTestsToRunCount: number) {
  return autoTestsToRunCount ? (
    <span>
      Data about saved time will be displayed
      <br />
      when all Auto Tests will have the state done{' '}
    </span>
  ) : null;
}
