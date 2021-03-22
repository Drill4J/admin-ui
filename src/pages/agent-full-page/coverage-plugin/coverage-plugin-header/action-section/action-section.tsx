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
import { Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { TestTypeSummary } from 'types/test-type-summary';
import { spacesToDashes } from 'utils';

interface PreviousBuild {
  previousBuildVersion?: string;
  previousBuildTests?: TestTypeSummary[];
}

interface Props {
  label?: string;
  previousBuild?: PreviousBuild;
  children?: React.ReactNode;
}

const TooltipMessage = styled.div`
  ${tw`text-center`}
`;

export const ActionSection =
  ({
    label = '', previousBuild: { previousBuildVersion = '', previousBuildTests = [] } = {}, children,
  }: Props) => (
    <div tw="border-l border-monochrome-medium-tint text-monochrome-default">
      <div tw="ml-4 mr-10 text-20 leading-32 text-monochrome-black" data-test={`action-section:action:${label}`}>
        <Tooltip
          position={label === 'risks' ? 'top-center' : 'top-left'}
          message={getTooltipMessage(label, previousBuildVersion, previousBuildTests.length)}
        >
          <div tw="font-bold text-12 leading-16 uppercase">{label}</div>
          {previousBuildVersion ? children : <span data-test={`action-section:no-value:${spacesToDashes(label)}`}>&ndash;</span> }
        </Tooltip>
      </div>
    </div>
  );

function getTooltipMessage(label: string, buildVersion: string, testsCount: number) {
  if (!buildVersion) {
    return (
      <TooltipMessage>
        There are no data about {label} on the initial build.<br />
        It will be calculated when at least 1 parent build appears.
      </TooltipMessage>
    );
  }
  if (buildVersion && testsCount === 0 && label === 'tests to run') {
    return (
      <TooltipMessage>
        There are no tests in the parent build<br />
        to create a list of suggested tests to run
      </TooltipMessage>
    );
  }
  return undefined;
}
