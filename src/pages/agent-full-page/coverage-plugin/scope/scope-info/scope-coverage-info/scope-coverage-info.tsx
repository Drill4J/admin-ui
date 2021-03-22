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
import {
  MainProgressBar, ProgressBarLegends,
} from '@drill4j/ui-kit';
import 'twin.macro';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';

interface Props {
  scope: ActiveScope | null;
}

export const ScopeCoverageInfo = ({ scope }: Props) => {
  const {
    coverage: { percentage: coveragePercentage = 0, overlap: { percentage: overlapCoverage = 0 } = {} } = {},
  } = scope || {};
  const uniqueCodeCoverage = percentFormatter(coveragePercentage) - percentFormatter(overlapCoverage);
  return (
    <div>
      <div tw="font-bold text-12 leading-16 text-monochrome-default" data-test="active-scope-info:title">SCOPE COVERAGE</div>
      <div tw="flex items-baseline mt-6 text-12 text-monochrome-default">
        <div
          tw="mr-3 mb-3 text-32 leading-40 text-monochrome-black"
          data-test="active-scope-info:scope-coverage"
        >
          {`${percentFormatter((coveragePercentage))}%`}
        </div>
        <span tw="font-bold" data-test="active-scope-info:overlap-coverage">
          {`${percentFormatter(overlapCoverage)}%`}
        </span>&nbsp;overlapped with build.&nbsp;
        <span tw="font-bold" data-test="active-scope-info:unique-coverage">
          {`${percentFormatter(uniqueCodeCoverage)}%`}
        </span>&nbsp;of new coverage
      </div>
      <MainProgressBar type="primary" value={`${coveragePercentage}%`} />
      <ProgressBarLegends />
    </div>
  );
};
