import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { useBuildVersion } from '../../use-build-version';
import { FinishScopeModal } from './finish-scope-modal';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
  selectedScope: string;
  onScopeClick: (scopeId: string) => void;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(
  ({ className, agentId, buildVersion, selectedScope, onScopeClick }: Props) => {
    const coverage = useBuildVersion(`/scope/${selectedScope}/coverage`, agentId, buildVersion);
    const newMethodsCoverage = useBuildVersion(
      `/scope/${selectedScope}/coverage-new`,
      agentId,
      buildVersion,
    );
    const coverageByPackages = useBuildVersion(
      `/scope/${selectedScope}/coverage-by-packages`,
      agentId,
      buildVersion,
    );

    const { name = '', active = '' } =
      useBuildVersion<ScopeSummary>(`/scope/${selectedScope}`, agentId, buildVersion) || {};
    const [isFinishModalOpen, setIsFinishModalOpen] = React.useState(false);

    return (
      <div className={className}>
        <BackToScopesList onClick={() => onScopeClick('')}>&lt; Scopes list</BackToScopesList>
        <Header>
          <Panel align="space-between">
            <Panel>
              {name}
              {active && <ActiveBadge>Active</ActiveBadge>}
            </Panel>
            <FinishScopeButton
              type="secondary"
              onClick={() => setIsFinishModalOpen(true)}
              disabled={!active}
            >
              Finish scope
            </FinishScopeButton>
          </Panel>
        </Header>
        {isFinishModalOpen && (
          <FinishScopeModal
            agentId={agentId}
            buildVersion={buildVersion}
            scopeId={selectedScope}
            isOpen={isFinishModalOpen}
            onToggle={setIsFinishModalOpen}
          />
        )}
      </div>
    );
  },
);

const BackToScopesList = scopeInfo.backToScopesList('span');
const Header = scopeInfo.header('div');
const ActiveBadge = scopeInfo.activeBadge('span');
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
