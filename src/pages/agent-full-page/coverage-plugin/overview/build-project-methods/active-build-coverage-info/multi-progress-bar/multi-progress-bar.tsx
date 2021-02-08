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
import { BEM } from '@redneckz/react-bem-helper';
import {
  MainProgressBar, AdditionalProgressBar, StripedProgressBar, Tooltip, useElementSize,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './multi-progress-bar.module.scss';

interface Props {
  className?: string;
  buildCodeCoverage: number;
  uniqueCodeCoverage: number;
  overlappingCode: number;
  active: boolean;
}

const multiProgressBar = BEM(styles);

export const MultiProgressBar = multiProgressBar(({
  className, buildCodeCoverage = 0, uniqueCodeCoverage = 0, overlappingCode = 0, active,
}: Props) => {
  const node = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(node);

  return (
    <div className={className} ref={node}>
      <Tooltip
        message={(
          <Message>
            <span className="font-bold">{percentFormatter(buildCodeCoverage)}%</span> of current build has <br />
            already been covered by tests
          </Message>
        )}
      >
        <MainProgressBar value={`${buildCodeCoverage * (width / 100)}px`} testContext="build-coverage" />
      </Tooltip>
      <ScopeCoverage style={{ left: `${buildCodeCoverage - overlappingCode}%` }}>
        <Tooltip
          message={(
            <Message>
              <span tw="font-bold">
                {percentFormatter(overlappingCode)}%
              </span> of current build coverage <br /> has been overlapped in active scope
            </Message>
          )}
        >
          <OverlappingCodeProgressBar
            data-test="multi-progress-bar:overlapping-code-progress-bar"
            style={{ width: `${overlappingCode * (width / 100)}px` }}
          >
            {active
              ? <StripedProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />
              : <AdditionalProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />}
          </OverlappingCodeProgressBar>
        </Tooltip>
        <Tooltip
          message={(
            <Message>
              Active scope additionally covered <b>+{percentFormatter(uniqueCodeCoverage)}%</b>. <br />
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
      </ScopeCoverage>
    </div>
  );
});

const Message = multiProgressBar.message('div');
const ScopeCoverage = multiProgressBar.scopeCoverage('div');
const OverlappingCodeProgressBar = multiProgressBar.overlappingCodeProgressBar('div');
