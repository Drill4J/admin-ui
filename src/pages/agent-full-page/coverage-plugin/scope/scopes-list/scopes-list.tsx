import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Table, Column } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './scopes-list.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const scopesList = BEM(styles);

export const ScopesList = withRouter(
  scopesList(({ className, buildVersion, agentId, history: { push } }: Props) => {
    const activeScope = useBuildVersion<ScopeSummary>('/active-scope', agentId, buildVersion);
    const scopes = useBuildVersion<ScopeSummary[]>('/scopes', agentId, buildVersion) || [];
    const sortedScopes = scopes.sort(
      ({ started: firstStartedDate }, { started: secondStartedDate }) =>
        secondStartedDate - firstStartedDate,
    );

    const scopesData =
      activeScope && activeScope.name ? [activeScope, ...sortedScopes] : sortedScopes;

    return (
      <div className={className}>
        <Content>
          <Title>
            <span>Scopes</span>
            <ScopesCount>{scopesData.length}</ScopesCount>
          </Title>
          <Table data={scopesData as any} idKey="name" columnsSize="wide">
            <Column
              name="name"
              HeaderCell={() => <HeaderCell>Name</HeaderCell>}
              Cell={({ value, item: { id, started, active, enabled } }) => (
                <NameCell onClick={() => push(`/full-page/${agentId}/coverage/scopes/${id}`)}>
                  {value}
                  {active && <ActiveBadge>Active</ActiveBadge>}
                  {!enabled && <IgnoreBadge>Ignored</IgnoreBadge>}
                  <StartDate>{new Date(started).toDateString()}</StartDate>
                </NameCell>
              )}
            />
            <Column
              name="coverage"
              HeaderCell={() => <HeaderCell>Coverage</HeaderCell>}
              Cell={({ value }) => <Coverage>{percentFormatter(value)}%</Coverage>}
            />
            <Column
              name="autoTests"
              HeaderCell={() => (
                <HeaderCell>
                  <div>By Test Type</div>
                  <TestTypeLabel>Auto Tests</TestTypeLabel>
                </HeaderCell>
              )}
              Cell={({ item: { coveragesByType } }) => (
                <TestTypeCoverage>
                  {coveragesByType.AUTO && `${percentFormatter(coveragesByType.AUTO.coverage)}%`}
                  <TestTypeTestCount>
                    {coveragesByType.AUTO &&
                      coveragesByType.AUTO.testCount &&
                      `${coveragesByType.AUTO.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              )}
            />
            <Column
              name="manualTests"
              HeaderCell={() => (
                <HeaderCell>
                  <TestTypeLabel>Manual</TestTypeLabel>
                </HeaderCell>
              )}
              Cell={({ item: { coveragesByType } }) => (
                <TestTypeCoverage>
                  {coveragesByType.MANUAL &&
                    `${percentFormatter(coveragesByType.MANUAL.coverage)}%`}
                  <TestTypeTestCount>
                    {coveragesByType.MANUAL &&
                      coveragesByType.MANUAL.testCount &&
                      `${coveragesByType.MANUAL.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              )}
            />
          </Table>
        </Content>
      </div>
    );
  }),
);

const Content = scopesList.content('div');
const Title = scopesList.title('div');
const ScopesCount = scopesList.scopesCount('span');
const HeaderCell = scopesList.headerCell('div');
const TestTypeLabel = scopesList.testTypeLabel('div');
const TestTypeCoverage = scopesList.testTypeCoverage('div');
const TestTypeTestCount = scopesList.testTypeTestCount('div');
const NameCell = scopesList.nameCell('span');
const StartDate = scopesList.startDate('div');
const ActiveBadge = scopesList.activeBadge('span');
const IgnoreBadge = scopesList.ignoreBadge('span');
const Coverage = scopesList.coverage('div');
