import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { SelectableTable, Column } from '../../../../../components';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../use-build-version';
import { NoScopeStub } from '../no-scope-stub';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './scopes-list.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const scopesList = BEM(styles);

export const ScopesList = scopesList(({ className, agentId, buildVersion }: Props) => {
  const scopes = useBuildVersion<ScopeSummary[]>('/scopes', agentId, buildVersion) || [];
  const [selectedRows, setSelectedRow] = React.useState<string[]>([]);

  return (
    <div className={className}>
      {scopes.length === 0 ? (
        <NoScopeStub agentId={agentId} />
      ) : (
        <Content>
          <Title>
            <span>Scopes</span>
            <ScopesCount>{scopes.length}</ScopesCount>
          </Title>
          <SelectableTable
            data={scopes}
            idKey="name"
            selectedRows={selectedRows}
            onSelect={setSelectedRow}
            columnsSize="wide"
          >
            <Column
              name="name"
              HeaderCell={() => <HeaderCell>Name</HeaderCell>}
              Cell={({ value, item: { started, enabled } }) => (
                <NameCell>
                  {value}
                  {enabled && <ActiveBadge>Active</ActiveBadge>}
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
                  <div />
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
          </SelectableTable>
        </Content>
      )}
    </div>
  );
});

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
const Coverage = scopesList.coverage('div');
