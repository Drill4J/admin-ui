import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Table, Column } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './scopes-list.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
  onScopeClick: (scopeId: string) => void;
}

const scopesList = BEM(styles);

export const ScopesList = scopesList(
  ({ className, agentId, buildVersion, onScopeClick }: Props) => {
    const activeScope = useBuildVersion<ScopeSummary>('/active-scope', agentId, buildVersion);
    const scopes = useBuildVersion<ScopeSummary[]>('/scopes', agentId, buildVersion) || [];
    const scopesData = activeScope && activeScope.name ? [activeScope, ...scopes] : scopes;

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
                <NameCell onClick={() => onScopeClick(id)}>
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
              name="coveragesByType"
              HeaderCell={() => (
                <HeaderCell>
                  <div>By Test Type</div>
                  <TestTypeLabel>Auto Tests</TestTypeLabel>
                </HeaderCell>
              )}
              Cell={({ value }) => (
                <TestTypeCoverage>
                  {value.AUTO && `${percentFormatter(value.AUTO.coverage)}%`}
                  <TestTypeTestCount>
                    {value.AUTO && value.AUTO.testCount && `${value.AUTO.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              )}
            />
            <Column
              name="coveragesByType"
              HeaderCell={() => (
                <HeaderCell>
                  <TestTypeLabel>Manual</TestTypeLabel>
                </HeaderCell>
              )}
              Cell={({ value }) => (
                <TestTypeCoverage>
                  {value.MANUAL && `${percentFormatter(value.MANUAL.coverage)}%`}
                  <TestTypeTestCount>
                    {value.MANUAL && value.MANUAL.testCount && `${value.MANUAL.testCount} tests`}
                  </TestTypeTestCount>
                </TestTypeCoverage>
              )}
            />
          </Table>
        </Content>
      </div>
    );
  },
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
