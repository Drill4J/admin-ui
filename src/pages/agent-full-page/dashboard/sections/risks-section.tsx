import * as React from 'react';

import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { Risks } from '../../../../types/risks';
import { Icons } from '../../../../components';

export const RisksSection = () => {
  const { newMethods = [], modifiedMethods = [] } = useBuildVersion<Risks>(`/build/risks`) || {};
  const risksCount = newMethods.length + modifiedMethods.length;

  return (
    <Section
      label="Risks"
      info={risksCount}
      graph={
        <>
          <SingleBar
            width={64}
            height={128}
            color="#F7B500"
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
        </>
      }
    />
  );
};
