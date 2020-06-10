import * as React from 'react';
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { Risks } from 'types/risks';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const RisksSection = () => {
  const { newMethods = [], modifiedMethods = [] } = useBuildVersion<Risks>('/build/risks') || {};
  const risksCount = newMethods.length + modifiedMethods.length;

  return (
    <Section
      label="Risks"
      info={risksCount}
      graph={(
        <Tooltip
          message={
            risksCount > 0 && (
              <SectionTooltip
                data={{
                  new: { count: newMethods.length, color: '#FA6400' },
                  modified: { count: modifiedMethods.length, color: '#E78E00' },
                }}
                hideValue
              />
            )
          }
        >
          <Panel>
            <SingleBar
              width={64}
              height={128}
              color="#FA6400"
              percent={(newMethods.length / risksCount) * 100}
              icon={<Icons.Add height={16} width={16} />}
            />
            <SingleBar
              width={64}
              height={128}
              color="#E78E00"
              percent={(modifiedMethods.length / risksCount) * 100}
              icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 15" />}
            />
          </Panel>
        </Tooltip>
      )}
    />
  );
};
