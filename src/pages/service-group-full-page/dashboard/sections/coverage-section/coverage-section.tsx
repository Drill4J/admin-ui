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

import { percentFormatter } from 'utils';
import { Count } from 'types/count';
import { COVERAGE_TYPES_COLOR } from 'common/constants';
import { SingleBar, DashboardSection } from 'components';
import { MethodsTooltip } from './methods-tooltip';

interface Props {
  className?: string;
  totalCoverage?: number;
  methodCount?: Count;
}

export const CoverageSection = ({ className, totalCoverage = 0, methodCount: { total = 0, covered = 0 } = {} }: Props) => (
  <div className={className}>
    <DashboardSection
      label="Build Coverage"
      info={`${percentFormatter(totalCoverage)}%`}
      graph={(
        <Tooltip message={<MethodsTooltip coveredMethods={{ total, covered }} />}>
          <SingleBar
            width={108}
            height={128}
            color={COVERAGE_TYPES_COLOR.TOTAL}
            percent={percentFormatter(totalCoverage)}
          />
        </Tooltip>
      )}
    />
  </div>
);
