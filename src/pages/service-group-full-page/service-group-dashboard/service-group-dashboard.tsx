import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Menu, List, ListColumn } from 'components';
import { ManageSessionsModal } from 'modules';
import { percentFormatter } from 'utils';
import { DashboardNameCell } from './dashboard-name-cell';
import { DashboardCoverageCell } from './dashboard-coverage-cell';
import { DashboardCell } from './dashboard-cell';
import { DashboardHeaderCell } from './dashboard-header-cell';
import { FinishAllScopesModal } from './finish-all-scopes-modal';
import { Summary } from 'types/service-group-summary';

import styles from './service-group-dashboard.module.scss';

interface Props extends RouteComponentProps<{ serviceGroupId: string }> {
  className?: string;
  summaries?: Summary[];
  aggregatedData?: {
    coverage?: number;
    risks?: number;
    testsToRun?: number;
    arrow?: 'INCREASE' | 'DECREASE';
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

      const serviceGroupSummaries = summaries
        .filter((summary) => summary.data)
        .map((summary) => ({ ...summary, ...summary.data }));

      return (
        <>
          <div className={className}>
            <List data={serviceGroupSummaries} gridTemplateColumns={`3fr repeat(3, 1fr) 50px`}>
              <ListColumn
                name="agentName"
                Cell={({
                  value,
                  item: {
                    lastBuild: { alias, version },
                    agentId,
                  },
                }: {
                  value: any;
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
                Cell={DashboardCell}
                HeaderCell={() => (
                  <DashboardHeaderCell
                    value={aggregatedData?.testsToRun || 0}
                    label="tests to run"
                  />
                )}
              />
              <ListColumn
                name="actions"
                Cell={({ item: { agentId } }) => (
                  <Actions
                    items={[
                      {
                        label: 'Build list',
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
          </div>
        </>
      );
    },
  ),
);

const TableTitle = serviceGroupDashboard.tableTitle('div');
const Actions = serviceGroupDashboard.actions(Menu);
