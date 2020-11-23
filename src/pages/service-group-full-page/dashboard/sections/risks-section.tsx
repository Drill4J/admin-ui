import * as React from 'react';
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { RISKS_TYPES_COLOR } from 'common/constants';
import { RisksSummary } from 'types/risks-summary';
import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { convertToPercentage } from 'utils';

interface Props {
  risks?: RisksSummary;
}

export const RisksSection = ({ risks: { modified: modifiedMethodsCount = 0, new: newMethodsCount = 0, total = 0 } = {} }: Props) => {
  const tooltipData = {
    new: {
      count: newMethodsCount,
      color: RISKS_TYPES_COLOR.NEW,
    },
    modified: {
      count: modifiedMethodsCount,
      color: RISKS_TYPES_COLOR.MODIFIED,
    },
  };

  return (
    <DashboardSection
      label="Risks"
      info={total}
      graph={(
        <Tooltip message={<SectionTooltip data={tooltipData} hideValue />}>
          <Panel>
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.NEW}
              percent={convertToPercentage(newMethodsCount, total)}
              icon={<Icons.Add height={16} width={16} />}
            />
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.MODIFIED}
              percent={convertToPercentage(modifiedMethodsCount, total)}
              icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 16" />}
            />
          </Panel>
        </Tooltip>
      )}
    />
  );
};
