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
import { useRef } from 'react';
import {
  MainProgressBar, AdditionalProgressBar, StripedProgressBar, Tooltip, useElementSize,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { percentFormatter } from 'utils';

interface Props {
  buildCodeCoverage: number;
  uniqueCodeCoverage: number;
  overlappingCode: number;
  active: boolean;
}

const Message = styled.div`
  ${tw`text-center`}
`;

export const MultiProgressBar = ({
  buildCodeCoverage = 0, uniqueCodeCoverage = 0, overlappingCode = 0, active,
}: Props) => {
  const node = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(node);

  return (
    <div tw="relative w-full h-8 rounded bg-monochrome-light-tint" ref={node}>
      <Tooltip
        message={(
          <Message>
            <span tw="font-bold">{percentFormatter(buildCodeCoverage)}%</span> of current build has <br />
            already been covered by tests
          </Message>
        )}
      >
        <MainProgressBar value={`${buildCodeCoverage * (width / 100)}px`} testContext="build-coverage" />
      </Tooltip>
      <div tw="flex absolute bottom-1/2 transform translate-y-1/2" style={{ left: `${buildCodeCoverage - overlappingCode}%` }}>
        <Tooltip
          message={(
            <Message>
              <span tw="font-bold">
                {percentFormatter(overlappingCode)}%
              </span> of current build coverage <br /> has been overlapped in active scope
            </Message>
          )}
        >
          <div
            tw="flex"
            data-test="multi-progress-bar:overlapping-code-progress-bar"
            style={{ width: `${overlappingCode * (width / 100)}px`, transform: 'scale(-1)' }}
          >
            {active
              ? <StripedProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />
              : <AdditionalProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />}
          </div>
        </Tooltip>
        <Tooltip
          message={(
            <Message>
              Active scope additionally covered <span tw="font-bold">+{percentFormatter(uniqueCodeCoverage)}%</span>. <br />
              Finish your scope to add it to your total build coverage.
            </Message>
          )}
        >
          {active
            ? <StripedProgressBar type="primary" value={`${uniqueCodeCoverage * (width / 100)}px`} />
            : (
              <AdditionalProgressBar
                type="primary"
                value={`${uniqueCodeCoverage * (width / 100)}px`}
                testContext="unique-code-progress-bar"
              />
            )}
        </Tooltip>
      </div>
    </div>
  );
};
