import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';

import { Menu, List, ListColumn } from 'components';
import { ManageSessionsModal, TestsToRunModal } from 'modules';
import { percentFormatter } from 'utils';
import { Summary } from 'types/service-group-summary';
import { TestToCodeNameCell } from './test-to-code-name-cell';
import { TestToCodeCoverageCell } from './test-to-code-coverage-cell';
import { TestToCodeCell } from './test-to-code-cell';
import { TestToCodeHeaderCell } from './test-to-code-header-cell';
import { FinishAllScopesModal } from './finish-all-scopes-modal';

import styles from './test-to-code-plugin.module.scss';

type TestToRun = { groupedTests?: { [testType: string]: string[] }; count?: number; agentType?: string; id?: string };

interface Props {
  className?: string;
  summaries?: Summary[];
  aggregatedData?: {
    coverage?: number;
    risks?: number;
    arrow?: 'INCREASE' | 'DECREASE';
    testsToRun?: TestToRun;
  };
}
const testToCodePlugin = BEM(styles);

export const TestToCodePlugin = testToCodePlugin(
  ({
    className,
    summaries = [],
    aggregatedData,
  }: Props) => {
    const { serviceGroupId = '', pluginId = '' } = useParams();
    const { push } = useHistory();
    const [isManageSessionsModalOpen, setIsManageSessionsModalOpen] = React.useState(false);
    const [isFinishScopesModalOpen, setIsFinishScopesModalOpen] = React.useState(false);
    const [{
      groupedTests = {}, count = 0, agentType = '', id = '',
    }, setSelectedTestsToRun] = React.useState<TestToRun>({});
    const serviceGroupSummaries = summaries
      .map((summary) => ({ ...summary, ...summary.data }));

    return (
      <>
        <div className={className}>
          <List data={serviceGroupSummaries} gridTemplateColumns="3fr repeat(3, 1fr) 50px" testContext="test-to-code-plugin">
            <ListColumn
              name="agentName"
              Cell={({
                value,
                item: {
                  buildVersion,
                  agentId,
                },
              }: {
                value: string;
                item: any;
              }) => (
                <TestToCodeNameCell
                  name={value}
                  additionalInformation={`Build: ${buildVersion}`}
                  onClick={() => push(`/full-page/${agentId}/${buildVersion}/dashboard`)}
                />
              )}
              HeaderCell={() => <TableTitle>Test2Code</TableTitle>}
            />
            <ListColumn
              name="coverage"
              label="Coverage"
              Cell={({ value, item: { arrow } }) => (
                <TestToCodeCoverageCell value={value} arrow={arrow} />
              )}
              HeaderCell={() => (
                <TestToCodeHeaderCell
                  value={`${percentFormatter(aggregatedData?.coverage || 0)}%`}
                  label="coverage"
                />
              )}
            />
            <ListColumn
              name="risks"
              Cell={({ value }) => (
                <TestToCodeCell
                  value={value}
                  testContext="risks"
                />
              )}
              HeaderCell={() => (
                <TestToCodeHeaderCell value={aggregatedData?.risks || 0} label="risks" />
              )}
            />
            <ListColumn
              name="testsToRun"
              Cell={({ value, item: { agentId = '' } = {} }) => (
                <TestToCodeCell
                  value={value?.count}
                  onClick={() => setSelectedTestsToRun({ ...value, agentType: 'Agent', id: agentId })}
                  testContext="tests-to-run"
                />
              )}
              HeaderCell={() => (
                <TestToCodeHeaderCell
                  value={aggregatedData?.testsToRun?.count}
                  label="tests to run"
                  onClick={() => setSelectedTestsToRun({ ...aggregatedData?.testsToRun, agentType: 'ServiceGroup', id: serviceGroupId })}
                />
              )}
            />
            <ListColumn
              name="actions"
              Cell={({ item: { agentId } }) => (
                <Actions
                  testContext="test-to-code-plugin:actions:cell"
                  items={[
                    {
                      label: 'Builds list',
                      icon: 'BuildList',
                      onClick: () => push(`/full-page/${agentId}/build-list`),
                    },
                    {
                      label: 'Settings',
                      icon: 'Settings',
                      onClick: () => push(`/agents/agent/${agentId}/settings`),
                    },
                  ]}
                />
              )}
              HeaderCell={() => (
                <Actions
                  testContext="test-to-code-plugin:header-cell:actions"
                  items={[
                    {
                      label: 'Finish all scopes',
                      icon: 'Check',
                      onClick: () => setIsFinishScopesModalOpen(true),
                    },
                    {
                      label: 'Manage sessions',
                      icon: 'ManageSessions',
                      onClick: () => {
                        setIsManageSessionsModalOpen(true);
                        setSelectedTestsToRun({ agentType: 'ServiceGroup' });
                      },
                    },
                  ]}
                />
              )}
            />
          </List>
          {isManageSessionsModalOpen && (
            <ManageSessionsModal
              isOpen={isManageSessionsModalOpen}
              onToggle={setIsManageSessionsModalOpen}
              agentId={serviceGroupId}
              pluginId={pluginId}
              agentType={agentType}
            />
          )}
          {isFinishScopesModalOpen && (
            <FinishAllScopesModal
              isOpen={isFinishScopesModalOpen}
              onToggle={setIsFinishScopesModalOpen}
              serviceGroupId={serviceGroupId}
              agentsCount={serviceGroupSummaries.length}
              pluginId={pluginId}
            />
          )}
          {count > 0 && (
            <TestsToRunModal
              isOpen={Boolean(count)}
              onToggle={() => setSelectedTestsToRun({})}
              agentId={id}
              pluginId={pluginId}
              testsToRun={groupedTests}
              count={count}
              agentType={agentType}
            />
          )}
        </div>
      </>
    );
  },
);

const TableTitle = testToCodePlugin.tableTitle('div');
const Actions = testToCodePlugin.actions(Menu);
