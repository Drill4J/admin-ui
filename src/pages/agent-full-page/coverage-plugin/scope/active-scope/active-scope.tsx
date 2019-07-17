import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { Icons } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { CreateNewScopeModal } from '../create-new-scope-modal';
import { CoverageByType } from './coverage-by-type';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './active-scope.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const activeScope = BEM(styles);

export const ActiveScope = activeScope(({ className, agentId, buildVersion }: Props) => {
  const { name = '', coverage = 0, coveragesByType = {}, started = 0, enabled = false } =
    useBuildVersion<ScopeSummary>('/active-scope', agentId, buildVersion) || {};
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const scopeStartDate = new Date(started).toDateString();

  return (
    <div className={className}>
      <Content>
        <div>
          <Panel>
            <ScopeName>{name}</ScopeName>
            {enabled && <ActiveBadge>Active</ActiveBadge>}
          </Panel>
          <ScopeStartDate>{scopeStartDate}</ScopeStartDate>
        </div>
        <Coverage>{coverage ? `${percentFormatter(coverage)}%` : 'n/a'}</Coverage>
        <CoverageByTypeSection>
          {Object.values(coveragesByType).map((coverageByType) => (
            <CoverageByType {...coverageByType} key={coverageByType.testType} />
          ))}
        </CoverageByTypeSection>
        <ActionsSection>
          <Icons.Star />
          <Icons.EyeCrossed />
          <Icons.Settings height={20} width={20} onClick={() => setIsModalOpen(true)} />
        </ActionsSection>
      </Content>
      {isModalOpen && (
        <CreateNewScopeModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={agentId} />
      )}
    </div>
  );
});

const Content = activeScope.content(Panel);
const ScopeName = activeScope.scopeName('div');
const ActiveBadge = activeScope.activeBadge('span');
const ScopeStartDate = activeScope.scopeStartDate('div');
const Coverage = activeScope.coverage('div');
const CoverageByTypeSection = activeScope.coverageByTypeSection('div');
const ActionsSection = activeScope.actionsSection('div');
