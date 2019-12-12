import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useBuildVersion } from '../use-build-version';
import { ActionSection } from './action-section';
import { RisksModal } from '../risks-modal';
import { TestsToRunModal } from '../tests-to-run-modal';
import { Risks } from 'types/risks';
import { TestsToRun } from 'types/tests-to-run';

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className }: Props) => {
  const risks = useBuildVersion<Risks>('/build/risks') || {};
  const { testsToRun = {} } = useBuildVersion<TestsToRun>('/build/tests-to-run') || {};
  const [isRisksModalOpen, setIsRisksModalOpen] = React.useState(false);
  const [isTestsToRunModalOpen, setIsTestToRunModalOpen] = React.useState(false);
  const { newMethods = [], modifiedMethods = [] } = risks;
  const testToRunLength = Object.values(testsToRun).reduce(
    (acc: string[], tests: any) => [...acc, ...tests],
    [],
  );
  const risksCount = newMethods.length + modifiedMethods.length;

  return (
    <div className={className}>
      <PluginName>Test-to-code Mapping</PluginName>
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
          testsToRun={testsToRun}
          isOpen={isTestsToRunModalOpen}
          onToggle={setIsTestToRunModalOpen}
          count={testToRunLength.length}
        />
      )}
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('span');
const Actions = coveragePluginHeader.actions('div');
