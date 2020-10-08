import * as React from 'react';
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { Risks } from 'types/risks';
import { RISKS_TYPES_COLOR } from 'common/constants';
import { SingleBar } from 'components';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const RisksSection = () => {
  const { newMethods = [], modifiedMethods = [] } = useBuildVersion<Risks>('/build/risks') || {};
  const risksCount = newMethods.length + modifiedMethods.length;
  const tooltipData = {
    new: {
      count: newMethods.length,
      color: RISKS_TYPES_COLOR.NEW,
    },
    modified: {
      count: modifiedMethods.length,
      color: RISKS_TYPES_COLOR.MODIFIED,
    },
  };

  return (
    <Section
      label="Risks"
      info={risksCount}
      graph={(
        <Tooltip
          customStyle={{ left: 'calc(50% - 2px)', bottom: 'calc(100% + 12px)' }}
          message={<SectionTooltip data={tooltipData} hideValue />}
        >
          <Panel>
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.NEW}
              percent={(newMethods.length / risksCount) * 100}
              icon={<Icons.Add height={16} width={16} />}
            />
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.MODIFIED}
              percent={(modifiedMethods.length / risksCount) * 100}
              icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 15" />}
            />
          </Panel>
        </Tooltip>
      )}
    />
  );
};
