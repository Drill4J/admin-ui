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
import { BEM } from '@redneckz/react-bem-helper';
import {
  MainProgressBar, ProgressBarLegends,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';

import styles from './scope-coverage-info.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope | null;
}

const scopeCoverageInfo = BEM(styles);

export const ScopeCoverageInfo = scopeCoverageInfo(({ className, scope }: Props) => {
  const {
    coverage: { percentage: coveragePercentage = 0, overlap: { percentage: overlapCoverage = 0 } = {} } = {},
  } = scope || {};
  const uniqueCodeCoverage = percentFormatter(coveragePercentage) - percentFormatter(overlapCoverage);
  return (
    <div className={className}>
      <Title data-test="active-scope-info:title">SCOPE COVERAGE</Title>
      <CoverageInfo>
        <ScopeCoverage data-test="active-scope-info:scope-coverage">{`${percentFormatter((coveragePercentage))}%`}</ScopeCoverage>
        <b data-test="active-scope-info:overlap-coverage">{`${percentFormatter(overlapCoverage)}%`}</b>&nbsp;overlapped with build.&nbsp;
        <b data-test="active-scope-info:unique-coverage">
          {`${percentFormatter(uniqueCodeCoverage)}%`}
        </b>&nbsp;of new coverage
      </CoverageInfo>
      <MainProgressBar type="primary" value={`${coveragePercentage}%`} />
      <ProgressBarLegends />
    </div>
  );
});

const Title = scopeCoverageInfo.title('div');
const CoverageInfo = scopeCoverageInfo.coverageInfo('div');
const ScopeCoverage = scopeCoverageInfo.scopeCoverage('div');
