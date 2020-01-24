import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Menu, List, ListColumn } from 'components';
import { ManageSessionsModal, TestsToRunModal } from 'modules';
import { percentFormatter } from 'utils';
import { Summary } from 'types/service-group-summary';
import { DashboardNameCell } from './dashboard-name-cell';
import { DashboardCoverageCell } from './dashboard-coverage-cell';
import { DashboardCell } from './dashboard-cell';
import { DashboardHeaderCell } from './dashboard-header-cell';
import { FinishAllScopesModal } from './finish-all-scopes-modal';

import styles from './service-group-dashboard.module.scss';

type TestToRun = { groupedTests?: { [testType: string]: string[] }; count?: number };

interface Props extends RouteComponentProps<{ serviceGroupId: string }> {
  className?: string;
  summaries?: Summary[];
  aggregatedData?: {
    coverage?: number;
    risks?: number;
    arrow?: 'INCREASE' | 'DECREASE';
    testsToRun?: TestToRun;
  };
}

const serviceGroupDashboard = BEM(styles);

export const ServiceGroupDashboard = withRouter(
  serviceGroupDashboard(
    ({
      className,
      history: { push },
      summaries = [],
      aggregatedData,
      match: {
        params: { serviceGroupId },
      },
    }: Props) => {
      const [isManageSessionsModalOpen, setIsManageSessionsModalOpen] = React.useState(false);
      const [isFinishScopesModalOpen, setIsFinishScopesModalOpen] = React.useState(false);
      const [selectedTestsToRun, setSelectedTestsToRun] = React.useState<TestToRun>({});
      const serviceGroupSummaries = summaries
        .filter((summary) => summary.data)
        .map((summary) => ({ ...summary, ...summary.data }));

      return (
        <>
          <div className={className}>
            <List data={serviceGroupSummaries} gridTemplateColumns="3fr repeat(3, 1fr) 50px">
              <ListColumn
                name="agentName"
                Cell={({
                  value,
                  item: {
                    lastBuild: { alias, version },
                    agentId,
                  },
                }: {
                  value: string;
                  item: any;
                }) => (
                  <DashboardNameCell
                    name={value}
                    additionalInformation={`Build: ${alias || version}`}
                    onClick={() => push(`/full-page/${agentId}/${version}/dashboard`)}
                  />
                )}
                HeaderCell={() => <TableTitle>Dashboard</TableTitle>}
              />
              <ListColumn
                name="coverage"
                label="Coverage"
                Cell={({ value, item: { arrow } }) => (
                  <DashboardCoverageCell value={value} arrow={arrow} />
                )}
                HeaderCell={() => (
                  <DashboardHeaderCell
                    value={`${percentFormatter(aggregatedData?.coverage || 0)}%`}
                    label="coverage"
                  />
                )}
              />
              <ListColumn
                name="risks"
                Cell={DashboardCell}
                HeaderCell={() => (
                  <DashboardHeaderCell value={aggregatedData?.risks || 0} label="risks" />
                )}
              />
              <ListColumn
                name="testsToRun"
                Cell={({ value }) => (
                  <DashboardCell
                    value={value?.count}
                    onClick={() => setSelectedTestsToRun(value)}
                  />
                )}
                HeaderCell={() => (
                  <DashboardHeaderCell
                    value={aggregatedData?.testsToRun?.count}
                    label="tests to run"
                    onClick={() => setSelectedTestsToRun(aggregatedData?.testsToRun || {})}
                  />
                )}
              />
              <ListColumn
                name="actions"
                Cell={({ item: { agentId } }) => (
                  <Actions
                    testContext="service-group-dashboard:actions:cell"
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
                    testContext="service-group-dashboard:header-cell:actions"
                    items={[
                      {
                        label: 'Finish all scopes',
                        icon: 'Check',
                        onClick: () => setIsFinishScopesModalOpen(true),
                      },
                      {
                        label: 'Manage sessions',
                        icon: 'ManageSessions',
                        onClick: () => setIsManageSessionsModalOpen(true),
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
              />
            )}
            {isFinishScopesModalOpen && (
              <FinishAllScopesModal
                isOpen={isFinishScopesModalOpen}
                onToggle={setIsFinishScopesModalOpen}
                serviceGroupId={serviceGroupId}
                agentsCount={serviceGroupSummaries.length}
              />
            )}
            {selectedTestsToRun.count && (
              <TestsToRunModal
                isOpen={Boolean(selectedTestsToRun)}
                onToggle={() => setSelectedTestsToRun({})}
                agentId={serviceGroupId}
                pluginId="test-to-code-mapping"
                testsToRun={selectedTestsToRun?.groupedTests || {}}
                count={selectedTestsToRun?.count}
              />
            )}
          </div>
        </>
      );
    },
  ),
);

const TableTitle = serviceGroupDashboard.tableTitle('div');
const Actions = serviceGroupDashboard.actions(Menu);
