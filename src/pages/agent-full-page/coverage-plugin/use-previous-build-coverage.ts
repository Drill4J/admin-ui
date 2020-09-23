import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { BuildCoverage } from 'types/build-coverage';
import { usePluginState } from '../store';

export function usePreviousBuildCoverage(previousBuildVersion: string): BuildCoverage | null {
  const { agentId } = usePluginState();
  const [data, setData] = useState<BuildCoverage | null>(null);

  useEffect(() => {
    function handleDataChange(newData: BuildCoverage) {
      setData(newData);
    }

    const unsubscribe = agentId && previousBuildVersion
      ? defaultTest2CodePluginSocket.subscribe('/build/coverage', handleDataChange, {
        agentId,
        buildVersion: previousBuildVersion,
        type: 'AGENT',
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [previousBuildVersion]);

  return data;
}
