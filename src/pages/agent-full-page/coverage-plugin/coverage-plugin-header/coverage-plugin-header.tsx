import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';

import { TestsToRunModal } from 'modules';
import { Risks } from 'types/risks';
import { TestsToRun } from 'types/tests-to-run';
import { BuildVersionsDropdown } from 'components';
import { usePluginState } from '../../store';
import { useBuildVersion } from '../use-build-version';
import { ActionSection } from './action-section';
import { RisksModal } from '../risks-modal';

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className }: Props) => {
  const { agentId } = usePluginState();
  const { pluginId = '' } = useParams();
  const risks = useBuildVersion<Risks>('/build/risks') || {};
  const { testTypeToNames = {} } = useBuildVersion<TestsToRun>('/build/tests-to-run') || {};
  const [isRisksModalOpen, setIsRisksModalOpen] = React.useState(false);
  const [isTestsToRunModalOpen, setIsTestToRunModalOpen] = React.useState(false);
  const { newMethods = [], modifiedMethods = [] } = risks;
  const testToRunLength = Object.values(testTypeToNames).reduce(
    (acc: string[], tests: string[]) => [...acc, ...tests],
    [],
  );
  const risksCount = newMethods.length + modifiedMethods.length;

  return (
    <div className={className}>
      <div>
        <PluginName>Test2Code</PluginName>
        <BuildVersionsDropdown />
      </div>
      <Actions>
        <ActionSection
          label="Risks"
          count={risksCount}
          onClick={() => setIsRisksModalOpen(true)}
          type="error"
        />
        <ActionSection
          label="Tests to run"
          count={testToRunLength.length}
          onClick={() => setIsTestToRunModalOpen(true)}
        />
      </Actions>
      {isRisksModalOpen && (
        <RisksModal
          risks={risks}
          isOpen={isRisksModalOpen}
          onToggle={setIsRisksModalOpen}
          count={risksCount}
        />
      )}
      {isTestsToRunModalOpen && (
        <TestsToRunModal
          testsToRun={testTypeToNames}
          isOpen={isTestsToRunModalOpen}
          onToggle={setIsTestToRunModalOpen}
          count={testToRunLength.length}
          agentId={agentId}
          pluginId={pluginId}
        />
      )}
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('span');
const Actions = coveragePluginHeader.actions('div');
