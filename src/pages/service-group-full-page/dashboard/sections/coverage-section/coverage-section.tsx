import * as React from 'react';
import { Tooltip } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { Count } from 'types/count';
import { COVERAGE_TYPES_COLOR } from 'common/constants';
import { SingleBar, DashboardSection } from 'components';
import { MethodsTooltip } from './methods-tooltip';

interface Props {
  className?: string;
  totalCoverage?: number;
  coverageCount?: Count;
}

export const CoverageSection = ({ className, totalCoverage = 0, coverageCount: { total = 0, covered = 0 } = {} }: Props) => (
  <div className={className}>
    <DashboardSection
      label="Build Coverage"
      info={`${percentFormatter(totalCoverage)}%`}
      graph={(
        <Tooltip message={<MethodsTooltip data={{ coveredMethods: { total, covered } }} />}>
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
