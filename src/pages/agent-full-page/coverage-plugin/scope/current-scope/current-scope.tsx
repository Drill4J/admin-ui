import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Icons } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { RenameScopeModal } from '../rename-scope-modal';
import { CoverageByType } from './coverage-by-type';
import { NoScopeStub } from '../no-scope-stub';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './current-scope.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const coverageByTypeDefaults = {
  MANUAL: {
    testType: 'MANUAL',
    coverage: 0,
    testCount: 0,
  },
  AUTO: {
    testType: 'AUTO',
    coverage: 0,
    testCount: 0,
  },
  PERFORMANCE: {
    testType: 'PERFORMANCE',
    coverage: 0,
    testCount: 0,
  },
};

const currentScope = BEM(styles);

export const CurrentScope = withRouter(
  currentScope(({ className, agentId, buildVersion, history: { push } }: Props) => {
    const { id = '', name = '', coverage = 0, coveragesByType = {}, started = 0, active = false } =
      useBuildVersion<ScopeSummary>('/active-scope', agentId, buildVersion) || {};
    const { testTypes: activeSessionTestTypes = [] } =
      useBuildVersion<{ testTypes: string[] }>('/active-sessions', agentId, buildVersion) || {};
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const scopeStartDate = new Date(started).toDateString();

    return (
      <div className={className}>
        {name ? (
          <Content>
            <div>
              <Panel>
                <ScopeName onClick={() => push(`/full-page/${agentId}/coverage/scopes/${id}`)}>
                  {name}
                </ScopeName>
                {active && <ActiveBadge>Active</ActiveBadge>}
              </Panel>
              <ScopeStartDate>{scopeStartDate}</ScopeStartDate>
            </div>
            <Coverage>{`${percentFormatter(coverage)}%`}</Coverage>
            <CoverageByTypeSection>
              {Object.values({ ...coverageByTypeDefaults, ...coveragesByType }).map(
                (coverageByType) => (
                  <CoverageByType
                    {...coverageByType}
                    key={coverageByType.testType}
                    recording={activeSessionTestTypes.includes(coverageByType.testType)}
                  />
                ),
              )}
            </CoverageByTypeSection>
            <ActionsSection>
              <Icons.Star />
              <Icons.EyeCrossed />
              <MoreOptions align="center" onClick={() => setIsModalOpen(true)}>
                <Icons.MoreOptions />
              </MoreOptions>
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
  }),
);

const Content = currentScope.content(Panel);
const ScopeName = currentScope.scopeName('div');
const ActiveBadge = currentScope.activeBadge('span');
const ScopeStartDate = currentScope.scopeStartDate('div');
const Coverage = currentScope.coverage('div');
const CoverageByTypeSection = currentScope.coverageByTypeSection('div');
const ActionsSection = currentScope.actionsSection('div');
const MoreOptions = currentScope.moreOptions(Panel);
