import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useBuildVersion } from '../use-build-version';
import { ActionSection } from './action-section';
import { RisksModal } from '../risks-modal';
import { Risks } from '../../../../types/risks';

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className }: Props) => {
  const risks = useBuildVersion<Risks>('/build/risks') || {};
  const [isRisksModalOpen, setIsRisksModalOpen] = React.useState(false);
  const { newMethods = [], modifiedMethods = [] } = risks;
  const risksCount = newMethods.length + modifiedMethods.length;

  return (
    <div className={className}>
      <PluginName>Test-to-code Mapping</PluginName>
      <Actions>
        <ActionSection label="Risks" count={risksCount} onClick={() => setIsRisksModalOpen(true)} />
        <ActionSection label="Tests to run" count={0} />
      </Actions>
      {isRisksModalOpen && (
        <RisksModal
          risks={risks}
          isOpen={isRisksModalOpen}
          onToggle={setIsRisksModalOpen}
          count={risksCount}
        />
      )}
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('span');
const Actions = coveragePluginHeader.actions('div');
