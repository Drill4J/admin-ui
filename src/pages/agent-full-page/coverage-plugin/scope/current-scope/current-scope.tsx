import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { Icons } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { RenameScopeModal } from '../rename-scope-modal';
import { CoverageByType } from './coverage-by-type';
import { NoScopeStub } from '../no-scope-stub';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './current-scope.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const currentScope = BEM(styles);

export const CurrentScope = currentScope(({ className, agentId, buildVersion }: Props) => {
  const { name = '', coverage = 0, coveragesByType = {}, started = 0, active = false } =
    useBuildVersion<ScopeSummary>('/active-scope', agentId, buildVersion) || {};
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const scopeStartDate = new Date(started).toDateString();

  return (
    <div className={className}>
      {name ? (
        <Content>
          <div>
            <Panel>
              <ScopeName>{name}</ScopeName>
              {active && <ActiveBadge>Active</ActiveBadge>}
            </Panel>
            <ScopeStartDate>{scopeStartDate}</ScopeStartDate>
          </div>
          <Coverage>{`${percentFormatter(coverage)}%`}</Coverage>
          <CoverageByTypeSection>
            {Object.values(coveragesByType).map((coverageByType) => (
              <CoverageByType {...coverageByType} key={coverageByType.testType} />
            ))}
          </CoverageByTypeSection>
          <ActionsSection>
            <Icons.Star />
            <Icons.EyeCrossed />
            <Icons.MoreOptions onClick={() => setIsModalOpen(true)} />
          </ActionsSection>
        </Content>
      ) : (
        <NoScopeStub />
      )}
      {isModalOpen && (
        <RenameScopeModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={agentId} />
      )}
    </div>
  );
});

const Content = currentScope.content(Panel);
const ScopeName = currentScope.scopeName('div');
const ActiveBadge = currentScope.activeBadge('span');
const ScopeStartDate = currentScope.scopeStartDate('div');
const Coverage = currentScope.coverage('div');
const CoverageByTypeSection = currentScope.coverageByTypeSection('div');
const ActionsSection = currentScope.actionsSection('div');
